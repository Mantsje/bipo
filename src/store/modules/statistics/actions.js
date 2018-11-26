import RoundStat from '@/datatypes/Statistics/RoundStat'
import { MessageTypes } from '@/gamelogic/MessageTypes'

export const AinitRound = {
  mutation: function (state, roundStat) {
    console.log(roundStat)
    state.rounds.push(roundStat)
  },
  action: function (context, roundNr) {
    context.rootState.hubconn.send(MessageTypes.NEWROUNDSTAT, new RoundStat(roundNr, context.rootState.controller.teams))
  }
}

export const Aingame = {

}
