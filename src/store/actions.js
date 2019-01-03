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
        context.commit('readyThisPlayer')
        context.state.hubconn.send(MessageTypes.READYAPLAYER, context.state.thisPlayer)
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
        let pIndex = state.players.findIndex(x => x.name === player.name)
        state.players[pIndex] = player
      }
  },
  ready: {
    action: undefined,
    mutation:
      function (state, player) {
        let pIndex = state.players.findIndex(x => x.name === player.name)
        state.players[pIndex].ready = true
      }
  },
  deReadyAll: {
    action: function (context) {
      context.state.hubconn.send(MessageTypes.DEREADYALL, undefined)
    },
    mutation: function (state) {
      for (let idx in state.players) {
        state.players[idx].ready = false
      }
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
