// import RoundStat from '../../datatypes/Statistics/RoundStat'

export default {
  namespaced: true,
  state: {
    // rounds: [new RoundStat(0, [])]
    rounds: []
  },
  mutations: {
    mirrorStats: function (state, data) {
      for (let key in data) {
        state[key] = data[key]
      }
    }
  },
  actions: {
    instantiateStats: function (context) {
      let data = { rounds: [] }
      context.commit('mirrorStats', data)
    }
  }
}
