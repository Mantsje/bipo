import Vue from 'vue'
import Vuex from 'vuex'

import GameSettings from './GameSettings.js'
import GameController from './GameController.js'
import Statistics from './Statistics.js'

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
    players: []
  },
  mutations: {

  },
  actions: {
    // Await game endpoint, then create websocket connection to that endpoint and setup game variables
    joinGame: function (context, { playerName, roomcode }) {
      console.log('Attempting joinGame action')
    },
    // Await game endpoint, then create websocket connection to that endpoint and setup game variables
    hostGame: function (context, { playerName }) {
      console.log('Attempting hostGame action')
    }
  }
})
