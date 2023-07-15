package chat

import (
	"fmt"
	"testing"
)

func TestSelect(t *testing.T) {

	client := make(chan string, 1)
	client <- "msg1"

	close(client)
    fmt.Println(<-client)
    fmt.Println(<-client)
    fmt.Println(<-client)
	// select {
	// case client <- "some msg":
	// 	fmt.Println("write msg to channel")
	// default:
	// 	fmt.Println("default")
	// }

}

// func TestHub(t *testing.T) {
// 	hub := New()
// 	hub.On("chat", func(body Body, ackFn AckFunc) {
//         ackMsg := []byte("This is a ack msg")
//         ackFn(ackMsg)
// 	})
//     go hub.run()
//     // hub.onEvent <- &WsMsg{"chat", "msg body"} 
//     
// }
