<template>
  <div class="Statistics">
    <h2>And the winner of round {{ round }} is {{ stats.rounds[round].winningTeam }} </h2>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Statistics',
  // Could be made props
  computed: mapState({
    stats: state => state.statistics,
    round: state => state.controller.currentRound
  })
}
</script>
