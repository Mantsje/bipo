/* Example instance
  {
    round: round.DEPICT,
    teamName0: TeamStat,
    teamName1: TeamStat,
  }

*/
import TeamStat from './TeamStat'

export default class RoundStat {
  constructor (round, teams) {
    this.round = round
    for (let t in teams) {
      this[teams[t].name] = new TeamStat(teams[t])
    }
  }
}
