import Player from './Player'

export default class Team {
  constructor (name, id, players) {
    this.id = id
    this.name = name
    this.players = players
  }

  static fromJSON (data) {
    return new Team(data.name, data.id, data.players.map(x => Player.fromJSON(x)))
  }
}
