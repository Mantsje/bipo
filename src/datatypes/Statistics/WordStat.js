/* Example instance
  {
    startTime: "47",
    endTime: "34",
    word: Word
  }
*/
import Word from '../Word'

export default class WordStat {
  constructor (word, startTime, endTime) {
    this.startTime = startTime
    this.endTime = endTime
    this.word = word
  }

  static fromJSON (data) {
    let out = new WordStat(undefined, -1, -1)
    out.startTime = data.startTime
    out.endTime = data.endTime
    out.words = Word.fromJSON(data.word)
    return out
  }
}
