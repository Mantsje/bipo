/* Example instance
  {
    playerName: string,
    name: "turn8",
    words: [ WordStat, WordStat, WordStat ]
  }

*/
import WordStat from './WordStat'
export default class TurnStat {
  constructor (turnNr, playerName) {
    this.playerName = playerName
    this.turn = 'turn' + turnNr
    this.words = []
  }

  static fromJSON (data) {
    let out = new TurnStat(-1, '')
    out.playerName = data.playerName
    out.turn = data.turn
    out.words = data.words.map((x) => WordStat.fromJSON(x))
    return out
  }
}
