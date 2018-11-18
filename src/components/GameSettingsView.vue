<template>
  <div class="GameSettingsView">
    <div><span>Number of Teams: {{ settings.numTeams }}</span></div>
    <div><span>Number of Words per Player: {{ settings.wordsPerPlayer }}</span></div>
    <div><span>Turn time (in seconds): {{ settings.turnTime }}</span></div>
    <div><span>Max word length (in characters): {{ settings.maxWordLength }}</span></div>
    <div><span>Custom Teams: {{ settings.customTeams }}</span></div>
    <div><span>Allow words from database: {{ settings.DBFill }}</span></div>
    <div><span>Single device: {{ settings.singleDevice }}</span></div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

<script>
import { mapState } from 'vuex'

export default {
  name: 'GameSettingsView',
  computed: mapState({
    settings: state => state.settings
  })

}
</script>
