export default function ({ app, store }) {
  app.i18n.onBeforeLanguageSwitch = (oldLocale, newLocale, isInitialSetup, context) => {
    // if (newLocale == 'it') {
    //   context.redirect('/')
    // } else {
    //   context.redirect('/' + newLocale)
    // }
    // context.redirect('/' + oldLocale)
    // console.log(oldLocale, newLocale, isInitialSetup)
    // console.log(app.localePath('/'))

    store.commit('update_user', { e: newLocale, target: 'preferences.lang' })
  }
}
