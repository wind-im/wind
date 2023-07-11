package dao

import (
	"context"
	"fmt"
	"log"
	"testing"

	"github.com/wind-im/wind/ent"
)

func TestCreateUser(t *testing.T) {
	u, err := createUser(context.Background(), EntClient)
	if err != nil {
		t.Fatalf("can not create user, e: %s", err)
	}
	fmt.Printf("user created: %s\n", u)
}

func createUser(ctx context.Context, client *ent.Client) (*ent.User, error) {
    if client == nil {
        return nil, fmt.Errorf("nil client error")
    }
	u, err := client.User.
		Create().
		SetAge(30).
		SetName("sawyer").
        SetPwd("x").
		Save(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed creating user: %w", err)
	}
	log.Println("user was created: ", u)
	return u, nil
}

