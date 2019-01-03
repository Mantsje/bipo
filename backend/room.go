package main


import(
		"math/rand"
)


const letterBytes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

const (
    letterIdxBits = 6                    // 6 bits to represent a letter index
    letterIdxMask = 1<<letterIdxBits - 1 // All 1-bits, as many as letterIdxBits
    letterIdxMax  = 63 / letterIdxBits   // # of letter indices fitting in 63 bits
)

/** Generate a random string of letters (for roomcodes) */
func randString(n int) string {
    b := make([]byte, n)
    for i, cache, remain := n-1, rand.Int63(), letterIdxMax; i >= 0; {
        if remain == 0 {
            cache, remain = rand.Int63(), letterIdxMax
        }
        if idx := int(cache & letterIdxMask); idx < len(letterBytes) {
            b[i] = letterBytes[idx]
            i--
        }
        cache >>= letterIdxBits
        remain--
    }
    return string(b)
}


//***
type Room struct {
	// This is a 4 letter string to identify this room
	code string

	// A slice containing all clients connected to this specific room
	connectedClients []*Client

	// This client is the host of this room
	host *Client
}


func newRoom(aspirantHost *Client, h *Hub) *Room {
	rCode := randString(4)
	for true {
		if _, ok := h.registeredRooms[rCode]; ok {
			rCode = randString(4)
		} else {
			break
		}
	}
	return &Room{
		code:				rCode,
		connectedClients:	make([]*Client, 0, 64),
		host:				aspirantHost,
	}
}