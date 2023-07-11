package dao

import (
	"context"
	"fmt"
	"log"

	_ "github.com/mattn/go-sqlite3"
	"github.com/wind-im/wind/ent"
	"github.com/wind-im/wind/internal/config"
)

var EntClient *ent.Client

func init() {
	dbUrl := config.DB_URL
	fmt.Println("init db connection with db url: ", dbUrl)
    var err error
    EntClient, err = ent.Open("sqlite3", dbUrl)
	if err != nil {
		log.Fatalf("failed opening connection to sqlite: %v", err)
	}
	// defer client.Close()
	// Run the auto migration tool.
	if err := EntClient.Schema.Create(context.Background()); err != nil {
		log.Fatalf("failed creating schema resources: %v", err)
	}
    fmt.Println("db connection init", EntClient)
}
