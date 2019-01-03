import RoundStat from '@/datatypes/Statistics/RoundStat'
import { MessageTypes } from '@/gamelogic/MessageTypes'

export const AinitRound = {
  mutation: function (state, roundStat) {
    state.rounds.push(roundStat)
  },
  action: function (context, roundNr) {
    context.rootState.hubconn.send(MessageTypes.NEWROUNDSTAT, new RoundStat(roundNr, context.rootState.controller.teams))
  }
}

export const ApushNewTurn = {
  mutation: function (state, turnStat) {
    let numTeams = state.rounds[state.rounds.length - 1].teamstats.length
    state.rounds[state.rounds.length - 1].teamstats[turnStat.turn % numTeams][turnStat.playerName].turns.push(turnStat)
  },
  action: function (context, turnStat) {
    context.rootState.hubconn.send(MessageTypes.PUSHNEWTURNSTAT, turnStat)
  }
}

export const AcomputeEndRound = {
  mutation: function (state, teams) {
    let round = RoundStat.fromJSON(JSON.parse(JSON.stringify(state.rounds[state.rounds.length - 1])))
    let scores = []
    let minPlayer = { name: 'NONE', score: 1000 }
    let maxPlayer = { name: 'NONE', score: -1 }
    for (let teamIdx in round.teamstats) {
      let teamStat = round.teamstats[teamIdx]
      let teamName = teams[teamStat.teamID]
      delete teamStat.teamID
      let teamScore = 0
      for (let playerName in teamStat) {
        let player = teamStat[playerName]
        let playerScore = 0
        for (let turnIdx in player.turns) {
          let turn = player.turns[turnIdx]
          playerScore += turn.words.length
        }
        if (minPlayer.score > playerScore) {
          minPlayer = { name: player.player.name, score: playerScore }
        }
        if (maxPlayer.score < playerScore) {
          maxPlayer = { name: player.player.name, score: playerScore }
        }
        teamScore += playerScore
      }
      scores.push({ teamName: teamName, score: teamScore })
    }
    state.rounds[state.rounds.length - 1].bestPlayer = maxPlayer.name
    state.rounds[state.rounds.length - 1].worstPlayer = minPlayer.name
    let scorelist = scores.map(x => x.score)
    state.rounds[state.rounds.length - 1].winningTeam = scores[scorelist.indexOf(Math.max(...scorelist))].teamName
    state.rounds[state.rounds.length - 1].winningScore = Math.max(...scorelist)
  },
  action: undefined
}
