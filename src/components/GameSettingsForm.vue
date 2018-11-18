<template>
  <div class="GameSettingsForm">
    <form>
      <div>
        <span>Number of Teams:</span>
        <input v-model="settings.numTeams" v-on:input="settings.numTeams = Math.max(parseInt(settings.numTeams), 2)"  type="number" min="2"/>
      </div>
      <div>
        <span>Number of Words per Player:</span>
        <input v-model="settings.wordsPerPlayer" v-on:input="settings.wordsPerPlayer = Math.max(parseInt(settings.wordsPerPlayer), 1)" type="number" min="1"/>
      </div>
      <div>
        <span>Turn time (in seconds):</span>
        <input v-model="settings.turnTime" v-on:input="settings.turnTime = Math.max(parseInt(settings.turnTime), 1)" type="number" min="1"/>
      </div>
      <div>
        <span>Max word length (in characters):</span>
        <input v-model="settings.maxWordLength" v-on:input="settings.maxWordLength = Math.max(parseInt(settings.maxWordLength), 1)" type="number" min="1"/>
      </div>
      <div>
        <span>Custom Teams:</span>
        <input v-model="settings.customTeams" type="checkbox"/>
      </div>
      <div>
        <span>Allow words from database:</span>
        <input v-model="settings.DBFill" type="checkbox"/>
      </div>
      <div>
        <span>Single device:</span>
        <input v-model="settings.singleDevice" type="checkbox"/>
      </div>
      <span>Beware, after hitting you can not change settings any more!</span>
      <button v-on:click="onChangeSettings" type="button">Commit Settings</button>
    </form>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

<script>

export default {
  name: 'GameSettingsForm',
  data: function () {
    return {
      settings: JSON
    }
  },
  created: function () {
    this.settings = JSON.parse(JSON.stringify(this.$store.state.settings))
  },
  methods: {
    onChangeSettings: function () {
      this.$store.dispatch('settings/commitSettings', this.settings)
    }
  }
}
</script>
