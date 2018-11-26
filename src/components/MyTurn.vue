<template>
  <div class="MyTurn">
    <button v-if="!start" v-on:click="onStartTurn" type="button">Start my turn</button>
    <div v-else-if="!turnEnd">
      <p>{{ currentWord.word }}</p>
      <p>{{ currentWord.hint == '' ? '' : '(' + currentWord.hint + ')' }}</p>
      <button v-on:click="onGotIt">Got it!</button>
      <span>{{ turntime }}</span>
    </div>
    <div v-else-if="!roundEnd">
      <span>Time over! This turn is finished</span>
    </div>
    <div v-else>
      <span>You finished the last word! Good job!</span>
    </div>
  </div>
</template>

<script>
import Word from '../datatypes/Word.js'
import { shuffleArray } from '@/datatypes/helperScripts/arrayManipulation'

export default {
  name: 'MyTurn',
  data: function () {
    return {
      start: false,
      turnEnd: false,
      roundEnd: false,
      turntime: this.$store.state.settings.turnTime,
      currentWord: new Word('WORD', 'HINT'),
      guessed: [],
      intervalID: undefined,
      words: shuffleArray(JSON.parse(JSON.stringify(this.$store.state.controller.wordsLeft)).map(x => Word.fromJSON(x)))
    }
  },
  methods: {
    onStartTurn: function () {
      this.getNextWord()
      this.start = true
      this.intervalID = setInterval(() => {
        if (this.turntime <= 0) {
          this.turnEnd = true
          clearInterval(this.intervalID)
          this.$store.dispatch('controller/nextTurn', this.guessed)
          return
        }
        this.turntime--
      }, 1000)
    },
    onGotIt: function () {
      this.guessed.push(this.currentWord)
      this.getNextWord()
    },
    getNextWord: function () {
      if (this.words.length > this.guessed.length) {
        this.currentWord = this.words[this.guessed.length]
      } else {
        this.turnEnd = true
        this.roundEnd = true
        clearInterval(this.intervalID)
        this.$store.dispatch('controller/endRound', this.guessed)
      }
    }
  }
}
</script>
