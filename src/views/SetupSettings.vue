<template>
  <div class="SetupSettings">
    <page-default :showSettings="false" header="Pick settings for the game here!"/>
    <game-settings-form v-if="$store.state.host === $store.state.thisPlayer.name"/>
  </div>
</template>

<script>
import PageDefault from '../components/PageDefault'
import GameSettingsForm from '../components/GameSettingsForm'

export default {
  name: 'SetupSettings',
  components: {
    PageDefault,
    GameSettingsForm
  }
}
</script>
