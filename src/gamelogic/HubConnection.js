import MessageHandler from './MessageHandler'
import MessageBuilder from './MessageBuilder'
import { MessageTypes } from './MessageTypes'

export default class HubConnection {
  constructor () {
    // this.store = store
    // this.router = router
    this.store = undefined
    this.router = undefined
    this.messageHandler = undefined
    this.postOffice = undefined
    this.socket = undefined
  }

  init (store, router) {
    this.store = store
    this.router = router
    this.messageHandler = new MessageHandler(this.store, this.router)
    this.postOffice = new MessageBuilder(this.store, this)
  }

  connect (url) {
    this.socket = new WebSocket(url)
    if (this.store.state.host === this.store.state.thisPlayer.name) {
      this.socket.addEventListener('open', this.onOpenAsHost(this))
    } else {
      this.socket.addEventListener('open', this.onOpen(this))
    }
    this.socket.addEventListener('message', this.onMessage(this))
    this.socket.addEventListener('error', this.onError(this))
    this.socket.addEventListener('close', this.onClose(this))
  }

  // Needs level of indirection because 'this' becomes undefined, so needs hubconn
  onOpen (hubconn) {
    return function (event) {
      console.log('Connection to the gameroom opened')
      console.warn('Once this is done move this function to message handler receiveroomcode')
      let player = hubconn.postOffice.prepare(MessageTypes.ADDPLAYER, hubconn.store.state.thisPlayer)
      hubconn.sendMessage(player)
    }
  }

  // Needs level of indirection because 'this' becomes undefined, so needs hubconn
  onOpenAsHost (hubconn) {
    return function (event) {
      console.log('Connection to the gameroom opened')
      console.warn('Once this is done move this function to message handler receiveroomcode')
      let game = hubconn.postOffice.prepare(MessageTypes.INITGAME, undefined)
      let player = hubconn.postOffice.prepare(MessageTypes.ADDPLAYER, hubconn.store.state.thisPlayer)
      hubconn.sendMessage(game)
      hubconn.sendMessage(player)
      hubconn.router.push('/setupsettings')
    }
  }

  // Needs level of indirection because 'this' becomes undefined, so needs hubconn
  onClose (hubconn) {
    return function (event) {
      console.log('Connection to the gameroom closed')
    }
  }

  // Needs level of indirection because 'this' becomes undefined, so needs hubconn
  onError (hubconn) {
    return function (event) {
      console.error('Error in the connection to the gameroom observed:', event)
    }
  }

  // Needs level of indirection because 'this' becomes undefined, so needs hubconn
  onMessage (hubconn) {
    return function (event) {
      // console.log('Message received from connection:', event.data)
      hubconn.messageHandler.handleMessage(JSON.parse(event.data))
    }
  }

  sendMessage (message) {
    this.socket.send(JSON.stringify(message))
  }

  send (messagetype, data) {
    let message = this.postOffice.prepare(messagetype, data)
    this.sendMessage(message)
  }
}
