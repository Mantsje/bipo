<template>
  <div class="players">
    <table>
      <tr><th>Players</th></tr>
      <tr v-for="player in players" :key="player.name"><td>{{ player.name }}</td></tr>
    </table>
  </div>
</template>

<script>

import { mapState } from 'vuex'
export default {
  name: 'PlayerTable',

  computed: mapState({
    players: state => state.players
  })
}
</script>
