<template>
  <div class="wordsubmission">
    <form>
      <menu class="wordsubmission__menu">
        <div class="icon"><font-awesome-icon v-on:click="onDecrIdx" icon="angle-left"/></div>
          <div class="wordsubmission__menu__items">
            <span v-on:click="onClickNumber(i)" :class="{active: i-1 == index}" v-for="i in Math.min(words.length + 1, wordsPerPlayer)" :key="i" class="item"> {{i}} </span>
          </div>
        <div class="icon"><font-awesome-icon v-on:click="onIncrIdx" icon="angle-right"/></div>
      </menu>
      <div class="wordsubmission__text">
        <textarea v-model="wordField" type="text" placeholder="Word" rows=3></textarea>
        <textarea v-model="hintField" type="text" placeholder="Hint" rows=3></textarea>
        <button v-if="canSubmit && index === words.length && words.length !== wordsPerPlayer" v-on:click="onAddWord" type="button">Add Word</button>
        <button v-else v-on:click="onUpdateWord" type="button">Update Word</button>
        <button v-if="canSubmit && words.length === wordsPerPlayer" v-on:click="onSubmit" type="button">Submit Words</button>
      </div>
    </form>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wordsubmission__menu {
  display:flex;
  padding:1rem 0;
  align-items:center;
  display:flex;
  justify-content:center;
}

.wordsubmission__menu__items {
  margin:0 .5rem;
  display:flex;
}

.wordsubmission__menu__items .item {
  display:flex;
  align-items:center;
  justify-content:center;
  border-radius:50%;
  cursor:pointer;
  margin:0 .2rem;
  height:2rem;
  padding:.2rem;
}

.wordsubmission__menu .icon {
  cursor:pointer;
  padding:.5rem;
}

.wordsubmission__menu__items .item.active {
  background:red;
  transition:.2s;
  width:2rem;
  height:2rem;
}

.wordsubmission__text {
  display:flex;
  flex-direction:column;
  align-items:stretch;
}

.wordsubmission__text > * {
  margin-bottom:1rem;
}

</style>

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
      canSubmit: true
    }
  },
  computed: mapState({
    wordsPerPlayer: state => state.settings.wordsPerPlayer
  }),
  methods: {
    onSubmit: function () {
      this.canSubmit = false
      this.$store.dispatch('controller/submitWords', this.words)
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
