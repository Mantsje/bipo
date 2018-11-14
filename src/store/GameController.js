import { Round, RoundStatus } from './datatypes/enums'

export default {
  state: {
    turnNr: -1,
    turn: 'PLAYERNAME',
    currentRound: Round.DESCRIBE,
    roundStatus: RoundStatus.PRE,
    teams: [],
    words: [],
    wordsLeft: []
  },
  mutations: {},
  actions: {}
}
