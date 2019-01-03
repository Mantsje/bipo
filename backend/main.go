// Copyright 2013 The Gorilla WebSocket Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package main

import (
	"flag"
	"log"
	"net/http"
)

var addr = flag.String("addr", ":8082", "http service address")
var hub *Hub

func serveIndex(w http.ResponseWriter, r *http.Request) {
	log.Println(r.URL)
	if r.URL.Path != "/" {
		http.Error(w, "Not found", http.StatusNotFound)
		return
	}
	if r.Method != "GET" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}
	http.ServeFile(w, r, "index.html")
}

func hostGame(w http.ResponseWriter, r *http.Request) {
	log.Println("here maybe?")
	playerNames, ok := r.URL.Query()["playerName"]
    if !ok || len(playerNames) > 1 {
        log.Println("Url Param 'playerName' is missing or contains more than 1 parameter")
        return
    }

    playerName := playerNames[0]

	serveWsToHost(playerName, hub, w , r)
}

func joinGame(w http.ResponseWriter, r *http.Request) {
	roomCodes, ok := r.URL.Query()["roomCode"]

    if !ok || len(roomCodes) > 1 {
        log.Println("Url Param 'roomCode' is missing or contains more than 1 parameter")
        return
    }

    playerNames, ok := r.URL.Query()["playerName"]

    if !ok || len(playerNames) > 1 {
        log.Println("Url Param 'playerName' is missing or contains more than 1 parameter")
        return
    }

    playerName := playerNames[0]
    currentRoomCode := roomCodes[0]

    serveWsToClient(currentRoomCode, playerName, hub, w, r)
}

func main() {
	flag.Parse()
	hub = newHub()
	go hub.run()

	//http.HandleFunc("/", serveIndex)
	http.HandleFunc("/ws/host", hostGame)
	http.HandleFunc("/ws/join", joinGame)
	log.Println("Running back-end server...")

	err := http.ListenAndServe(*addr, nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
