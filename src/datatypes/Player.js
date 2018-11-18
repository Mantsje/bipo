
export default class Player {
  constructor (name) {
    this.name = name
    this.teamID = -1
    this.ready = false
  }

  static fromJSON (data) {
    let p = new Player(data.name)
    p.ready = data.ready
    p.teamID = data.teamID
    return p
  }
}
