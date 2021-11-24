<template>
  <div
    class="msg_bg"
    :class="[showLogin ? 'visible' : 'hidden']"
    @click.self="
      $emit('toParent', false)
      Agg_setting()
    "
  >
    <div class="wrap login">
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

        <form
          id="Sign_up"
          method="post"
          onSubmit="return false;"
          @submit="Sign_up"
        >
          <div>
            <label for="nickname">Nickname</label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              required
              placeholder="Es: Bocchio01"
            />
          </div>

          <div>
            <label for="email_signup">E-mail</label>
            <input
              type="email"
              id="email_signup"
              name="email"
              required
              placeholder="Es: tommaso.bocchietti@gmail.com"
            />
          </div>

          <div>
            <label for="pwd_signup">Password (minimo 5 caratteri)</label>
            <input
              type="password"
              id="pwd_signup"
              name="pwd"
              minlength="5"
              required
              placeholder="Es: *password segreta*"
            />
          </div>

          <div class="inline">
            <label for="newsletter">Iscrizione alla Newsletter mensile</label>
            <input
              style="width: unset"
              type="checkbox"
              name="newsletter"
              id="newsletter"
            />
          </div>

          <button type="submit" name="submit">Sign up</button>
        </form>
      </div>

      <div v-show="tags_to_view.includes('Login')">
        <h2>Login</h2>
        <p>Inserisci i dati di login</p>

        <form id="Login" method="post" onSubmit="return false;" @submit="Login">
          <div>
            <label for="email_login">E-mail</label>
            <input
              type="email"
              id="email_login"
              name="email"
              required
              placeholder="Es: tommaso.bocchietti@gmail.com"
            />
          </div>

          <div>
            <label for="pwd_login">Password</label>
            <input
              type="password"
              id="pwd_login"
              name="pwd"
              minlength="5"
              required
              placeholder="Es: *la tua password segreta*"
            />
          </div>

          <button type="submit" name="submit">Login</button>
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
        <button type="submit" name="submit" @click="logout()">Logout</button>
      </div>
      <div
        id="avatar_container"
        class="wrap login"
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
    </div>
  </div>
</template>

<script>
import verte from 'verte'
import 'verte/dist/verte.css'

