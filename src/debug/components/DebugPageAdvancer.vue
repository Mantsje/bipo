<template>
  <div class="DebugPageAdvancer">
    <input v-model="link" type="text"/>
    <button v-on:click="advancePage" type="button">Advance page</button>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

<script>
export default {
  name: 'DebugPageAdvancer',
  data: function () {
    return {
      link: ''
    }
  },
  methods: {
    advancePage: function () {
      this.$router.push(this.link)
    }
  }
}
</script>
