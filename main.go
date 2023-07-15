package main

import (
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
	"github.com/wind-im/wind/internal/controller"
    _ "github.com/wind-im/wind/internal/dao"
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file, err= ", err)
	}
}

func main() {
	fmt.Println("wind-im running...")
	r := gin.Default()
	r.GET("/ping", controller.Ping)
	r.GET("/echo", controller.Echo)
	r.GET("/", controller.Home)
	log.Fatal(r.Run(*controller.Addr))
    // dao.EntClient
    

	r.Run() // listen and serve on 0.0.0.0:8080
}
