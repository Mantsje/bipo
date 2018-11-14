/* Example instance
  {
    team: 0,
    playerName0: PlayerStat,
    playerName1: PlayerStat,
    playerName2: PlayerStat
  }

*/
import PlayerStat from './PlayerStat'

export default class TeamStat {
  constructor (team) {
    this.team = team
    for (let p in team.players) {
      this[team.players[p].name] = new PlayerStat(team.players[p])
    }
  }
}
