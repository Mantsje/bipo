import store from '../store/store'
import router from '../router'
import MessageHandler from './MessageHandler'
import MessageBuilder from './MessageBuilder'

export default class HubConnection {
  constructor () {
    this.store = store
    this.router = router
    this.messageHandler = new MessageHandler(store)
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
    console.log('TODO try to add new player (I.E. send join message to hub)')
    this.router.push('/pregame')
  }

  onOpenAsHost (event) {
    console.log('Connection to the gameroom opened')
    console.log('TODO Send game currently instantiated by host to the hub)')
    console.log('TODO try to add new player (I.E. send join message to hub)')
    this.router.push('/pregame')
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
