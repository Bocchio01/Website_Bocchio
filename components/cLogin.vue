<template>
  <div
    class="msg_bg"
    :class="[$store.getters.show.login ? 'visible' : 'hidden']"
    @click.self="CloseLogin()"
  >
    <div class="wrap popup">
      <h1>Area personale</h1>

      <cMenuScelta
        @toParent="handler"
        :tags="tags_array"
        :multiple="false"
        :start="[tags_array[0]]"
      />
      <p>{{ $store.state.status }}</p>
      <div>
        <div v-show="tags_to_view.includes('Sign up')">
          <h2>Sign up</h2>
          <p>
            Inserisci i dati richiesti e riceverai a breve un e-mail di
            conferma.
          </p>
        </div>
        <div v-show="tags_to_view.includes('Login')">
          <h2>Login</h2>
          <p>Inserisci i dati di login</p>
        </div>

        <div v-show="tags_to_view.includes('Sign up')">
          <label for="nickname">Nickname</label>
          <input
            id="nickname"
            type="text"
            :value="user.nickname"
            @input="updateVal($event, 'nickname')"
            required
            placeholder="Es: Bocchio01"
          />
        </div>

        <div
          v-show="
            tags_to_view.includes('Sign up') || tags_to_view.includes('Login')
          "
        >
          <label for="email">E-mail</label>
          <input
            id="email"
            type="email"
            :value="user.email"
            @input="updateVal($event, 'email')"
            required
            placeholder="Es: tommaso.bocchietti@gmail.com"
          />
        </div>

        <div
          v-show="
            tags_to_view.includes('Sign up') || tags_to_view.includes('Login')
          "
        >
          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            :value="user.password"
            @input="updateVal($event, 'password')"
            minlength="5"
            required
            placeholder="Es: *password segreta*"
          />
        </div>

        <div
          v-show="tags_to_view.includes('Login')"
          class="inline"
          style="justify-content: flex-start"
        >
          <input
            id="autologin"
            type="checkbox"
            :checked="user.preferences.autologin"
            @input="updateVal(!user.preferences.autologin, 'preferences.autologin')"
          />
          <label for="autologin" style="width: unset"
            >Ricordami su questo dispositivo
          </label>
        </div>

        <div v-show="tags_to_view.includes('Impostazioni')" class="tooltip">
          <span class="tooltiptext" v-show="!$store.state.user.token"
            ><mark
              >Effettua il Login per avere accesso alle funzionalità del
              sito</mark
            ></span
          >

          <h2>Impostazioni sito</h2>
          <p>Setta i seguenti parametri del sito come preferisci.</p>

          <div class="inline no-button">
            <label>Tema</label>
            <div @click="updateVal(!user.preferences.dark, 'preferences.dark')">
              <div @click="updateVal(true, 'preferences.dark')">
                <input
                  id="light"
                  value="0"
                  type="radio"
                  :checked="!user.preferences.dark"
                />
                <label for="light"> <span></span> Chiaro </label>
              </div>
              <div @click="updateVal(false, 'preferences.dark')">
                <input
                  id="dark"
                  value="0"
                  type="radio"
                  :checked="user.preferences.dark"
                />
                <label for="dark"> <span></span> Scuro </label>
              </div>
            </div>

            <button @click="updateVal(false, 'preferences.dark')">
              Ripristina
            </button>
          </div>

          <div class="inline">
            <label for="color">Colore</label>
            <input
            id="color"
              type="color"
              :value="user.preferences.color"
              @input="updateVal($event, 'preferences.color')"
            />
            <button @click="updateVal('#ffa500', 'preferences.color')">
              Ripristina
            </button>
          </div>

          <div class="inline">
            <label for="font_size">Altezza Font</label>
            <input
              id="font_size"
              type="range"
              min="-10"
              max="10"
              :value="user.preferences.font"
              @input="updateVal($event, 'preferences.font')"
            />
            <button @click="updateVal(0, 'preferences.font')">
              Ripristina
            </button>
          </div>

          <div class="inline">
            <label for="avatar">Avatar</label>
            <img
              id="avatar"
              :src="user.preferences.avatar"
              alt="AvatarSelected"
              @click="show_avatar = !show_avatar"
            />

            <button @click="updateVal('/icon.png', 'preferences.avatar')">
              Ripristina
            </button>
          </div>

          <div
            id="avatar_container"
            v-show="show_avatar"
            @click="show_avatar = false"
          >
            <h2>Avatar femminili</h2>
            <div>
              <img
                v-for="(img, index) in images_woman"
                :key="index"
                :src="'/Avatar/Woman/' + img"
                alt="AvatarWoman"
                @click="updateVal('/Avatar/Woman/' + img, 'preferences.avatar')"
              />
            </div>
            <h2>Avatar maschili</h2>
            <div>
              <img
                v-for="(img, index) in images_man"
                :key="index"
                :src="'/Avatar/Man/' + img"
                alt="AvatarMan"
                @click="updateVal('/Avatar/Man/' + img, 'preferences.avatar')"
              />
            </div>
          </div>
          <button type="submit" @click="$store.commit('UserLogout')">
            Logout
          </button>
        </div>

        <div v-show="tags_to_view.includes('Sign up')">
          <button type="submit" @click="$store.dispatch('UserSignup')">
            SignUp
          </button>
        </div>
        <div v-show="tags_to_view.includes('Login')">
          <button type="submit" @click="$store.dispatch('UserLogin')">
            Login
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
  created() {
    const man_avatar = require
      .context('/static/Avatar/Man/', false, /\.png$/)
      .keys()
    this.images_man = man_avatar.map((s) => s.slice(2))

    const woman_avatar = require
      .context('/static/Avatar/Woman/', false, /\.png$/)
      .keys()
    this.images_woman = woman_avatar.map((s) => s.slice(2))
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
      this.$store.dispatch('UserUpdate')
      if(this.user.preferences.autologin == false) localStorage.removeItem('token')
    },
  },

  watch: {
    user: {
      handler(val) {
        document.documentElement.style.setProperty(
          '--add_size',
          val.preferences.font + 'px'
        )
        document.documentElement.style.setProperty(
          '--main_color',
          val.preferences.color
        )
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
  }

  > nav > div > p {
    font-family: var(--Base_font) !important;
  }

  label {
    display: block;
  }

  div {
    margin-block: 10px;
  }

  button[type='submit'] {
    margin-top: 20px;
    width: 100%;
  }
  &:hover,
  &:focus {
    width: 95%;
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
    > label {
      width: 130px;
    }
  }

  input,
  select {
    width: 100%;
    transition: padding 0.2s linear;
  }

  input:hover,
  input:focus,
  select:hover,
  select:focus {
    border-color: var(--main_color);
    outline: none;
    padding: 5px;
  }

  #avatar_container {
    border: var(--border_setting);
    border-radius: var(--border_radius);
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
      border-color: var(--main_color);
      outline: none;
      padding: 5px;
    }
  }
}

@media (max-width: 720px) {
  .wrap.popup {
    div.inline {
      margin-inline: auto;
      flex-direction: column;
      justify-content: center;
      width: 80%;
      *:not(img) {
        width: 100%;
      }
    }
  }
}
</style>