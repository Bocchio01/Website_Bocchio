import sendRequest from '@/assets/js/sendRequest.js'

export const state = () => ({
    status: '',
    user: {
        token: localStorage.getItem('token') || null,
        nickname: null,
        email: null,
        password: null,
        preferences: {
            color: '#ffa500',
            font: 0,
            avatar: '/icon.png'
        }
    },
    files: {},
    show: {
        loading: true,
        login: false,
        mainmenu: false,
        submenu: false
    }
})

export const mutations = {
    auth_request(state) {
        state.status = 'Retriving data from server...'
    },
    auth_success(state, Data) {
        // console.log(state, data)
        state.user.token = Data.token
        state.user.nickname = Data.nickname
        state.user.email = Data.email
        state.user.password = Data.password

        state.user.preferences.color = Data.color
        state.user.preferences.font = Data.font
        state.user.preferences.avatar = Data.avatar

        if (Data.token) localStorage.setItem('token', Data.token)
        state.status = 'Bentornato ' + state.user.nickname
    },
    auth_error(state, Log) {
        if (!state.show.loading) {
            alert(Log[Log.length - 1])
        }
    },

    toggle_show(state, target) {
        state.show[target] = !state.show[target]
    },
    set_show(state, arr) {
        state.show[arr[0]] = arr[1]
    },

    UserLogout(state) {
        localStorage.removeItem('token')
        Object.keys(state.user).forEach((i) => state.user[i] = null);
        state.user.preferences = {
            color: '#ffa500',
            font: 0,
            avatar: '/icon.png'
        }
    },

    update_user(state, obj) {
        const path = obj.target.split('.')
        if (path.length == 1) {
            state.user[obj.target] = obj.e.target ? obj.e.target.value : obj.e
        } else {
            state.user[path[0]][path[1]] = obj.e.target ? obj.e.target.value : obj.e
        }
    },

    agg_forum(state, res) {
        state.article.forum = res
        console.log(state.article.forum)
        state.status = 'success'
    },
    CounterVisite(state, path) {
        var my_object = JSON.parse(localStorage.getItem('visite'));

        my_object[path] ? my_object[path]++ : my_object[path] = 1

        localStorage.setItem('visite', JSON.stringify(my_object));

    },
    cleanvisite() {
        localStorage.setItem('visite', JSON.stringify({}))
    },

    setfiles(state, files) {
        state.files = files
    },
}

export const actions = {
    UserLogin({ commit, state }) {
        commit('auth_request')
        return sendRequest({ action: 'UserLogin', data: JSON.stringify(state.user) })
            .then(res => commit('auth_success', res.Data))
            .catch(res => commit('auth_error', res.Log))
    },

    UserSignup({ commit, state }) {
        commit('auth_request')
        return sendRequest({ action: 'UserSignup', data: JSON.stringify(state.user) })
            .catch(res => commit('auth_error', res.Log))
    },

    UserUpdate({ state }) {
        return sendRequest({ action: 'UserUpdate', data: JSON.stringify(state.user) })
            .catch(res => commit('auth_error', res.Log))
    },

    InteractionsUpdate({ commit }) {
        return sendRequest({ action: 'InteractionsUpdate', data: JSON.stringify(JSON.parse(localStorage.getItem('visite'))) })
            .then(res => commit('cleanvisite'))
            .catch(res => commit('auth_error', res.Log))
    },

    GetAllFile({ commit }) {
        return sendRequest({ action: 'GetAllFile' })
            .then(res => commit('setfiles', res.Data))
            .catch(res => commit('auth_error', res.Log))
    }

}

export const getters = {

    show: state => state.show,
    isLoggedIn: state => !!state.token,

    authStatus: state => state.status,
}