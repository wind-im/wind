package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
	"github.com/wind-im/wind/internal/controller"
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file, err= ", err)
	}
}

func main() {
	// todo : learn how to handle panic
	go func() {
		defer func() {
			if r := recover(); r != nil {
				fmt.Println("Recovered. Error:\n", r)
			}
		}()
		panic("a panic")
	}()
	flag.Parse()
	log.SetFlags(0)
	fmt.Println("wind-im running...")
	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})
	r.GET("/echo", controller.Echo)
	r.GET("/", controller.Home)
	log.Fatal(r.Run(*controller.Addr))

	r.Run() // listen and serve on 0.0.0.0:8080
}
