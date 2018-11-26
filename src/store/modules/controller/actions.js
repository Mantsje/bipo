import { MessageTypes } from '@/gamelogic/MessageTypes'
import Team from '@/datatypes/Team'
import { shuffleArray } from '@/datatypes/helperScripts/arrayManipulation'
import { RoundStatus } from '@/datatypes/enums'
import router from '@/router'

export const Apregame = {
  submitWords: {
    mutation:
      function (state, words) {
        state.words.push(...words)
      },
    action:
      function (context, words) {
        context.rootState.hubconn.send(MessageTypes.SUBMITWORDS, words)
      }
  },
  teams: {
    mutation:
      function (state, teams) {
        state.teams = teams
      },
    action:
      function (context) {
        let numTeams = context.rootState.settings.numTeams
        let teams = []
        let players = shuffleArray(context.rootState.players)
        for (let id = 0; id < numTeams; id++) {
          teams.push(new Team('Team ' + id, id, []))
        }
        for (let p in players) {
          players[p].teamID = p % numTeams
          players[p].ready = false
          teams[p % numTeams].players.push(players[p])
        }
        context.commit('setTeams', teams)
        context.rootState.hubconn.send(MessageTypes.SETTEAMS, teams)
        context.rootState.hubconn.send(MessageTypes.SETPLAYERS, players)
      }
  }
}

export const Aingame = {
  playOrWait: {
    mutation: undefined,
    action:
      function (context) {
        if (context.state.turn === context.rootState.thisPlayer.name) {
          router.push('/myturn')
        } else {
          router.push('/waitingscreen')
        }
      }
  },
  round: {
    initNext: {
      mutation: undefined,
      action:
        function (context) {
          let data = {
            wordsLeft: [],
            words: [],
            currentRound: context.state.currentRound + 1,
            turnNr: context.state.turnNr + 1,
            roundStatus: RoundStatus.PRE,
            turn: undefined
          }
          data.wordsLeft.push(...context.state.words)
          let team = context.state.teams[data.turnNr % context.state.teams.length]
          let pIndex = Math.floor(data.turnNr / team.players.length) % team.players.length
          data.turn = team.players[pIndex].name
          context.rootState.hubconn.send(MessageTypes.UPDATECONTROLLER, data)
          context.dispatch('statistics/initNextRound', data.currentRound, { root: true })
        }
    },
    start: {
      mutation:
        function (state) {
          state.roundStatus = RoundStatus.IN
        },
      action:
        function (context) {
          context.rootState.hubconn.send(MessageTypes.STARTROUND, undefined)
        }
    },
    end: {
      mutation:
        function (state) {
          state.roundStatus = RoundStatus.POST
        },
      action:
        function (context, wordsGuessed) {
          context.rootState.hubconn.send(MessageTypes.ENDROUND, wordsGuessed)
        }
    }
  },
  turn: {
    processWords: {
      mutation: function (state, wordsGuessed) {
        for (let idx in wordsGuessed) {
          state.words.push(wordsGuessed[idx])
          let idxOf = state.wordsLeft.findIndex((x) => wordsGuessed[idx].wordID === x.wordID)
          state.wordsLeft.splice(idxOf, 1)
        }
      },
      action: undefined
    },
    next: {
      mutation:
        function (state) {
          console.warn('Is everybody updating turn themselves okay, or 1 person send new settings?')
          state.turnNr += 1
          let team = state.teams[state.turnNr % state.teams.length]
          let pIndex = Math.floor(state.turnNr / team.players.length) % team.players.length
          state.turn = team.players[pIndex].name
        },
      action:
        function (context, wordsGuessed) {
          context.rootState.hubconn.send(MessageTypes.NEXTTURN, wordsGuessed)
        }
    }
  }
}
