/* Example instance
  {
    playerName: Player,
    name: "turn8",
    words: [ WordStat, WordStat, WordStat ]
  }

*/

export default class TurnStat {
  constructor (turnNr, player) {
    this.playerName = player.name
    this.name = 'turn' + turnNr
    this.words = []
  }
}
