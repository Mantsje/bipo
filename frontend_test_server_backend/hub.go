// Copyright 2013 The Gorilla WebSocket Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package main

import (
	// "bytes"
	"fmt"
)
// Hub maintains the set of active clients and broadcasts messages to the
// clients.
type Hub struct {
	// Registered clients.
	clients map[*Client]bool

	// Inbound messages from the clients.
	broadcast chan []byte

	// Register requests from the clients.
	register chan *Client

	// Unregister requests from clients.
	unregister chan *Client
}

func newHub() *Hub {
	return &Hub{
		broadcast:  make(chan []byte),
		register:   make(chan *Client),
		unregister: make(chan *Client),
		clients:    make(map[*Client]bool),
	}
}

func (h *Hub) run() {
	var messageQ [][]byte
	var connected = 0
	for {
		select {
		case client := <-h.register:
			connected += 1
			h.clients[client] = true
			for _, m := range messageQ {
				select {
				case client.send <- m:
				default:
					close(client.send)
					delete(h.clients, client)
				}
			}
		case client := <-h.unregister:
			if _, ok := h.clients[client]; ok {
				delete(h.clients, client)
				close(client.send)
				fmt.Println("Unregistered someone")
				connected -= 1
				if connected == 0 {
					fmt.Println("Unregistered all, removing game")
					messageQ = [][]byte{}
				}
			}
		case message := <-h.broadcast:
			// s := string(message[:len(message)])
			// fmt.Println(s)
			messageQ = append(messageQ, message)
			for client := range h.clients {
				select {
				case client.send <- message:
				default:
					close(client.send)
					delete(h.clients, client)
				}
			}
		}
	}
}
