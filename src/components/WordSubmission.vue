<template>
  <div class="WordSubmission">
    <form>
      <font-awesome-icon v-on:click="onDecrIdx" icon="arrow-left"/>
      <span v-on:click="onClickNumber(i)" :class="{active: i-1 == index}" v-for="i in Math.min(words.length + 1, wordsPerPlayer)" :key="i" class="wordNumber"> {{i}} </span>
      <font-awesome-icon v-on:click="onIncrIdx" icon="arrow-right"/>
      <br>
      <input v-model="wordField" type="text" placeholder="Word"/>
      <input v-model="hintField" type="text" placeholder="Hint">
      <span>{{ errorMessage }}</span>
      <div v-if="canSubmit">
        <button v-if="index === words.length && words.length !== wordsPerPlayer" v-on:click="onAddWord" type="button">Add Word</button>
        <button v-else v-on:click="onUpdateWord" type="button">Update Word</button>
        <button v-if="words.length === wordsPerPlayer" v-on:click="onSubmit" type="button">Submit Words</button>
      </div>
    </form>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

<script>
import { mapState } from 'vuex'
import Word from '../datatypes/Word.js'

export default {
  name: 'WordSubmission',
  data: function () {
    return {
      words: [],
      index: 0,
      wordField: '',
      hintField: '',
      canSubmit: true,
      errorMessage: ''
    }
  },
  computed: mapState({
    wordsPerPlayer: state => state.settings.wordsPerPlayer
  }),
  methods: {
    isValidWord: function (word) {
      return word.word.length > 0 && word.word.length <= this.$store.state.settings.maxWordLength && word.wordID !== ''
    },
    onSubmit: function () {
      this.errorMessage = ''
      this.canSubmit = false
      let correctWords = this.words.map(this.isValidWord)
      let first = true
      for (let idx in correctWords) {
        if (!correctWords[idx]) {
          if (first) {
            this.errorMessage = 'The following words are not according to rules: '
            first = false
          }
          this.errorMessage += String(parseInt(idx) + 1) + ' '
          this.canSubmit = true
        }
      }
      if (this.words.every(this.isValidWord)) {
        this.$store.dispatch('controller/submitWords', this.words)
      }
    },
    onClickNumber: function (clickedNumber) {
      this.index = clickedNumber - 1
      this.updateFields()
    },
    onUpdateWord: function () {
      this.words[this.index] = new Word(this.wordField, this.hintField)
    },
    onAddWord: function () {
      let word = new Word(this.wordField, this.hintField)
      this.words.push(word)
      this.onIncrIdx()
    },
    onDecrIdx: function () {
      this.index -= 1
      this.index += this.index < 0 ? (this.words.length + 1) : 0
      this.index = Math.min(this.index, this.wordsPerPlayer - 1)
      this.updateFields()
    },
    onIncrIdx: function () {
      this.index = (this.index + 1) % Math.min((this.words.length + 1), this.wordsPerPlayer)
      this.index = Math.min(this.index, this.wordsPerPlayer - 1)
      this.updateFields()
    },
    updateFields: function () {
      if (this.index === this.words.length && this.words.length !== this.wordsPerPlayer) {
        this.wordField = ''
        this.hintField = ''
      } else {
        this.wordField = this.words[this.index].word
        this.hintField = this.words[this.index].hint
      }
    }
  }
}
</script>
