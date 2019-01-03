import { AinitRound, ApushNewTurn, AcomputeEndRound } from './actions'

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
    initNextRound: AinitRound.mutation,
    pushNewTurn: ApushNewTurn.mutation,
    computeEndRound: AcomputeEndRound.mutation
  },
  actions: {
    instantiateStats: function (context) {
      let data = { rounds: [] }
      context.commit('mirrorStats', data)
    },
    initNextRound: AinitRound.action,
    pushNewTurn: ApushNewTurn.action
  }
}
