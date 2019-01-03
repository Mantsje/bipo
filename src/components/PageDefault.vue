<template>
  <div class="header">
    <debug-page-advancer/>
    <h1  class="main-title">{{ header }}</h1>
    <img class="icon" v-if="showSettings" alt="Settings icon" src="../assets/settings_icon_96x96.png">
    <img class="icon" v-if="showHelp" alt="Help icon" src="../assets/help_icon_512x512.png">
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .icon {
    width: 64px;
    height: 64px;
  }
</style>

<script>
import DebugPageAdvancer from '../debug/components/DebugPageAdvancer'
export default {
  name: 'PageDefault',
  components: { DebugPageAdvancer },
  props: {
    header: {
      type: String
    },
    showSettings: {
      type: Boolean,
      default: true
    },
    showHelp: {
      type: Boolean,
      default: true
    }
  }
}
</script>
