package main

import (
	"fmt"
	"net/http"
	"os"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello, you've requested: %s\n", r.URL.Path)
	})

	port := os.Getenv("PORT")
    if port == "" {
        port = "3000"
    }
	fmt.Println("wind-im listen on *:" + port)
	http.ListenAndServe("0.0.0.0:" + port, nil)
}
