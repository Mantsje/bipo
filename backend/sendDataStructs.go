package main

type ServerRoomCode struct {
	mType string `json:"type,omitempty"`

	data string `json:"data,omitempty"`
} 

func newServerRoomCode(roomCode string) *ServerRoomCode {
	return &ServerRoomCode{
		mType: "SERVERROOMCODE",
		data: roomCode,
	}
}



type SendingData struct {
	// To what room does the data have to be sent?
	roomCode string

	// What is the data that has beent sent?
	message []byte
}

func newSendingData(r string, msg []byte) *SendingData {
	return &SendingData{
		roomCode: r,
		message: msg,
	}
}


type JoiningClientData struct {
	// This is the client that will join a certain room
	client *Client

	// This is the room that the client will join to
	roomCode string
}

func newJoiningClientData(c *Client, code string) *JoiningClientData {
	return &JoiningClientData {
		client: c,
		roomCode: code,
	}
}