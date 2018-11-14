import { generateKey, formatString } from './helperScripts/stringFormatter'

export default class Word {
  constructor (word, hint) {
    this.wordID = generateKey(this.word)
    this.word = formatString(word)
    this.addedOn = new Date().toDateString()
    this.hint = hint
  }
}
