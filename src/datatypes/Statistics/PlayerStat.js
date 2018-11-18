/* Example instance
  {
    player: Player,
    words: [ TurnStat, TurnStat, TurnStat ]
  }

*/

export default class PlayerStat {
  constructor (player) {
    this.player = player
    this.turns = []
  }
}
