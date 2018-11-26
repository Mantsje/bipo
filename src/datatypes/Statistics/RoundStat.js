/* Example instance
  {
    round: 2,
    teamName0: TeamStat,
    teamName1: TeamStat,
  }

*/
import TeamStat from './TeamStat'

export default class RoundStat {
  constructor (round, teams) {
    this.round = round
    this.teamstats = []
    for (let t in teams) {
      this.teamstats.push(new TeamStat(teams[t]))
    }
    this.bestPlayer = 'EMPTYBEST'
    this.worstPlayer = 'EMPTYWORST'
    this.winningTeam = 'EMPTYWINTEAM'
  }

  static fromJSON (data) {
    let out = new RoundStat(data.round, [])
    out.bestPlayer = data.bestPlayer
    out.worstPlayer = data.worstPlayer
    out.winningTeam = data.winningTeam
    out.teamstats = data.teamstats.map((x) => TeamStat.fromJSON(x))
    return out
  }
}
