package main

import (
	"fmt"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
	_ "github.com/wind-im/wind/internal/dao"
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	s3Bucket := os.Getenv("S3_BUCKET")
	secretKey := os.Getenv("SECRET_KEY")
	fmt.Println(s3Bucket)
	fmt.Println(secretKey)

}

func main() {
	// err := godotenv.Load()
	// if err != nil {
	// 	log.Fatal("Error loading .env file")
	// }
	//    fmt.Println("load .env")
	// // Configure the database connection (always check errors)
	// db, err := sql.Open("mysql", "root:my-secret-pw@(127.0.0.1:3306)/db?parseTime=true")
	//
	//    if err != nil {
	//        fmt.Println(err)
	//    }
	//
	// // Initialize the first connection to the database, to see if everything works correctly.
	// // Make sure to check the error.
	// err = db.Ping()
	//    if err != nil {
	//        fmt.Println(err)
	//    }
	//
	//    query := `
	//    CREATE TABLE users (
	//        id INT AUTO_INCREMENT,
	//        username TEXT NOT NULL,
	//        password TEXT NOT NULL,
	//        created_at DATETIME,
	//        PRIMARY KEY (id)
	//    );`
	//    _, err = db.Exec(query)
	//    if err != nil {
	//        fmt.Println(err)
	//    }

}
