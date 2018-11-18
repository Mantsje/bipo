<template>
  <div class="MyTurn">
    <button v-if="!start" v-on:click="onStartTurn" type="button">Start my turn</button>
    <div v-else>
      <p>{{ currentWord.word }}</p>
      <p>( {{ currentWord.hint }} )</p>
      <button v-on:click="onGotIt">Got it!</button>
      <span>{{ turntime }}</span>
    </div>
  </div>
</template>

<script>
import Word from '../datatypes/Word.js'

export default {
  name: 'MyTurn',
  data: function () {
    return {
      start: false,
      turntime: 60,
      currentWord: new Word('WORD', 'HINT'),
      guessed: []
    }
  },
  methods: {
    onStartTurn: function () {
      this.start = true
      let intervalID = setInterval(() => {
        if (this.turntime <= 0) {
          console.log('End Turn')
          clearInterval(intervalID)
          return
          // endTurn()
        }
        this.turntime--
      }, 1000)
    },
    onGotIt: function () {
      this.guessed.push(this.currentWord)
      console.log('Get the next word')
      // this.currentWord = getNextWord()
    }
  }
}
</script>
