package chat

import (
	"fmt"
	"time"

	"golang.org/x/exp/slices"
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

	// Builtin events
	// register the event clients listen on
	registerEvent = "registerEvent"
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

	// event to handler function mapping
	handlerFn map[string]EventHandler

	// client's event map
	clientsEventMap map[string][]*Client
    builtinEvents []string
}

func New() *Hub {
	hub := &Hub{
		register:     make(chan *Client),
		unregister:   make(chan *Client),
		clients:      make(map[*Client]bool),
		handlerFn:    make(map[string]EventHandler),
		onEvent:      make(chan *WsDto),
		emitEvent:    make(chan *WsMsg),
		clientsEventMap: make(map[string][]*Client),
	}

	// init builtin event
    hub.builtinEvents = []string{registerEvent}

	return hub
}

func (hub *Hub) addClientListenOn(event string, client *Client) {


}

func (hub *Hub) rmClientListenOn(event string, client *Client) {
    // listenOn := hub.clientsEventMap[event]
    // slices.Delete(listenOn, client)

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

func (hub *Hub) Emit(event string, body Body) {
	fmt.Println("Emit msg:", body)

}

func (h *Hub) run() {
	for {
		select {
		case client := <-h.register:
			h.clients[client] = true
		case client := <-h.unregister:
			if _, ok := h.clients[client]; ok {
				delete(h.clients, client)
				close(client.sendBuf)
			}
		case wsDto := <-h.onEvent:
			// dispatch event
			wsMsg := wsDto.msg
            client := wsDto.conn
			ackFn := func(b Body) {
				fmt.Printf("Ack event:%s, msg:%s\n", wsMsg.Event, b)
				wsMsg.Body = b
				select {
				case client.sendBuf <- *wsMsg:
				default:
					// when buffer is full, close the channel
					close(client.sendBuf)
					delete(h.clients, client)
				}
			}
            // handle builtin event
            if slices.Contains(h.builtinEvents, wsMsg.Event) {
                switch wsMsg.Event {
                case registerEvent:
                    fmt.Println("handle registerEvent")
                    h.clientsEventMap[wsMsg.Event] = append(h.clientsEventMap[wsMsg.Event], client)
                }
            }
			// handle user defined function
			fn, ok := h.handlerFn[wsMsg.Event]
			if ok {
				fn(wsMsg.Body, ackFn)
			} else {
				fmt.Println("Fn not found, discard event:", wsMsg.Event)
			}
		case wsMsg := <-h.emitEvent:
			fmt.Println("emit", wsMsg)
		}
	}
}
