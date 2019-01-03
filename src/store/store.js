import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'

import GameSettings from './modules/GameSettings.js'
import GameController from './modules/controller/GameController.js'
import Statistics from './modules/statistics/Statistics.js'

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
    initHubConnection: function (state, { router, store }) {
      state.hubconn.init(store, router)
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

    addAPlayer: Aplayers.add.mutation,
    setAPlayer: Aplayers.set.mutation,
    readyAPlayer: Aplayers.ready.mutation,
    deReadyAll: Aplayers.deReadyAll.mutation
  },

  actions: {
    joinGame: function (context, { playerName, roomCode }) {
      console.log('Attempting joinGame action')

      context.commit('createThisPlayer', playerName)

      // let hubURL = 'ws://localhost:8082/ws/join?playerName=' + playerName + '&roomCode=' + roomCode
      let hubURL = 'ws://192.168.178.52:8082/ws'
      context.commit('openHubConnection', hubURL)
    },
    // Create a new player, instantiate a game, and only when that is finished make the connection with the hub
    hostGame: function (context, { playerName }) {
      console.log('Attempting hostGame action')
      context.commit('createThisPlayer', playerName)
      instantiateGame(playerName)
        .then(() => {
          // let hubURL = 'ws://localhost:8082/ws/host?playerName=' + playerName
          // context.commit('openHubConnection', hubURL)
          let hubURL = 'ws://192.168.178.52:8082/ws'
          let roomCode = 'AAAA'
          context.dispatch('setRoomCodeDirectly', roomCode)
            .then(() => {
              context.commit('openHubConnection', hubURL)
            }, () => {
              console.log(Error('setRoomCode rejected'))
            })
        })
    },
    setRoomCodeDirectly: function (context, roomCode) {
      context.commit('setRoomCode', roomCode)
    },

    instantiateGame: AcreateGame.action,
    readyAPlayer: AthisPlayer.ready.action,
    deReadyAll: Aplayers.deReadyAll.action
  }
})
