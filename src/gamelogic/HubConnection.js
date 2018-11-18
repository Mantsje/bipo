import store from '../store/store'
import router from '../router'
import MessageHandler from './MessageHandler'
import MessageBuilder from './MessageBuilder'
import { MessageTypes } from './MessageTypes'

export default class HubConnection {
  constructor () {
    this.store = store
    this.router = router
    this.messageHandler = new MessageHandler(store, router)
    this.postOffice = new MessageBuilder(store, this)
    this.socket = undefined
  }

  connect (url) {
    this.socket = WebSocket(url)
    if (this.store.state.host === this.store.thisPlayer.name) {
      this.socket.addEventListener('open', this.onOpenAsHost)
    } else {
      this.socket.addEventListener('open', this.onOpen)
    }
    this.socket.addEventListener('message', this.onMessage)
    this.socket.addEventListener('error', this.onError)
    this.socket.addEventListener('close', this.onClose)
  }

  onOpen (event) {
    console.log('Connection to the gameroom opened')
    this.postOffice.prepare(MessageTypes.ADDPLAYER, this.store.state.thisPlayer)
    this.router.push('/setupgame')
  }

  onOpenAsHost (event) {
    console.log('Connection to the gameroom opened')
    this.postOffice.prepare(MessageTypes.INITGAME, undefined)
    this.postOffice.prepare(MessageTypes.ADDPLAYER, this.store.state.thisPlayer)
    this.router.push('/setupsettings')
  }

  onClose (event) {
    console.log('Connection to the gameroom closed')
  }

  onError (event) {
    console.error('Error in the connection to the gameroom observed:', event)
  }

  onMessage (event) {
    console.log('Message received from connection:', event.data)
    this.messageHandler.handleMessage(event.data)
  }

  send (messagetype, data) {
    this.socket.send(this.postOffice.prepare(messagetype, data))
  }
}
