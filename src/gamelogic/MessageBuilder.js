import { MessageTypes } from './MessageTypes'
export default class MessageBuilder {
  constructor (store, hubconn) {
    this.conn = hubconn
    this.store = store
  }

  prepare (type, data) {
    console.log('Prepare some message')
    let preparedData = null

    switch (type) {
      case MessageTypes.INITGAME: { preparedData = this.initGame(); break }
      case MessageTypes.ADDPLAYER: { preparedData = data; break }
      case MessageTypes.UPDATESETTINGS: { preparedData = data; break }
      case MessageTypes.READYAPLAYER: { preparedData = data; break }
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
    console.log('assert that sending init game is going right!')
    return {
      statistics: this.store.statistics.state,
      controller: this.store.controller.state,
      settings: this.store.settings.state,
      roomCode: this.store.state.roomCode,
      archived: this.store.state.archived,
      host: this.store.state.host,
      players: this.store.state.players
    }
  }
}
