import RoundStat from '../../datatypes/Statistics/RoundStat'

export const AinitRound = {
  mutation: function (state) {
    state.rounds.push(new RoundStat(0, []))
  },
  action: undefined
}

export const Aingame = {

}
