import store from '../store/store'

export function instantiateGame (playerName) {
  return new Promise((resolve, reject) => {
    let settings = store.dispatch('settings/instantiateSettings')
    let controller = store.dispatch('controller/instantiateController')
    let stats = store.dispatch('statistics/instantiateStats')
    let main = store.dispatch('instantiateGame', playerName)
    Promise.all([settings, controller, stats, main]).then(() => {
      resolve()
    })
  })
}
