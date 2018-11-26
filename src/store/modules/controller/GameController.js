import { RoundStatus } from '@/datatypes/enums'
import { Apregame, Aingame } from './actions'

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
    },
    addWords: Apregame.submitWords.mutation,
    setTeams: Apregame.teams.mutation,
    startRound: Aingame.round.start.mutation,
    processWordsGuessed: Aingame.turn.processWords.mutation,
    nextTurn: Aingame.turn.next.mutation,
    endRound: Aingame.round.end.mutation
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
    },

    submitWords: Apregame.submitWords.action,
    computeTeams: Apregame.teams.action,
    initNextRound: Aingame.round.initNext.action,
    startRound: Aingame.round.start.action,
    playOrWait: Aingame.playOrWait.action,
    nextTurn: Aingame.turn.next.action,
    endRound: Aingame.round.end.action
  }
}
