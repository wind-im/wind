package chat

import (
	"fmt"
	"time"
)

const (
	// Time allowed to write a message to the peer.
	writeWait = 10 * time.Second

	// Time allowed to read the next pong message from the peer.
	pongWait = 60 * time.Second

	// Send pings to peer with this period. Must be less than pongWait.
	pingPeriod = (pongWait * 9) / 10

	// Maximum message size in bytes allowed from peer.
	maxMessageSize = 512
)

// Hub manages all ws connections
type Hub struct {
	// Registered clients.
	clients map[*Client]bool

	// Register requests from the clients.
	register chan *Client

	// Unregister requests from clients.
	unregister chan *Client

	// Event Listener
	onEvent chan *WsDto

	// Emit event
	emitEvent chan *WsMsg

	handlerFn map[string]EventHandler
}

func New() *Hub {
	return &Hub{
		register:   make(chan *Client),
		unregister: make(chan *Client),
		clients:    make(map[*Client]bool),
		handlerFn:  make(map[string]EventHandler),
		onEvent:    make(chan *WsDto),
	}
}

func (hub *Hub) addHandlerFn(event string, fn EventHandler) {
	hub.handlerFn[event] = fn
}

type EventHandler func(body Body, ackFn AckFunc)

type AckFunc func(body Body)

type Body interface{}

type WsDto struct {
	conn *Client
	msg  *WsMsg
}

type WsMsg struct {
	Event string `json:"event"`
	Body  Body   `json:"body"`
}

func (hub *Hub) On(event string, handler EventHandler) {
	hub.addHandlerFn(event, handler)
}

func (hub *Hub) Emit(event string, body []byte) {
	fmt.Println("Emit msg")
}

func (h *Hub) run() {
	for {
		select {
		case client := <-h.register:
			h.clients[client] = true
		case client := <-h.unregister:
			if _, ok := h.clients[client]; ok {
				delete(h.clients, client)
				close(client.send)
			}
		case wsDto := <-h.onEvent:
			// dispatch event
			wsMsg := wsDto.msg
			ackFn := func(b Body) {
				fmt.Printf("Ack event:%s, msg:%s\n", wsMsg.Event, b)
				wsMsg.Body = b
                client := wsDto.conn
				select {
				case client.send <- *wsMsg:
				default:
                    // when buffer is full, close the channel
					close(client.send)
					delete(h.clients, client)
				}
			}
            // handle user defined function
			fn := h.handlerFn[wsMsg.Event]
			fn(wsMsg.Body, ackFn)
		case wsMsg := <-h.emitEvent:
			fmt.Println("emit", wsMsg)
		}
	}
}
