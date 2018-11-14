import { Round } from './datatypes/enums'
import RoundStat from './datatypes/Statistics/RoundStat'

export default {
  state: {
    describe: new RoundStat(Round.DESCRIBE, []),
    depict: new RoundStat(Round.DEPICT, []),
    oneword: new RoundStat(Round.ONEWORD, [])
  },
  mutations: {},
  actions: {}
}
