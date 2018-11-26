<template>
  <div class="my-turn">
    <!-- on start -->
    <div class="my-turn_during-game" v-if="!start" >
      <button v-on:click="onStartTurn" type="button">Start my turn</button>
    </div>
    <!-- during game -->
    <div class="my-turn_during-game" v-else-if="!turnEnd">
      <div class="word" v-on:mousedown="dragStart" v-on:mouseup="dragStop" v-on:mousemove="drag" ref="word">
        <div class="inner_word">
          <h1>{{ currentWord.word }}</h1>
          <h2>{{ currentWord.hint == '' ? '' : '(' + currentWord.hint + ')' }}</h2>
        </div>
      </div>
      <button v-on:click="onGotIt">Got it!</button>
      <span class="my-turn_timer">{{ turntime }}</span>
    </div>
    <!-- end round -->
    <div class="my-turn_end" v-else-if="!roundEnd">
      <span>Time over! This turn is finished</span>
    </div>
    <!-- all words -->
    <div class="my-turn_last" v-else>
      <span>You finished the last word! Good job!</span>
    </div>
  </div>
  <!-- <div class="my-turn">
    <button v-if="!start" v-on:click="onStartTurn" type="button">Start my turn</button>
    <div v-else-if="!turnEnd">
      <div v-on:drag="handleDrag">{{ currentWord.word }}</div>
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
  </div> -->
</template>

<script>
import Word from '../datatypes/Word.js'
import { shuffleArray } from '@/datatypes/helperScripts/arrayManipulation'

export default {
  name: 'MyTurn',
  data: function () {
    return {
      minimumDrag: -100,
      dragging: false,
      dragStartPos: 0,
      dragY:0,
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
    dragStart: function (e) {
      this.dragStartPos = e.pageY;
      this.dragging = true;
      console.log('start dragging');
    },
    drag: function (e) {   
      if (this.dragging) {
        this.dragY = e.pageY - this.dragStartPos;
        this.$refs.word.style.transform = 'translateY(' + this.dragY + 'px)';
        if (this.dragY < this.minimumDrag) {
          
        }
      }   
    },
    dragStop: function (e) {
      this.dragging = false;
      console.log('stop dragging');
      console.log(this.dragY);
      if (this.dragY < -100) {        
        this.onGotIt();
      }      
      this.$refs.word.style.transform = 'translateY(0px)';

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
