
export default class MessageBuilder {
  constructor (store, hubconn) {
    this.conn = hubconn
    this.store = store
  }

  prepare (type, data) {
    console.log('Prepare some message')
    let preparedData = {}

    let message = {
      type: type,
      data: preparedData
    }
    return message
  }
}
