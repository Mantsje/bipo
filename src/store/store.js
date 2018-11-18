import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import GameSettings from './modules/GameSettings.js'
import GameController from './modules/GameController.js'
import Statistics from './modules/Statistics.js'

import Player from '../datatypes/Player'
import HubConnection from '../gamelogic/HubConnection'
import { instantiateGame } from '../gamelogic/instantiateGame'
import { AcreateGame, AthisPlayer, Aplayers, AroomCode } from './actions'

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
    mirrorGame: function (state, data) {
      state.roomCode = data.roomCode
      state.archived = data.archived
      state.host = data.host
      state.players = data.players
    },

    createGame: AcreateGame.mutation,

    setRoomCode: AroomCode.set.mutation,

    createThisPlayer: AthisPlayer.create.mutation,
    readyThisPlayer: AthisPlayer.ready.mutation,
    setThisPlayer: AthisPlayer.set.mutation,

    addPlayer: Aplayers.add.mutation,
    readyAPlayer: Aplayers.set.mutation
  },

  actions: {
    joinGame: function (context, { playerName, roomcode }) {
      console.log('Attempting joinGame action')

      context.commit('createThisPlayer', playerName)
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
      context.commit('createThisPlayer', playerName)
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

    instantiateGame: AcreateGame.action,
    readyPlayer: AthisPlayer.ready.action

  }
})
