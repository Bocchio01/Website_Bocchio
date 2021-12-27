export default function ({ store, route }) {
    store.commit('CounterVisite', route.fullPath)
}