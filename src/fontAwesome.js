import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faAngleRight)
library.add(faAngleLeft)

Vue.component('font-awesome-icon', FontAwesomeIcon)
