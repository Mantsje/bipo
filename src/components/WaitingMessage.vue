<template>
  <div class="WaitingMessage">
    <h2 v-if="turnType == TurnTypes.OTHERTEAM">It's {{ turn }}'s turn! Watch them closely...</h2>
    <h2 v-else-if="turnType == TurnTypes.MYTEAM">It's {{ turn }}'s turn! Go guess all the words...</h2>
    <h2 v-else >It's your turn! You shouldn't see this...</h2>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

<script>
import { mapState } from 'vuex'
import { TurnTypes } from '../datatypes/enums.js'

export default {
  name: 'WaitingMessage',
  data: function () {
    return {
      TurnTypes: TurnTypes
    }
  },
  computed: mapState({
    turnNr: state => state.controller.turnNr,
    turn: state => state.controller.turn,
    turnType: function (state) {
      let myTeam = state.controller.teams[state.thisPlayer.team]
      if (this.turn === state.thisPlayer.name) {
        this.$router.push('/myturn')
        return this.TurnTypes.MYTURN
      } else if (myTeam.players.includes(this.turn)) {
        return this.TurnTypes.MYTEAM
      } else {
        return this.TurnTypes.OTHERTEAM
      }
    }
  })
}
</script>
