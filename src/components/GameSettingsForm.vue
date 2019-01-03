<template>
  <div class="GameSettingsForm fullpage-container">
    <form>
      <table>
        <tr>
          <td>Number of Teams:</td>
          <td><input v-model="settings.numTeams" v-on:input="settings.numTeams = Math.max(parseInt(settings.numTeams), 2)"  type="number" min="2"/></td>
        </tr>
        <tr>
          <td>Number of Words per Player:</td>
          <td><input v-model="settings.wordsPerPlayer" v-on:input="settings.wordsPerPlayer = Math.max(parseInt(settings.wordsPerPlayer), 1)" type="number" min="1"/></td>
        </tr>
        <tr>
          <td>Turn time (in seconds):</td>
          <td><input v-model="settings.turnTime" v-on:input="settings.turnTime = Math.max(parseInt(settings.turnTime), 1)" type="number" min="1"/></td>
        </tr>
        <tr>
          <td>Max word length (in characters):</td>
          <td><input v-model="settings.maxWordLength" v-on:input="settings.maxWordLength = Math.max(parseInt(settings.maxWordLength), 1)" type="number" min="1"/></td>
        </tr>
        <tr>
          <td>Custom Teams:</td>
          <td><input v-model="settings.customTeams" type="checkbox"/></td>
        </tr>
        <tr>
          <td>Allow words from database:</td>
          <td><input v-model="settings.DBFill" type="checkbox"/></td>
        </tr>
        <tr>
          <td>Single device:</td>
          <td><input v-model="settings.singleDevice" type="checkbox"/></td>
        </tr>
      </table>
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
