<template>
  <div class="ReadyUp">
    <button v-if="!ready" v-on:click="onReady" type="button">Ready!</button>
    <div v-else>You hit ready, good job! Now let's wait for those slowpokes to catch up and start. You can relax for now</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ReadyUp',
  computed: mapState({
    ready: state => state.thisPlayer.ready
  }),
  methods: {
    onReady: function () {
      this.$store.dispatch('readyPlayer')
    }
  }
}
</script>
