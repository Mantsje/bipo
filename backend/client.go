// Copyright 2013 The Gorilla WebSocket Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package main

import (
	"log"
	"net/http"
	"time"
	"github.com/gorilla/websocket"
	"encoding/json"
)

const (
	// Time allowed to write a message to the peer.
	writeWait = 10 * time.Second

	// Time allowed to read the next pong message from the peer.
	pongWait = 60 * time.Second

	// Send pings to peer with this period. Must be less than pongWait.
	pingPeriod = (pongWait * 9) / 10

	// Maximum message size allowed from peer.
	maxMessageSize = 512
)

var (
	newline = []byte{'\n'}
	space   = []byte{' '}
)

var upgrader = websocket.Upgrader{}

// Client is a middleman between the websocket connection and the hub.
type Client struct {
	hub *Hub

	// The websocket connection.
	conn *websocket.Conn
	
	// The name of the client
	playerName string

	// Buffered channel of outbound messages.
	send chan []byte

	// Send the room code back to the host
	sendRoomCode chan string

	// Boolean to check if this client is a host
	isHost bool

	// This is the room that the client is connected to
	joinedRoom *Room
}

func newClient(name string, hub *Hub, conn *websocket.Conn) *Client {
	return &Client{
		hub: hub,
		conn: conn,
		playerName: name,
		send: make(chan []byte, 256),
		sendRoomCode: make(chan string),
		isHost: false,
		joinedRoom: nil,
	}
}

/*
case MessageTypes.INITGAME: { this.receiveInitGame(message.data); break }
case MessageTypes.ADDPLAYER: { this.addAPlayer(message.data); break }
case MessageTypes.SETPLAYERS: { this.setPlayers(message.data); break }
case MessageTypes.UPDATESETTINGS: { this.updateSettings(message.data); break }
case MessageTypes.READYAPLAYER: { this.readyAPlayer(message.data); break }
case MessageTypes.SUBMITWORDS: { this.submitWords(message.data); break }
case MessageTypes.TOPAGE: { this.toPage(message.data); break }
case MessageTypes.SETTEAMS: { this.setTeams(message.data); break }
case MessageTypes.UPDATECONTROLLER: { this.updateController(message.data); break }
case MessageTypes.STARTROUND: { this.startRound(message.data); break }
case MessageTypes.ENDROUND: { this.endRound(message.data); break }
case MessageTypes.NEXTTURN: { this.nextTurn(message.data); break }
*/

// readPump pumps messages from the websocket connection to the hub.
//
// The application runs readPump in a per-connection goroutine. The application
// ensures that there is at most one reader on a connection by executing all
// reads from this goroutine.

func (c *Client) wsToHub() {
	defer func() {
		c.conn.Close()
	}()
	if c.isHost {
		c.sendRoomCode <- c.joinedRoom.code
	}
	for {
		_, jsonMessage, err := c.conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v", err)
			}
			log.Println("Something went wrong with parsing the JSON message in \"client.go\"")
		}
		message := handleMessage(jsonMessage, c)
		if message == nil {
			break
		}
		// Send the message, and the room to which the message should be sent
		c.hub.broadcast <- newSendingData(c.joinedRoom.code, message)
	}
}

// writePump pumps messages from the hub to the websocket connection.
//
// A goroutine running writePump is started for each connection. The
// application ensures that there is at most one writer to a connection by
// executing all writes from this goroutine.
func (c *Client) hubToWs() {
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
		c.conn.Close()
	}()
	for {
		select {
		case message, ok := <-c.send:
			if ok {
				
				// Write the message to each client
				c.conn.SetWriteDeadline(time.Now().Add(writeWait))
				if !ok {
					// The hub closed the channel.
					c.conn.WriteMessage(websocket.CloseMessage, []byte{})
					return
				}
				//w, err := c.conn.NextWriter(websocket.TextMessage)
				err := c.conn.WriteMessage(websocket.TextMessage, message)
				if err != nil {
					log.Println(err)
					return
				}
				//log.Println(message)
				
			}
		case roomCode := <-c.sendRoomCode:
			// Write the message to each client
			c.conn.WriteJSON(newServerRoomCode(roomCode))
		}
	}
}



func serveWsToClient(code string, playerName string, hub *Hub, w http.ResponseWriter, r *http.Request) {
	/*** NEEDS TO BE FIXED, NOT A GOOD SOLUTION */
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }
	/*** TODO*/
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}

	client := newClient(playerName, hub, conn)

	/** Join a room */
	client.hub.joinRoom <- newJoiningClientData(client, code)

	/** The websocket connection makes a two-way path */
	go client.hubToWs()
	go client.wsToHub()
}

func serveWsToHost(playerName string, hub *Hub, w http.ResponseWriter, r *http.Request) {
	/*** NEEDS TO BE FIXED, NOT A GOOD SOLUTION */
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }
	/*** TODO*/
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}
	client := newClient(playerName, hub, conn)

	/**** Create a room and start hosting */
	client.hub.createRoom <- client
	client.isHost = true


	/** The websocket connection makes a two-way path */
	go client.wsToHub()
	go client.hubToWs()
}