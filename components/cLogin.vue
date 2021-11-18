<template>
  <div
    class="msg_bg"
    :class="[showLogin ? 'visible' : 'hidden']"
    @click.self="
      $emit('toParent', false)
      agg_user()
    "
  >
    <div class="wrap login">
      <h1>Accesso al sito</h1>

      <cMenuScelta
        @toParent="handler"
        :tags="tags_array"
        :multiple="false"
        :start="[tags_array[0]]"
      />

      <div v-show="tags_to_view.includes(tags_array[0])">
        <h2>Sign up</h2>
        <p>
          Inserisci i dati richiesti e riceverai a breve un e-mail di conferma.
        </p>

        <form
          id="newUser"
          method="post"
          onSubmit="return false;"
          @submit="newUser"
        >
          <div>
            <label for="nickname">Nickname</label>
            <input
              type="text"
              name="nickname"
              required
              placeholder="Es: Bocchio01"
            />
          </div>

          <div>
            <label for="email">E-mail</label>
            <input
              type="text"
              name="email"
              required
              placeholder="Es: tommaso.bocchietti@gmail.com"
            />
          </div>

          <div>
            <label for="pwd">Password (minimo 5 caratteri)</label>
            <input
              type="text"
              name="pwd"
              minlength="5"
              required
              placeholder="Es: *password segreta*"
            />
          </div>

          <div class="inline">
            <label for="newsletter">Iscrizione alla Newsletter mensile</label
            >
            <input type="checkbox" name="newsletter" />
          </div>

          <input class="button" type="submit" value="Sign up" name="submit" />
        </form>
      </div>

      <div v-show="tags_to_view.includes(tags_array[1])">
        <h2>Login</h2>
        <p>Inserisci i dati di login</p>

        <form
          id="loginUser"
          method="post"
          onSubmit="return false;"
          @submit="loginUser"
        >
          <div>
            <label for="email">E-mail</label>
            <input
              type="text"
              name="email"
              required
              placeholder="Es: tommaso.bocchietti@gmail.com"
            />
          </div>

          <div>
            <label for="pwd">Password</label>
            <input
              type="text"
              name="pwd"
              minlength="5"
              required
              placeholder="Es: *la tua password segreta*"
            />
          </div>

          <input class="button" type="submit" value="Login" name="submit" />
        </form>
      </div>

      <div v-show="tags_to_view.includes(tags_array[2])">
        <h2>Impostazioni sito</h2>
        <p>Setta i colori del sito come preferisci</p>
        <div class="inline">
          <label>Colore principale</label>
          <verte
            v-model="color"
            model="rgb"
            menuPosition="center"
            @input="change_color"
            :showHistory="false"
          ></verte>
          <button style="margin-left: auto" @click="color = 'rgb(255,165,0)'">
            Rispristina default
          </button>
        </div>
        <div class="inline">
          <label>Altezza Font</label>
          <input
            id="font_size"
            type="number"
            min="-10"
            max="10"
            v-model.number="font"
            @change="change_font_size()"
          />
          <button
            style="margin-left: auto"
            @click="
              font = 0
              change_font_size()
            "
          >
            Rispristina default
          </button>
        </div>
        <div class="inline"></div>
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
      color: this.init(),
      font: this.init2(),
      return_obj: '',
    }
  },
  methods: {
    init() {
      if (localStorage.main_color) {
        return localStorage.main_color
      } else {
        return 'rgb(255,165,0)'
      }
    },
    init2() {
      if (localStorage.font) {
        return localStorage.font
      } else {
        return 0
      }
    },
    change_font_size() {
      localStorage.font = this.font
      document.documentElement.style.setProperty('--add_size', this.font + 'px')
    },

    change_color() {
      localStorage.main_color = this.color
      document.documentElement.style.setProperty('--main_color', this.color)
    },

    handler(value) {
      this.tags_to_view = value
    },

    reset(color = 'rgb(255,165,0)', font = 0) {
      this.color = color
      this.font = font
      this.change_font_size()
    },

    newUser() {
      const xhttp = new XMLHttpRequest()
      const FD = new FormData(document.getElementById('newUser'))

      xhttp.onerror = function () {
        alert("C'è stato un errore nella chiamata al database..")
      }

      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          const return_obj = JSON.parse(xhttp.responseText)
          console.log(return_obj)
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

    loginUser() {
      const xhttp = new XMLHttpRequest()
      const FD = new FormData(document.getElementById('loginUser'))

      xhttp.onerror = function () {
        alert("C'è stato un errore nella chiamata al database..")
      }

      xhttp.onreadystatechange = (x) => {
        let result = x.target

        if (result.readyState == 4 && result.status == 200) {
          const return_obj = JSON.parse(xhttp.responseText)
          if (return_obj.Result.Status) {
            this.reset(
              return_obj.Result.Color,
              parseInt(return_obj.Result.Font)
            )
            localStorage.nickname = return_obj.Result.Nickname
            alert('Bentornato ' + return_obj.Result.Nickname + '!')
          }
        }
      }
      xhttp.open('POST', process.env.UTILS_SITE + '/php/login_utente.php')
      xhttp.send(FD)
    },
    agg_user() {
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
          localStorage.nickname
      )
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
  align-items: center;
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
  *:not(.verte *) {
    margin: unset;
    display: block;
  }
  max-width: 700px;
  max-height: calc(100vh - 100px);
  overflow-y: overlay;
  nav {
    margin-block: 5px !important;
    > div {
      display: flex !important;
      row-gap: 5px;
      max-width: unset;
      > p {
        font-family: var(--Base_font);
      }
    }
  }
  > div {
    > form {
      > div {
        margin-block: 10px !important;
      }
      > input[type='submit'] {
        margin-top: 20px;
      }
    }
  }
  div.inline {
    margin-block: 10px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    column-gap: 10px;
    row-gap: 10px;
    *:not(.verte *) {
      width: unset !important;
    }
  }

  label {
    font-size: var(--paragraph_size);
  }

  input {
    width: 100%;
    transition: padding 0.2s linear;
  }

  input:not([type='submit']):hover,
  input:not([type='submit']):focus {
    border-color: var(--main_color);
    outline: none;
    padding: 5px;
  }
}
</style>