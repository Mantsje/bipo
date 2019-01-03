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
    this.teamID = team.id
    for (let p in team.players) {
      this[team.players[p].name] = new PlayerStat(team.players[p])
    }
  }

  static fromJSON (data) {
    let out = new TeamStat({ teamID: '', players: [] })
    out.teamID = data.teamID
    delete data.teamID
    for (let key in data) {
      out[key] = PlayerStat.fromJSON(data[key])
    }
    return out
  }
}
