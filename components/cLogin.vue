<template>
  <div
    class="bg login"
    :style="{ visibility: [showLogin ? 'visible' : 'hidden'] }"
    @click.self="$emit('toParent', false)"
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
            <label for="newsletter"
              >Iscrizione alla Newsletter mensile (contenente gli articoli del
              mese)</label
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
          @submit="newUser"
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
        </div>
        <div class="inline">
          <button @click="reset()">Rispristina default</button>
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
      color: this.init(),
      font: this.init2(),
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

      xhttp.onerror = () =>
        alert("C'è stato un errore nella chiamata al database..")

      xhttp.onreadystatechange = () => {
        if (this.readyState == 4 && this.status == 200) {
          alert('Perfetto, creazione riuscita. Controlla la tua casella email')
        }
      }

      xhttp.open(
        'POST',
        'https://bocchioutils.altervista.org/php/nuovo_utente.php'
      )
      xhttp.send(FD)
    },

    loginUser() {
      const xhttp = new XMLHttpRequest()
      const FD = new FormData(document.getElementById('loginUser'))

      xhttp.onerror = () =>
        alert("C'è stato un errore nella chiamata al database di login..")

      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          let data = JSON.parse(xhttp.responseText)
          console.log(data)
          reset(data.color, data.font_size)
        }
      }

      xhttp.open(
        'POST',
        'https://bocchioutils.altervista.org/php/login_utente.php'
      )
      xhttp.send(FD)
    },
  },
}
</script>

<style lang="scss">
.bg.login {
  top: 0px;
  position: fixed;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background-color: #000000b0;
  height: 100%;
  width: 100%;
  //transition: visibility 0.5s ease-out;
}

.wrap.login {
  margin-block: auto;
  max-width: 700px;
  max-height: calc(100vh - 100px);
  overflow-y: overlay;
  h2 {
    margin-top: 0px;
  }
  nav > div {
    row-gap: 5px;
    max-width: unset;
  }
  nav {
    margin-block: 20px;
    > div > p {
      font-family: var(--Base_font) !important;
    }
  }

  label {
    display: block;
    ~ input {
      margin-block: 0px;
    }
  }
  form > div {
    display: block;
    margin-block: 10px;
  }
  .inline {
    margin-block: 10px;
    display: flex;
    align-items: center;
    > label {
      width: 25%;
      min-width: max-content;
      margin-right: 10px;
    }
    > input {
      margin: 0px;
      width: unset;
    }
  }
}
</style>