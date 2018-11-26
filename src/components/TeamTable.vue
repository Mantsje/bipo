<template>
  <div class="TeamTable">
    <h3>The Teams</h3>
    <table>
      <tr><th v-for="team in teams" :key=team.id>{{ team.name }}</th></tr>
      <tr v-for="i in Math.max(0,...teams.map(t => t.players.length))" :key="'r'+i">
        <td v-for="j in teams" :key="j.id"> {{ j.players[i-1] ? j.players[i-1].name : '' }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TeamTable',

  computed: mapState({
    teams: state => state.controller.teams
  })
}
</script>