export default {
  components: { verte },
  props: ['showLogin'],
  data() {
    return {
      tags_to_view: [],
      tags_array: ['Sign up', 'Login', 'Impostazioni'],
      color: '#ffa500',
      font: 0,
      avatar: '/icon.png',
      return_obj: '',
      show_avatar: false,
      images_man: [
        '3079771.png',
        '3079776.png',
        '3079783.png',
        '3079788.png',
        '3079793.png',
        '3079798.png',
        '3079804.png',
        '3079814.png',
        '3079819.png',
        '3079825.png',
        '3079828.png',
        '3079835.png',
        '3079843.png',
        '3079861.png',
        '3079866.png',
        '3079873.png',
        '3079876.png',
        '3079882.png',
        '3079886.png',
        '3079889.png',
        '3079893.png',
        '3079897.png',
        '3079900.png',
        '3079906.png',
        '3079908.png',
        '3079911.png',
      ],
      images_woman: [
        '13079852.png',
        '13079856.png',
        '3079645.png',
        '3079658.png',
        '3079663.png',
        '3079672.png',
        '3079684.png',
        '3079690.png',
        '3079697.png',
        '3079702.png',
        '3079708.png',
        '3079718.png',
        '3079724.png',
        '3079730.png',
        '3079734.png',
        '3079740.png',
        '3079746.png',
        '3079751.png',
        '3079758.png',
        '3079765.png',
        '3079903.png',
      ],
    }
  },
  created() {
    this.switch_menu()
    if (localStorage.email && localStorage.pwd && !sessionStorage.nickname) {
      this.Login()
    }
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
      sessionStorage.removeItem('nickname')
      localStorage.removeItem('pwd')
      localStorage.removeItem('email')
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
      const xhttp = new XMLHttpRequest()
      const FD = new FormData(document.getElementById('Sign_up'))

      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          const return_obj = JSON.parse(xhttp.responseText)
          if (return_obj.Result.Status) {
            alert(
              'Perfetto, creazione riuscita. Controlla la tua casella email'
            )
          }
        }
      }
      xhttp.open('POST', process.env.UTILS_SITE + '/php/nuovo_utente.php')
      xhttp.send(FD)
    },

    Login(e) {
      const xhttp = new XMLHttpRequest()
      const FD = e
        ? new FormData(document.getElementById('Login'))
        : '&email=' + localStorage.email + '&pwd=' + localStorage.pwd
      xhttp.onreadystatechange = (x) => {
        let result = x.target

        if (result.readyState == 4 && result.status == 200) {
          const return_obj = JSON.parse(xhttp.responseText)
          if (return_obj.Result.Status) {
            this.set_value(
              return_obj.Result.Color,
              return_obj.Result.Font,
              return_obj.Result.Avatar
            )

            sessionStorage.nickname = return_obj.Result.Nickname
            localStorage.pwd = return_obj.Result.Password
            localStorage.email = return_obj.Result.Email
            alert('Bentornato ' + return_obj.Result.Nickname + '!')
            this.switch_menu()
          }
        }
      }
      xhttp.open('POST', process.env.UTILS_SITE + '/php/login_utente.php')
      if (!e) {
        xhttp.setRequestHeader(
          'Content-type',
          'application/x-www-form-urlencoded'
        )
      }
      xhttp.send(FD)
    },

    Agg_setting() {
      const xhttp = new XMLHttpRequest()

      xhttp.open(
        'POST',
        process.env.UTILS_SITE + '/php/aggiornamento_utente.php'
      )
      xhttp.setRequestHeader(
        'Content-type',
        'application/x-www-form-urlencoded'
      )

      xhttp.send(
        'color=' +
          this.color +
          '&font=' +
          this.font +
          '&nickname=' +
          sessionStorage.nickname +
          '&avatar=' +
          this.avatar
      )
    },
  },
  watch: {
    color: function (val) {
      document.documentElement.style.setProperty('--main_color', val)
    },
    font: function (val) {
      document.documentElement.style.setProperty('--add_size', val + 'px')
    },
  },
}
</script>

<style lang="scss">
.msg_bg {
  top: 0px;
  left: 0px;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #000000b0;
  height: 100%;
  width: 100%;

  &.hidden {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s linear 500ms, opacity 500ms;
  }
  &.visible {
    visibility: visible;
    opacity: 1;
    transition: visibility 0s linear 0s, opacity 500ms;
  }
}

.wrap.login {
  button,
  input {
    margin: 0;
  }
  margin: auto;
  max-width: 700px;
  max-height: calc(100vh - 100px);
  overflow-y: overlay;
  nav {
    margin-top: 5px;
    > div {
      display: flex;
      row-gap: 5px;
      max-width: unset;
      > p {
        font-family: var(--Base_font);
      }
    }
  }
  label {
    display: block;
  }
  > div {
    > form {
      > div {
        margin-block: 10px;
      }
    }
  }
  button[type='submit'] {
    margin-top: 20px;
    width: 100%;
    margin-inline: auto;
  }

  button[type='submit']:hover,
  button[type='submit']:focus {
    width: 95%;
  }

  div.inline {
    margin-block: 10px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    column-gap: 10px;
    row-gap: 10px;
    > label,
    > input {
      width: 25%;
      min-width: fit-content;
      font-size: var(--paragraph_size);
    }
    > button {
      margin-left: auto;
    }
  }

  input {
    width: 100%;
    transition: padding 0.2s linear;
  }

  input:hover,
  input:focus,
  img:hover,
  img:focus {
    border-color: var(--main_color);
    outline: none;
    padding: 5px;
  }

  #avatar_container {
    height: fit-content;
    overflow-y: auto;
    display: block;
    position: fixed;
    margin: auto;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
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
  }
  img:hover {
    opacity: 0.8;
  }
}

@media (max-width: 720px) {
  .wrap.login img {
    width: 50px;
    height: 50px;
  }
}
</style>