export default function ({ store, route }) {
  if (!process.server) {
    store.commit('CounterVisite', route.fullPath)
  }
}
