export default function ({ store, route }) {
  if (!process.server && !localStorage.getItem('admin')) {
    store.dispatch('InteractionsUpdate', route.fullPath)
  }
}
