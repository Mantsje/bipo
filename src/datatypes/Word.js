import { generateKey, formatString } from './helperScripts/stringFormatter'

export default class Word {
  constructor (word, hint) {
    this.wordID = generateKey(word)
    this.word = formatString(word)
    this.addedOn = new Date().toDateString()
    this.hint = hint
  }

  static fromJSON (data) {
    let w = new Word(data.word, data.hint)
    w.wordID = data.wordID
    w.word = data.word
    w.addedOn = data.addedOn
    w.hint = data.hint
    return w
  }
}
