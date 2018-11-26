import Player from '@/datatypes/Player'
import Team from '@/datatypes/Team'
import Word from '@/datatypes/Word'
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
    switch (message.type) {
      case MessageTypes.INITGAME: { this.receiveInitGame(message.data); break }
      case MessageTypes.ADDPLAYER: { this.addAPlayer(message.data); break }
      case MessageTypes.SETPLAYERS: { this.setPlayers(message.data); break }
      case MessageTypes.UPDATESETTINGS: { this.updateSettings(message.data); break }
      case MessageTypes.READYAPLAYER: { this.readyAPlayer(message.data); break }
      case MessageTypes.SUBMITWORDS: { this.submitWords(message.data); break }
      case MessageTypes.TOPAGE: { this.toPage(message.data); break }
      case MessageTypes.SETTEAMS: { this.setTeams(message.data); break }
      case MessageTypes.UPDATECONTROLLER: { this.updateController(message.data); break }
      case MessageTypes.STARTROUND: { this.startRound(message.data); break }
      case MessageTypes.ENDROUND: { this.endRound(message.data); break }
      case MessageTypes.NEXTTURN: { this.nextTurn(message.data); break }
    }
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

    // The host has another settings page in between, but does receive this message
    if (this.store.state.host !== this.store.state.thisPlayer.name) {
      this.router.push('/setupgame')
    }
  }

  addAPlayer (data) {
    console.log('Add player message received')
    this.store.commit('addAPlayer', Player.fromJSON(data))
  }

  setPlayers (data) {
    console.log('set players message received')
    let players = data.map(x => Player.fromJSON(x))
    this.store.commit('setThisPlayer', players[players.map(x => x.name).indexOf(this.store.state.thisPlayer.name)])
    for (let idx in players) {
      this.store.commit('setAPlayer', players[idx])
    }
  }

  updateSettings (data) {
    console.log('Update settings message received')
    this.store.commit('settings/updateSettings', data)
    this.router.push('./setupgame')
  }

  readyAPlayer (data) {
    console.log('ready a player message received')
    let player = Player.fromJSON(data)
    this.store.commit('readyAPlayer', player)

    // Now if you're host, check if everybody is ready
    let host = this.store.state.host
    let me = this.store.state.thisPlayer
    if (this.store.state.players.every((x) => x.ready)) {
      this.router.push('/teamlobby')
      if (me.name === host) {
        this.store.dispatch('controller/computeTeams').then(() => {
          this.store.dispatch('controller/initNextRound')
        })
      }
    }
  }

  submitWords (data) {
    console.log('submit words message received')
    let words = data.map(x => Word.fromJSON(x))
    this.store.commit('controller/addWords', words)
  }

  toPage (data) {
    console.log('to page message received')
    this.router.push(data)
  }

  setTeams (data) {
    console.log('set teams message received')
    let teams = data.map(t => Team.fromJSON(t))
    this.store.commit('controller/setTeams', teams)
  }

  updateController (data) {
    console.log('update controller message received')
    this.store.commit('controller/updateController', data)
  }

  startRound (data) {
    // Data is undefined so don't use, just a message to start
    console.log('start round message received')
    this.store.commit('controller/startRound')
    this.store.dispatch('controller/playOrWait')
  }

  endRound (data) {
    console.log('end round message received')
    let words = data.map(x => Word.fromJSON(x))
    this.store.commit('controller/processWordsGuessed', words)
    this.store.commit('controller/endRound')
    this.router.push('/statistics')
  }

  nextTurn (data) {
    console.log('next turn message received')
    let words = data.map(x => Word.fromJSON(x))
    this.store.commit('controller/processWordsGuessed', words)
    this.store.commit('controller/nextTurn')
    this.store.dispatch('controller/playOrWait')
  }
}
