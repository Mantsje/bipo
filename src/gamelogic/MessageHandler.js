import Player from '../datatypes/Player'
import Team from '../datatypes/Team'
import Word from '../datatypes/Word'
import { MessageTypes } from './MessageTypes'

/* A default message looks like:
  Message = {
    type: MessageTypes (one of)
    data: JSONObject which is either done or we can call Class.fromJSON(data) on (or on one of its subcomponents)
  }
*/

/* A default message handler looks like this:
  handlerName (data) {
    console.log('message type message received') -> is for debugging purposes
    parse all JSON objects into appropriate classes using class.fromJSON(data)
    call store manipulator functions to update game state of client
  }
  And is called by adding the following line to switch statement:
    case MessageType.MESSAGETYPE: { this.handlerName(message.data); break }
*/

export default class MessageHandler {
  constructor (store, router) {
    this.store = store
    this.router = router
  }

  handleMessage (message) {
    console.log('asked to handle message:' + message)
    switch (message.type) {
      case MessageTypes.INITGAME: { this.receiveInitGame(message.data); break }
      case MessageTypes.ADDPLAYER: { this.addAPlayer(message.data); break }
      case MessageTypes.UPDATESETTINGS: { this.updateSettings(message.data); break }
      case MessageTypes.READYPLAYER: { this.readyAPlayer(message.data); break }
    }
  }

  addAPlayer (data) {
    console.log('Add player message received')
    this.store.commit('addAPlayer', Player.fromJSON(data))
  }

  receiveInitGame (data) {
    console.log('Init game message received')
    data.players = data.players.map((p) => { Player.fromJSON(p) })
    data.controller.teams = data.controller.teams.map((t) => { Team.fromJSON(t) })
    data.controller.words = data.controller.words.map((w) => { Word.fromJSON(w) })
    data.controller.wordsLeft = data.controller.wordsLeft.map((w) => { Word.fromJSON(w) })

    if (data.players.map(x => x.name).includes(this.store.state.thisPlayer.name)) {
      // If this player is already in the set of players (I.E. this is a rejoin, also update the thisPlayer var)
      this.store.commit('setThisPlayer', data.players[data.players.map(x => x.name).indexOf(this.store.thisPlayer.name)])
    }
    this.store.commit('mirrorGame', data)
    this.store.commit('controller/updateController', data.controller)
    this.store.commit('settings/updateSettings', data.settings)
    this.store.commit('statistics/mirrorStats', data.statistics)
  }

  updateSettings (data) {
    console.log('Update settings message received')
    this.store.commit('controller/updateSettings', data)
    this.router.push('./setupgame')
  }

  readyAPlayer (data) {
    let player = Player.fromJSON(data.player)
    this.store.commit('readyAPlayer', player)
  }
}
