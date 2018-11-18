import Player from './Player'

export default class Team {
  constructor (name, id, players) {
    this.id = id
    this.name = name
    this.players = players
  }

  static fromJSON (data) {
    return new Team(data.id, data.name, data.players.map(x => Player.fromJSON(x)))
  }
}
