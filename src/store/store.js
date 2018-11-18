import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import GameSettings from './GameSettings.js'
import GameController from './GameController.js'
import Statistics from './Statistics.js'

import Player from '../datatypes/Player'
import HubConnection from '../gamelogic/HubConnection'
import { MessageTypes } from '../gamelogic/MessageTypes'
import { instantiateGame } from '../gamelogic/instantiateGame'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    settings: GameSettings,
    controller: GameController,
    statistics: Statistics
  },
  state: {
    roomCode: 'ROOMCODE',
    archived: false,
    host: 'HOSTNAME',
    players: [],
    hubconn: new HubConnection(),
    thisPlayer: new Player('NOPLAYER')
  },

  mutations: {
    openHubConnection: function (state, hubURL) {
      state.hubconn.connect(hubURL)
    },
    createPlayer: function (state, playerName) {
      state.thisPlayer = new Player(playerName)
    },
    mirrorGame: function (state, data) {
      state.roomCode = data.roomCode
      state.archived = data.archived
      state.host = data.host
      state.players = data.players
    },
    setRoomCode: function (state, roomCode) {
      state.roomCode = roomCode
    },
    createGame: function (state, playerName) {
      state.host = playerName
      state.archived = false
      state.players = []
      state.roomCode = 'ROOMCODE'
    },
    addPlayer: function (state, player) {
      state.players.push(player)
    },
    readyAPlayer: function (state, player) {
      let pIndex = state.players.indexOf(x => x.name === player.name)
      state.players[pIndex].ready = true
    },
    readyThisPlayer: function (state) {
      state.thisPlayer.ready = true
    },
    setThisPlayer: function (state, newThisPlayer) {
      state.thisPlayer = newThisPlayer
    }
  },

  actions: {
    joinGame: function (context, { playerName, roomcode }) {
      console.log('Attempting joinGame action')

      context.commit('createPlayer', playerName)
      axios.get('/backend/join/' + roomcode)
        .then((response) => {
          let { hubURL } = response.data
          console.log('response target connection: ', hubURL)
          context.commit('openHubConnection', hubURL)
        })
    },
    // Create a new player, instantiate a game, and only when that is finished make the connection with the hub
    hostGame: function (context, { playerName }) {
      console.log('Attempting hostGame action')
      context.commit('createPlayer', playerName)
      instantiateGame(playerName)
        .then(() => {
          axios.get('/backend/host')
            .then((response) => {
              let { hubURL, roomCode } = response.data
              console.log('response target connection: ', hubURL)
              context.commit('setRoomCode', roomCode)
                .then(() => {
                  context.commit('openHubConnection', hubURL)
                })
            })
        })
    },

    instantiateGame: function (context, playerName) {
      context.commit('createGame', playerName)
    },

    readyPlayer: function (context) {
      console.log('player readied up!')
      this.hubconn.send(MessageTypes.READYPLAYER, context.state.thisPlayer)
      context.commit('readyThisPlayer')
    }

  }
})
