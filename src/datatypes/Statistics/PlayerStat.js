/* Example instance
  {
    player: string,
    words: [ TurnStat, TurnStat, TurnStat ]
  }

*/
import TurnStat from './TurnStat'

export default class PlayerStat {
  constructor (playerName) {
    this.player = playerName
    this.turns = []
  }

  static fromJSON (data) {
    let out = new PlayerStat('')
    out.player = data.player
    out.turns = data.turns.map((x) => TurnStat.fromJSON(x))
    return out
  }
}
