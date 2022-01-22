<template>
  <div class="msg_bg" :class="[$store.getters.show.login ? 'visible' : 'hidden']" @click.self="CloseLogin()">
    <div class="wrap popup">
      <h1>Area personale</h1>

      <CMenuScelta @toParent="handler" :tags="tags_array" :multiple="false" :start="[tags_array[0]]" />
      <p>{{ $store.state.status }}</p>
      <div>
        <div v-show="tags_to_view.includes('Sign up')">
          <h2>Sign up</h2>
          <p>Inserisci i dati richiesti e riceverai a breve un e-mail di conferma.</p>
        </div>
        <div v-show="tags_to_view.includes('Login')">
          <h2>Login</h2>
          <p>Inserisci i dati di login</p>
        </div>

        <div v-show="tags_to_view.includes('Sign up')">
          <label for="nickname">Nickname</label>
          <input id="nickname" type="text" :value="user.nickname" @input="updateVal($event, 'nickname')" required placeholder="Es: Bocchio01" />
        </div>

        <div v-show="tags_to_view.includes('Sign up') || tags_to_view.includes('Login')">
          <label for="email">E-mail</label>
          <input id="email" type="email" :value="user.email" @input="updateVal($event, 'email')" required placeholder="Es: tommaso.bocchietti@gmail.com" />
        </div>

        <div style="margin-bottom: 0" v-show="tags_to_view.includes('Sign up') || tags_to_view.includes('Login')">
          <label for="password">Password</label>
          <input id="password" type="password" :value="user.password" @input="updateVal($event, 'password')" minlength="5" required placeholder="Es: *password segreta*" />
        </div>

        <div style="margin-top: 0; color: #a2a2a2; display: inline-flex" v-show="tags_to_view.includes('Login')">
          <p>Password dimenticata? Inserisci l'email nel campo sopra e <u @click="ForgotPassword()" style="cursor: pointer">clicca qua!</u></p>
        </div>

        <div style="justify-content: flex-start; align-items: center; display: flex !important" v-show="tags_to_view.includes('Login')">
          <input type="checkbox" id="autologin" @click="UserLogin()" style="width: unset; margin: 0px 5px" />
          <label for="autologin" style="width: unset; margin: 0px">Ricordami su questo dispositivo</label>
        </div>

        <div v-show="tags_to_view.includes('Impostazioni')" class="tooltip">
          <span class="tooltiptext" v-show="!$store.state.user.token">
            <mark> Effettua il Login per avere accesso alle funzionalità del sito </mark>
          </span>

          <h2>Impostazioni utente</h2>
          <p>Modifica il tuo Nickname o scegli il tuo Avatar tra quelli disponibili.</p>

          <div class="inline">
            <label for="mod_nickname">Nickname</label>
            <input id="mod_nickname" type="text" :value="user.nickname" @input="updateVal($event, 'nickname')" placeholder="Es: Bocchio01" />
            <span></span>
          </div>

          <div class="inline">
            <label for="avatar">Avatar</label>
            <img id="avatar" :src="require('@/assets/png/Avatar' + user.preferences.avatar)" alt="AvatarSelected" @click="show_avatar = !show_avatar" />

            <button @click="updateVal('/icon.png', 'preferences.avatar')">Ripristina</button>
          </div>

          <div id="avatar_container" v-show="show_avatar" @click="show_avatar = false">
            <h2>Avatar femminili</h2>
            <div>
              <img
                v-for="(img, index) in images_woman"
                :key="index"
                :src="require('@/assets/png/Avatar/Woman/' + img)"
                alt="AvatarWoman"
                @click="updateVal('/Woman/' + img, 'preferences.avatar')"
              />
            </div>
            <h2>Avatar maschili</h2>
            <div>
              <img
                v-for="(img, index) in images_man"
                :key="index"
                :src="require('@/assets/png/Avatar/Man/' + img)"
                alt="AvatarMan"
                @click="updateVal('/Man/' + img, 'preferences.avatar')"
              />
            </div>
          </div>

          <h2>Impostazioni sito</h2>
          <p>Setta i seguenti parametri del sito come preferisci.</p>

          <div class="inline no-button">
            <label>Tema</label>
            <div @click="updateVal(!user.preferences.dark, 'preferences.dark')">
              <div @click="updateVal(true, 'preferences.dark')">
                <input id="light" value="0" type="radio" :checked="!user.preferences.dark" />
                <label for="light"> <span></span> Chiaro </label>
              </div>
              <div @click="updateVal(false, 'preferences.dark')">
                <input id="dark" value="0" type="radio" :checked="user.preferences.dark" />
                <label for="dark"> <span></span> Scuro </label>
              </div>
            </div>

            <button @click="updateVal(false, 'preferences.dark')">Ripristina</button>
          </div>

          <div class="inline">
            <label for="color">Colore</label>
            <input id="color" type="color" :value="user.preferences.color" @input="updateVal($event, 'preferences.color')" />
            <button @click="updateVal('#ffa500', 'preferences.color')">Ripristina</button>
          </div>

          <div class="inline">
            <label for="font_size">Altezza Font</label>
            <input id="font_size" type="range" min="-10" max="10" :value="user.preferences.font" @input="updateVal($event, 'preferences.font')" />
            <button @click="updateVal(0, 'preferences.font')">Ripristina</button>
          </div>

          <button type="submit" @click="$store.commit('UserLogout')">Logout</button>
        </div>

        <div v-show="tags_to_view.includes('Sign up')">
          <button type="submit" @click="$store.dispatch('UserSignup')">SignUp</button>
        </div>
        <div v-show="tags_to_view.includes('Login')">
          <button type="submit" @click="$store.dispatch('UserLogin')">Login</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sendRequest from '~/assets/js/sendRequest'

