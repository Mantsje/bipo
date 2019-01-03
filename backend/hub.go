// Copyright 2013 The Gorilla WebSocket Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package main

import(
		"log"
)

// Hub maintains the set of active clients and broadcasts messages to the
// clients.
type Hub struct {
	// Registered Rooms
	registeredRooms map[string]*Room

	// Create a room for hosts
	createRoom chan *Client

	// Join a room
	joinRoom chan *JoiningClientData

	// send data through channel
	broadcast chan *SendingData
}

func newHub() *Hub {
	return &Hub{
		registeredRooms: 	make(map[string]*Room),
		createRoom: 		make(chan *Client),
		joinRoom:			make(chan *JoiningClientData),
		broadcast:			make(chan *SendingData),
	}
}

func (h *Hub) run() {
	for {
		select {
			case client := <- h.createRoom:
				/** This creates a new room, when a new game will be hosted.
				*	If a certain room code already exists, it generates a different one.
				*/
				currentRoom := newRoom(client, h)

				// Add room to registered rooms in hub
				h.registeredRooms[currentRoom.code] = currentRoom

				// Add current room to client
				client.joinedRoom = currentRoom

				// Add current client to room
				currentRoomClients := h.registeredRooms[currentRoom.code].connectedClients
				h.registeredRooms[currentRoom.code].connectedClients = append(currentRoomClients, client)			

			case joiningClientData := <- h.joinRoom:
				/** This joins a client to a certain room. 
				* 	joiningClientData contains a room code and the client that wants to join.
				*/

				// if the room does not exist, close the websocket connection of the client that tries to join
				if _, ok := h.registeredRooms[joiningClientData.roomCode]; !ok {
					joiningClientData.client.conn.Close()
				}
				
				// Join room to client
				joiningClientData.client.joinedRoom = h.registeredRooms[joiningClientData.roomCode]
				// Join client to room
				currentRoomClients := h.registeredRooms[joiningClientData.roomCode].connectedClients
				h.registeredRooms[joiningClientData.roomCode].connectedClients = append(currentRoomClients, joiningClientData.client)

			case sendingData := <- h.broadcast:
				/** Broadcast a message to all clients in a specific room.
				*	Only rooms registered in the hub can be accessed.
				*/
				connectedClients := h.registeredRooms[sendingData.roomCode].connectedClients
				if connectedClients == nil {
					log.Println("No clients exist in the room, or the room does not exist")
				}
				for _, client := range connectedClients { 
					client.send <- sendingData.message
				}
		}
	}
}