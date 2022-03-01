export default function ({ store, route }) {
  if (!process.server && localStorage.getItem('admin') != process.env.API_KEY) {
    store.dispatch('InteractionsUpdate', route.fullPath)
  }
}
