package main

type GameState struct {
	controller *GameController

	settings *GameSettings

	roomCode string

	host string

	connectedPlayers []*Player
}

type GameController struct {
	// What turn are we at right now?
	turnNumber int

	// Who's turn is it? (player name)
	turn string

	// Displays the status of the round
	status int

	// Arrays of teams
	teams []*Team

	// All words in the match
	words []*Word

	// The words that are still left to be guessed during this round
	wordsLeft []*Word
}

type GameSettings struct {
	wordsPerPlayer	int
	numTeams		int
	turnTime		int
	numRounds		int
	maxWordLength	int

	customTeams		bool
	singleDevice	bool // Will the game be played on only one device?
	DBFill			bool // Are players allowed to add words from the database?
}

type Player struct {
	name 		string
	teamID 		int
	ready 		int 
}

type Team struct {
	id 			int
	name 		string
	players 	[]*Player
}

type Word struct {
	wordID 		string
	word 		string
	addedOn 	string
}

func (c *Client) runGame() {
	
}