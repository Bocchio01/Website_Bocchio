export default function ({ store, route }) {
  if (!process.server && !localStorage.getItem('master')) {
    store.dispatch('InteractionsUpdate', route.fullPath)
  }
}
