import Player from '../datatypes/Player'
import { MessageTypes } from '../gamelogic/MessageTypes'

export const AcreateGame = {
  action:
    // instantiateGame-action
    function (context, playerName) {
      context.commit('createGame', playerName)
    },
  mutation:
    // createGame-mutation
    function (state, playerName) {
      state.host = playerName
      state.archived = false
      state.players = []
      state.roomCode = 'ROOMCODE'
    }
}

export const AthisPlayer = {
  set: {
    action:
      function (state, newThisPlayer) {
        state.thisPlayer = newThisPlayer
      },
    mutation:
      function (state, newThisPlayer) {
        state.thisPlayer = newThisPlayer
      }
  },
  create: {
    action:
      function (state, newThisPlayer) {
        state.thisPlayer = newThisPlayer
      },
    mutation:
      function (state, playerName) {
        state.thisPlayer = new Player(playerName)
      }
  },
  ready: {
    action:
      function (context) {
        console.log('player readied up!')
        this.hubconn.send(MessageTypes.READYPLAYER, context.state.thisPlayer)
        context.commit('readyThisPlayer')
      },
    mutation:
      function (state) {
        state.thisPlayer.ready = true
      }
  }
}

export const Aplayers = {
  add: {
    action: undefined,
    mutation:
      function (state, player) {
        state.players.push(player)
      }
  },
  set: {
    action: undefined,
    mutation:
      function (state, player) {
        let pIndex = state.players.indexOf(x => x.name === player.name)
        state.players[pIndex] = player
      }
  }
}

export const AroomCode = {
  set: {
    action: undefined,
    mutation:
      function (state, roomCode) {
        state.roomCode = roomCode
      }
  }

}
