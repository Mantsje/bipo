package main


/*
case MessageTypes.INITGAME: 
case MessageTypes.ADDPLAYER: 
case MessageTypes.SETPLAYERS: 
case MessageTypes.UPDATESETTINGS: 
case MessageTypes.READYAPLAYER: 
case MessageTypes.SUBMITWORDS: 
case MessageTypes.TOPAGE: 
case MessageTypes.SETTEAMS: 
case MessageTypes.UPDATECONTROLLER:
case MessageTypes.STARTROUND: 
case MessageTypes.ENDROUND: 
case MessageTypes.NEXTTURN:
*/
import (
		"log"
		"encoding/json"
)

type MessageType string

const (
	INITGAME		string = "INITGAME"
	ADDPLAYER		string = "ADDPLAYER"
	SETPLAYERS  	string = "SETPLAYERS"
	UPDATESETTINGS	string = "UPDATESETTINGS"
	READYAPLAYER	string = "READYAPLAYER"
	SUBMITWORDS		string = "SUBMITWORDS"
	TOPAGE			string = "TOPAGE"
	SETTEAMS		string = "UPDATECONTROLLER"
	STARTROUND		string = "STARTROUND"
	ENDROUND		string = "ENDROUND"
	NEXTTURN		string = "NEXTTURN"
)

type Message struct {
	MessageType string 	`json:"type"`
	Data interface{}	`json:"data"`
}

func handleMessage(jsonMessage []byte, c *Client) []byte {
	// Read any messages that come in
	
	msg := &Message{}
	log.Println(string(jsonMessage))
	err := json.Unmarshal(jsonMessage, &msg)
	if err != nil {
		log.Println(err)
		return nil
	}
	log.Println("Receiving message of type: " + msg.MessageType)
	switch msg.MessageType {
		case INITGAME:
			log.Println(msg.Data)
			/*initGame () {
			    return {
			      statistics: this.store.state.statistics,
			      controller: this.store.state.controller,
			      settings: this.store.state.settings,
			      roomCode: this.store.state.roomCode,
			      archived: this.store.state.archived,
			      host: this.store.state.host,
			      players: this.store.state.players
			    }
			  }*/
		case ADDPLAYER:
		case SETPLAYERS:
		case UPDATESETTINGS:
		case READYAPLAYER:
		case SUBMITWORDS:
		case TOPAGE:
		case SETTEAMS:
		case STARTROUND:
		case ENDROUND:
		case NEXTTURN:
		default:
			log.Println("Not a familiar message type")
	}
	return jsonMessage
}



