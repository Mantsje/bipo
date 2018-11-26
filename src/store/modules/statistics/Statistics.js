import { AinitRound } from './actions'

export default {
  namespaced: true,
  state: {
    rounds: []
  },
  mutations: {
    mirrorStats: function (state, data) {
      for (let key in data) {
        state[key] = data[key]
      }
    },
    initNextRound: AinitRound.mutation
  },
  actions: {
    instantiateStats: function (context) {
      let data = { rounds: [] }
      context.commit('mirrorStats', data)
    },
    initNextRound: AinitRound.action
  }
}
