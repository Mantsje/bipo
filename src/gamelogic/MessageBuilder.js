import { MessageTypes } from './MessageTypes'
export default class MessageBuilder {
  constructor (store, hubconn) {
    this.conn = hubconn
    this.store = store
  }

  prepare (type, data) {
    console.log('Prepare message of type: ' + type)
    let preparedData = null

    switch (type) {
      case MessageTypes.INITGAME: { preparedData = this.initGame(); break }
      case MessageTypes.ADDPLAYER: { preparedData = data; break }
      case MessageTypes.UPDATESETTINGS: { preparedData = data; break }
      case MessageTypes.READYAPLAYER: { preparedData = data; break }
      case MessageTypes.SUBMITWORDS: { preparedData = data; break }
      case MessageTypes.TOPAGE: { preparedData = data; break }
      case MessageTypes.SETTEAMS: { preparedData = data; break }
      case MessageTypes.SETPLAYERS: { preparedData = data; break }
      case MessageTypes.UPDATECONTROLLER: { preparedData = data; break }
      case MessageTypes.STARTROUND: { preparedData = data; break }
      case MessageTypes.ENDROUND: { preparedData = data; break }
      case MessageTypes.NEXTTURN: { preparedData = data; break }
      case MessageTypes.NEWROUNDSTAT: { preparedData = data; break }
      case MessageTypes.PUSHNEWTURNSTAT: { preparedData = data; break }
      case MessageTypes.DEREADYALL: { preparedData = data; break }
    }

    if (preparedData === null) {
      console.error('Prepared message was null')
    }

    let message = {
      type: type,
      data: preparedData
    }
    return message
  }

  initGame () {
    return {
      statistics: this.store.state.statistics,
      controller: this.store.state.controller,
      settings: this.store.state.settings,
      roomCode: this.store.state.roomCode,
      archived: this.store.state.archived,
      host: this.store.state.host,
      players: this.store.state.players
    }
  }
}
