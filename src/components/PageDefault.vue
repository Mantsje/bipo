<template>
  <div class="PageDefault">
    <h1>{{ header }}</h1>
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
export default {
  name: 'PageDefault',
  props: {
    header: {
      type: String,
      required: true
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
