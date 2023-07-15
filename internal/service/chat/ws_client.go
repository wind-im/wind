package chat

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

// Client is a middleman between the websocket connection and the hub.
type Client struct {
	hub *Hub

	// The websocket connection.
	conn *websocket.Conn

	// Buffered channel of outbound messages.
	send chan WsMsg
}

func serveWs(hub *Hub, w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}
	client := &Client{hub: hub, conn: conn, send: make(chan WsMsg, 256)}
	client.hub.register <- client

    // handle reader and writer in new individual goroutine
	go client.read()
	go client.write()
}

// read from ws client
func (c *Client) read() {
	defer func() {
		c.hub.unregister <- c
		c.conn.Close()
	}()
	c.conn.SetReadLimit(maxMessageSize)
	// init pong timeout
	c.conn.SetReadDeadline(time.Now().Add(pongWait))
	c.conn.SetPongHandler(func(string) error {
		// refresh pong timeout
		c.conn.SetReadDeadline(time.Now().Add(pongWait))
		return nil
	})
	for {
		_, message, err := c.conn.ReadMessage()
		if err != nil {
            // client close ws
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v", err)
			} else {
                log.Printf("other ws error: %v", err)
            }
			break
		}
		msg := &WsMsg{}
		json.Unmarshal(message, msg)
		fmt.Printf("read from client: %+v\n", msg)
		wsDto := &WsDto{c, msg}
		c.hub.onEvent <- wsDto
	}
}

// write to ws client
func (c *Client) write() {
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
		c.conn.Close()
	}()
	for {
		select {
		case message, ok := <-c.send:
			c.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if !ok {
				// The hub closed the channel.
				c.conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}

			w, err := c.conn.NextWriter(websocket.TextMessage)
			if err != nil {
				return
			}
			msgInBytes, _ := json.Marshal(message)
			w.Write(msgInBytes)

            // handle queued messages for performance
			n := len(c.send)
			for i := 0; i < n; i++ {
				message := <-c.send
				msgInBytes, _ := json.Marshal(message)
				w.Write(msgInBytes)
			}

			if err := w.Close(); err != nil {
				return
			}
		case <-ticker.C:
			// send ping every 10s
			c.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if err := c.conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				return
			}
		}
	}
}
