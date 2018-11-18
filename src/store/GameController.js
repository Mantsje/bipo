import { RoundStatus } from '../datatypes/enums'

export default {
  namespaced: true,
  state: {
    turnNr: -1,
    turn: 'PLAYERNAME',
    currentRound: -1,
    roundStatus: -1,
    teams: [],
    words: [],
    wordsLeft: []
  },
  mutations: {
    updateController: function (state, data) {
      for (let key in data) {
        state[key] = data[key]
      }
    }
  },
  actions: {
    instantiateController: function (context) {
      let data = {
        turnNr: -1,
        turn: 'PLAYERNAME',
        currentRound: -1,
        roundStatus: RoundStatus.PRE,
        teams: [],
        words: [],
        wordsLeft: []
      }
      context.commit('updateController', data)
    }
  }
}
