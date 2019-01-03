import { MessageTypes } from '../../gamelogic/MessageTypes'

export default {
  namespaced: true,
  state: {
    wordsPerPlayer: -1,
    singleDevice: false,
    DBFill: false,
    numTeams: -1,
    turnTime: -1,
    numRounds: -1,
    maxWordLength: -1,
    customTeams: false
  },
  mutations: {
    updateSettings: function (state, data) {
      for (let key in data) {
        state[key] = data[key]
      }
    }
  },
  actions: {
    instantiateSettings: function (context) {
      // The default settings
      let data = {
        wordsPerPlayer: 7,
        singleDevice: false,
        DBFill: false,
        numTeams: 2,
        turnTime: 60,
        numRounds: 3,
        maxWordLength: 50,
        customTeams: false
      }
      context.commit('updateSettings', data)
    },
    commitSettings: function (context, updatedSettings) {
      console.log('committing settings action')
      context.rootState.hubconn.send(MessageTypes.UPDATESETTINGS, updatedSettings)
    }
  }
}