export default {
  data() {
    return {
      tags_to_view: [],
      tags_array: ['Sign up', 'Login', 'Impostazioni'],
      show_avatar: false,
      images_man: [],
      images_woman: [],
    }
  },
  computed: {
    user: {
      get() {
        return this.$store.state.user
      },
    },
  },
  mounted() {
    document.getElementById('autologin').checked = JSON.parse(localStorage.getItem('autologin'))
    this.images_man = require
      .context('@/assets/png/Avatar/Man/', false, /\.png$/)
      .keys()
      .map((s) => s.slice(2))

    this.images_woman = require
      .context('@/assets/png/Avatar/Woman/', false, /\.png$/)
      .keys()
      .map((s) => s.slice(2))
  },

  methods: {
    updateVal(e, target) {
      this.$store.commit('update_user', { e, target })
    },

    handler(value) {
      this.tags_to_view = value
    },

    CloseLogin() {
      this.$store.commit('toggle_show', 'login')
      if (this.user.id) this.$store.dispatch('UserUpdate')
      if (this.user.preferences.autologin == false) localStorage.removeItem('token')
    },

    UserLogin() {
      localStorage.setItem('autologin', document.getElementById('autologin').checked)
    },

    ForgotPassword() {
      sendRequest({
        action: 'ForgotPassword',
        data: JSON.stringify({ email: this.$store.state.user.email }),
      })
        .then((res) => alert(res.Data))
        .catch((res) => alert(res.Log.pop()))
    },
  },

  watch: {
    user: {
      handler(val) {
        document.documentElement.style.setProperty('--Size_Variable', val.preferences.font + 'px')
        document.documentElement.style.setProperty('--Color_Main', val.preferences.color)

        if (val.preferences.dark == true) {
          document.documentElement.style.setProperty('--black', 'white')
          document.documentElement.style.setProperty('--white', 'black')
        } else {
          document.documentElement.style.setProperty('--black', 'black')
          document.documentElement.style.setProperty('--white', 'white')
        }
      },
      deep: true,
    },
  },
}
</script>

<style lang="scss">
.wrap.popup {
  margin: auto;
  max-width: 700px;
  max-height: calc(100vh - 100px);
  overflow-y: overlay;

  * {
    margin-block: 0;
    margin-inline: auto;
  }

  > nav > div > p {
    font-family: var(--Font_Base) !important;
  }

  label {
    display: block;
  }

  div {
    margin-block: 10px;
  }

  button {
    padding: 7px;
    &[type='submit'] {
      margin-top: 20px;
      width: 100%;
      padding: 10px;
      &:hover,
      &:focus {
        width: 95%;
      }
    }
  }

  div.inline {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    column-gap: 10px;
    row-gap: 10px;
    justify-content: space-between;
    * {
      margin: 0px;
      width: revert;
    }
    > :nth-child(1) {
      width: 100px;
    }
    > :nth-child(2):not(img) {
      width: 100%;
      max-width: 250px;
    }
  }

  input {
    width: 100%;
    transition: padding 0.2s linear;
    &[type='text'],
    &[type='email'],
    &[type='password'] {
      &:hover,
      &:focus {
        border-color: var(--Color_Main);
        outline: none;
        padding: 5px;
      }
    }
  }

  #avatar_container {
    border: var(--Border_Settings_Wrap);
    border-radius: var(--Border_Radius_Wrap);
    padding: 5px;
    > div {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  }

  img {
    width: 75px;
    height: 75px;
    margin-inline: auto;
    border: 2px solid transparent;
    border-radius: 10px;
    cursor: pointer;

    &:hover,
    &:focus {
      opacity: 0.8;
      border-color: var(--Color_Main);
      outline: none;
      padding: 5px;
    }
  }
}

@media (max-width: 600px) {
  .wrap.popup {
    div.inline {
      flex-direction: column;
      > *:not(img) {
        width: 100% !important;
        max-width: unset !important;
      }
    }
  }
}
</style>
