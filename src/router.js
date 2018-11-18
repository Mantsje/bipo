import Vue from 'vue'
import Router from 'vue-router'

import DBInterface from '@/views/DBInterface.vue'
import LandingPage from '@/views/LandingPage.vue'
import PreGameLobby from '@/views/PreGameLobby.vue'
import SetupLobby from '@/views/SetupLobby.vue'
import StatisticsPage from '@/views/StatisticsPage.vue'
import TurnPage from '@/views/TurnPage.vue'
import WaitingScreen from '@/views/WaitingScreen.vue'
import SetupSettings from '@/views/SetupSettings.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage
    },
    {
      path: '/database-interface',
      name: 'DBInterface',
      component: DBInterface
    },
    {
      path: '/pregame',
      name: 'PreGameLobby',
      component: PreGameLobby
    },
    {
      path: '/setupsettings',
      name: 'SetupSettings',
      component: SetupSettings
    },
    {
      path: '/setupgame',
      name: 'SetupLobby',
      component: SetupLobby
    },
    {
      path: '/statistics',
      name: 'StatisticsPage',
      component: StatisticsPage
    },
    {
      path: '/myturn',
      name: 'TurnPage',
      component: TurnPage
    },
    {
      path: '/waitingscreen',
      name: 'WaitingScreen',
      component: WaitingScreen
    }
  ]
})
