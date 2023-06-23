package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello, you've requested: %s\n", r.URL.Path)
	})

    fmt.Println("wind-im listen on *:80")
	http.ListenAndServe("0.0.0.0:80", nil)
}
