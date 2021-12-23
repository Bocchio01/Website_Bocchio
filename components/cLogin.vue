<template>
  <div
    class="msg_bg"
    :class="[showLogin ? 'visible' : 'hidden']"
    @click.self="
      $emit('toParent', false)
      Agg_setting()
    "
  >
    <div class="wrap popup" @click.self="show_avatar = false">
      <h1>Area personale</h1>

      <cMenuScelta
        @toParent="handler"
        :tags="tags_array"
        :multiple="false"
        :start="[tags_array[0]]"
      />

      <div v-show="tags_to_view.includes('Sign up')">
        <h2>Sign up</h2>
        <p>
          Inserisci i dati richiesti e riceverai a breve un e-mail di conferma.
        </p>

        <form id="Signup_form" onSubmit="return false;" @submit="Sign_up">
          <div>
            <label for="signup_nickname">Nickname</label>
            <input
              type="text"
              id="signup_nickname"
              name="nickname"
              required
              placeholder="Es: Bocchio01"
            />
          </div>

          <div>
            <label for="signup_email">E-mail</label>
            <input
              type="email"
              id="signup_email"
              name="email"
              required
              placeholder="Es: tommaso.bocchietti@gmail.com"
            />
          </div>

          <div>
            <label for="signup_pwd">Password</label>
            <input
              type="password"
              id="signup_pwd"
              name="pwd"
              minlength="5"
              required
              placeholder="Es: *password segreta*"
            />
          </div>

          <!-- <div class="inline">
            <label for="signup_newsletter"
              >Iscrizione alla Newsletter mensile</label
            >
            <input type="checkbox" id="signup_newsletter" name="newsletter" />
          </div> -->

          <button type="submit">Sign up</button>
        </form>
      </div>

      <div v-show="tags_to_view.includes('Login')">
        <h2>Login</h2>
        <p>Inserisci i dati di login</p>

        <form id="Login_form" onSubmit="return false;" @submit="Login">
          <div>
            <label for="login_email">E-mail</label>
            <input
              type="email"
              id="login_email"
              name="email"
              required
              placeholder="Es: tommaso.bocchietti@gmail.com"
            />
          </div>

          <div>
            <label for="login_pwd">Password</label>
            <input
              type="password"
              id="login_pwd"
              name="pwd"
              minlength="5"
              required
              placeholder="Es: *la tua password segreta*"
            />
          </div>

          <button type="submit">Login</button>
        </form>
      </div>

      <div v-show="tags_to_view.includes('Impostazioni')">
        <h2>Impostazioni sito</h2>
        <p>Setta i colori del sito come preferisci</p>

        <div class="inline">
          <label for="color">Colore principale</label>
          <input type="color" name="color" id="color" v-model="color" />
          <button @click="color = '#ffa500'">Ripristina</button>
        </div>

        <div class="inline">
          <label for="font_size">Altezza Font</label>
          <input
            id="font_size"
            type="range"
            min="-10"
            max="10"
            v-model="font"
          />
          <button @click="font = 0">Ripristina</button>
        </div>

        <div class="inline">
          <label for="input_avatar">Avatar</label>
          <img :src="avatar" @click="show_avatar = true" />

          <button @click="avatar = '/icon.png'">Ripristina</button>
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
              @click="avatar = '/Avatar/Woman/' + img"
            />
          </div>
          <h2>Avatar maschili</h2>
          <div>
            <img
              v-for="(img, index) in images_man"
              :key="index"
              :src="'/Avatar/Man/' + img"
              @click="avatar = '/Avatar/Man/' + img"
            />
          </div>
        </div>
        <button type="submit" name="submit" @click="logout()">Logout</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['showLogin'],
  data() {
    return {
      tags_to_view: [],
      tags_array: ['Sign up', 'Login', 'Impostazioni'],
      color: '#ffa500',
      font: 0,
      avatar: '/icon.png',
      show_avatar: false,
      images_man: [],
      images_woman: [],
    }
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

    new Promise((resolve, reject) => {
      if (localStorage.email && localStorage.pwd && !sessionStorage.nickname) {
        resolve(true)
      } else {
        reject(false)
      }
    })
      .then(() => {
        document.getElementById('Login_form').email.value = localStorage.email
        document.getElementById('Login_form').pwd.value = localStorage.pwd
        this.Login()
        this.switch_menu()
      })
      .catch(() => {
        this.set_value(
          sessionStorage.main_color,
          sessionStorage.add_size,
          sessionStorage.avatar
        )
        this.switch_menu()
      })
  },
  methods: {
    switch_menu() {
      if (sessionStorage.nickname) {
        this.tags_array = ['Impostazioni']
      } else {
        this.tags_array = ['Sign up', 'Login']
      }
      this.tags_to_view = [this.tags_array[0]]
    },

    logout() {
      sessionStorage.clear()
      localStorage.clear()
      this.switch_menu()
      this.set_value()
    },

    handler(value) {
      this.tags_to_view = value
    },

    set_value(color = '#ffa500', font = 0, avatar = '/icon.png') {
      this.color = color
      this.font = parseInt(font)
      this.avatar = avatar
    },

    Sign_up() {
      this.sendRequest({
        action: 'Sign_up',
        form: document.getElementById('Signup_form'),
      }).then((res) => {
        if (res.Result.Status == 0) {
          alert('Perfetto, creazione riuscita. Controlla la tua casella email')
        } else {
          alert(res.Error)
        }
      })
    },

    Login() {
      this.sendRequest({
        action: 'Login',
        form: document.getElementById('Login_form'),
      }).then((res) => {
        if (res.Result.Status == 0) {
          this.set_value(res.Result.Color, res.Result.Font, res.Result.Avatar)
          sessionStorage.nickname = res.Result.Nickname
          localStorage.pwd = res.Result.Password
          localStorage.email = res.Result.Email
          alert('Bentornato ' + res.Result.Nickname + '!')
          this.switch_menu()
        } else {
          alert(res.Error)
        }
      })
    },

    Agg_setting() {
      this.sendRequest({
        action: 'Agg_setting',
        color: this.color,
        font: this.font,
        avatar: this.avatar,
        nickname: sessionStorage.nickname,
      }).then()
    },

    sendRequest(args) {
      const xhttp = new XMLHttpRequest()
      const FD = new FormData(args.form)
      for (const [key, value] of Object.entries(args)) {
        if (key != 'form') FD.append(key, value)
      }

      return new Promise((resolve, reject) => {
        xhttp.onreadystatechange = (e) => {
          if (xhttp.readyState != 4 && xhttp.status == 200) {
            resolve(JSON.parse(xhttp.responseText))
          } else {
            // reject(console.warn('request_error'))
          }
        }
        xhttp.open('POST', process.env.UTILS_SITE + '/PWS/main.php')

        xhttp.send(FD)
      })
    },
  },

  watch: {
    color: function (val) {
      sessionStorage.main_color = val
      document.documentElement.style.setProperty('--main_color', val)
    },
    font: function (val) {
      sessionStorage.add_size = val
      document.documentElement.style.setProperty('--add_size', val + 'px')
    },
    avatar: function (val) {
      sessionStorage.avatar = val
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
    > div {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  }
  img {
    width: 75px;
    height: 75px;
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
  .wrap.popup img {
    width: 50px;
    height: 50px;
  }
}
</style>