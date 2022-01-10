import sendRequest from '@/assets/js/sendRequest.js'

export const state = () => ({
  status: '',
  user: {
    token: null,
    nickname: null,
    email: null,
    password: null,
    preferences: {
      dark: false,
      color: '#ffa500',
      font: 0,
      avatar: '/icon.png',
    },
  },
  files: {},
  show: {
    loading: true,
    login: false,
    mainmenu: false,
    submenu: false,
  },
})

export const mutations = {
  auth_request(state) {
    state.status = 'Connessione al server...'
  },
  auth_success(state, Data) {
    state.user = Data
    if (JSON.parse(localStorage.getItem('autologin'))) {
      localStorage.setItem('token', Data.token)
    } else {
      localStorage.removeItem('token')
    }
    state.status = 'Utente attuale: ' + state.user.nickname
  },
  auth_error(state, Log) {
    if (!state.show.loading) {
      alert(Log[Log.length - 1])
    }
    state.status = null
  },

  toggle_show(state, target) {
    state.show[target] = !state.show[target]
  },
  set_show(state, arr) {
    state.show[arr[0]] = arr[1]
  },

  UserLogout(state) {
    localStorage.removeItem('token')
    localStorage.removeItem('autologin')
    state.user = {
      token: null,
      nickname: null,
      email: null,
      password: null,
      preferences: {
        dark: false,
        color: '#ffa500',
        font: 0,
        avatar: '/icon.png',
      },
    }
    state.status = null
  },

  update_user(state, obj) {
    const path = obj.target.split('.')
    if (path.length == 1) {
      state.user[obj.target] = obj.e.target ? obj.e.target.value : obj.e
    } else {
      state.user[path[0]][path[1]] = obj.e.target ? obj.e.target.value : obj.e
    }
  },

  CounterVisite(state, path) {
    var my_object = JSON.parse(localStorage.getItem('visite'))
    my_object[path] ? my_object[path]++ : (my_object[path] = 1)
    localStorage.setItem('visite', JSON.stringify(my_object))
  },

  cleanvisite() {
    localStorage.setItem('visite', JSON.stringify({}))
  },

  setfiles(state, files) {
    state.files = files
  },

  set_token(state) {
    console.info('Set Token')
    state.user.token = localStorage.getItem('token') || null
  },
}

export const actions = {
  UserLogin({ commit, state }) {
    console.info('UserLogin')
    commit('auth_request')
    return sendRequest({
      action: 'UserLogin',
      data: JSON.stringify(state.user),
    })
      .then((res) => commit('auth_success', res.Data))
      .catch((res) => (commit('auth_error', res.Log), commit('UserLogout')))
  },

  UserSignup({ commit, state }) {
    commit('auth_request')
    return sendRequest({
      action: 'UserSignup',
      data: JSON.stringify(state.user),
    })
      .then((res) => (res.Log.pop(), commit('auth_error', res.Log)))
      .catch((res) => commit('auth_error', res.Log))
  },

  UserUpdate({ commit, state }) {
    return sendRequest({
      action: 'UserUpdate',
      data: JSON.stringify(state.user),
    }).catch((res) => commit('auth_error', res.Log))
  },

  InteractionsUpdate({ commit }) {
    console.info('InteractionsUpdate')

    return sendRequest({
      action: 'InteractionsUpdate',
      data: JSON.stringify(JSON.parse(localStorage.getItem('visite'))),
    })
      .then((res) => commit('cleanvisite'))
      .catch((res) => commit('auth_error', res.Log))
  },

  GetAllFile({ commit }) {
    console.info('GetAllFile')
    return sendRequest({ action: 'GetAllFile' })
      .then((res) => commit('setfiles', res.Data))
      .catch((res) => commit('auth_error', res.Log))
  },
}

export const getters = {
  show: (state) => state.show,
}
