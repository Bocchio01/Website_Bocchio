<i18n>
{
  "it": {
    "tags_array": ["Per alunni", "Per professori"]
  },

  "en": {
    "tags_array": ["For alumni", "For teachers"]
  }
}
</i18n>

<template>
  <div class="wrap Portale Private_Lessons_Management">
    <CHeadPortale />
    <CMenuScelta @toParent="handler" :tags="tags_array" :start="[tags_array[1]]" />

    <div v-show="tags_to_view[0]">
      <div v-if="!dati.Alumno.id" class="wrap popup">
        <h2>Login</h2>
        <p>Effettua il login usando la password che ti è stata fornita per accede alla tua pagina personale</p>
        <div>
          <form onSubmit="return false;">
            <label for="PLM_alumni_password">Password:</label>
            <input type="text" name="PLM_alumni_password" id="PLM_alumni_password" required
              v-model="models.Alumno.entry_password">
            <button @click="loginAlumno()" type="submit">Accedi</button>
          </form>
        </div>
      </div>

      <div v-else class="wrap popup">
        <h2>Pagina personale</h2>
        <p>Di seguito trovi tutti i tuoi dati relativi alle lezioni fatte, i pagamenti e alcune statistiche magari
          interessanti.</p>
        <p>Se noti qualcosa di strano o qualche dato mancate fammelo sapere via WhatsApp che provvederò a sistemare e
          correggere.</p>
        <br />
        <p>Tommaso</p>
        <button v-if="dati.Professor.id" @click="SUDOmod = !SUDOmod"> Go in SUDO mod </button>

        <button @click="exitALumno()" type="submit"> Exit </button>
      </div>

      <hr />

      <cDashBoard @Modify="Modify" @Delete="Delete" :data="dati.Alumno.dashboard" :SUDO="SUDOmod"></cDashBoard>
    </div>

    <div v-show="tags_to_view[1]">
      <div v-if="!dati.Professor.id" class="wrap popup">
        <h2>Login</h2>
        <p>Se sei un professore, effettua il login per gestire i tuoi alunni.</p>
        <button @click="loginProfessor()" type="submit">Accedi</button>
      </div>

      <div v-else class="wrap popup">
        <h2>Pagina personale per professori</h2>
        <p>Questo è il tuo pannello di controllo.</p>
        <div class="inline">
          <button @click="toggle.addLesson = true"> Add lesson </button>
          <button @click="toggle.addAlumno = true"> Add Alumno </button>
          <button @click="toggle.modifyAlumno = true"> Modify Alumno </button>
        </div>
        <button @click="SUDOmod = !SUDOmod"> Go in SUDO mod </button>
        <button @click="exitProfessor()" type="submit"> Exit </button>
      </div>

      <hr />

      <cDashBoard @Modify="Modify" @Delete="Delete" :data="dati.Professor.dashboard" :SUDO="SUDOmod"></cDashBoard>
    </div>


    <div class="msg_bg" :class="[toggle.addLesson ? 'visible' : 'hidden']" @click.self="toggle.addLesson = false">
      <div class="wrap popup">
        <h2>Nuova lezione</h2>
        <p>Aggiungi una nuova lezione</p>
        <div>

          <form onSubmit="return false;" id="AddLessonsForm">

            <div class="inline no-button">
              <label for="AlumnoName">Alunno:</label>
              <select @change="alumnoSelected()" id="AlumnoName" name="AlumnoName[]" multiple required
                v-model="models.Professor.alumnoIDs">
                <option v-for="(alumno, index) in dati.Professor.alumni_list" :key="index" :value="alumno.id_alumno">
                  ({{ alumno.nickname }}) - {{ alumno.name }} {{ alumno.surname }}
                </option>
              </select>
            </div>

            <div class="inline no-button">
              <label for="date">Data:</label>
              <input type="date" id="date" v-model="models.Professor.data" />
            </div>

            <div class="inline no-button">
              <label for="Subjects">Materie:</label>
              <select id="Subjects" name="Subjects[]" multiple v-model="models.Professor.subject">
                <option v-for="(subject, index) in subject_list" :key="index" :value="subject">
                  {{ subject }}
                </option>
              </select>
            </div>

            <div>
              <label for="arguments">Argomenti:</label>
              <input type="text" id="arguments" v-model="models.Professor.arguments" />
            </div>

            <div class="inline no-button">
              <label for="minutes">Minutes</label>
              <input type="number" id="minutes" v-model="models.Professor.minutes" />
            </div>

            <div class="inline no-button">
              <label for="price_per_hour">Price_per_hour</label>
              <input type="number" id="price_per_hour" v-model="models.Professor.price_per_hour" />
            </div>

            <div class="inline no-button">
              <label for="extra">Extra</label>
              <input type="number" id="extra" v-model="models.Professor.extra" />
            </div>


            <button @click="addLesson()" type="submit"> Add Lessons </button>
          </form>
        </div>
      </div>
    </div>

    <!-- <div class="msg_bg" :class="[toggle.addAlumno ? 'visible' : 'hidden']" @click.self="toggle.addAlumno = false">
      <div class="wrap popup">
        <h2>Add Alumno</h2>
        <p>Aggiungi un nuovo alunno</p>
        <div>
          <form onSubmit="return false;" id="addAlumnoForm">

            <div>
              <label for="name">Nome:</label>
              <input type="text" id="name" required />
            </div>

            <div>
              <label for="Surname">Surname:</label>
              <input type="text" id="Surname" />
            </div>

            <div>
              <label for="portalEmail">Email:</label>
              <input type="text" id="portalEmail" />
            </div>

            <div class="inline no-button">
              <label for="defaultPrice">defaultPrice:</label>
              <input type="number" id="defaultPrice" />
            </div>

            <div class="inline no-button">
              <label for="defaultExtra">Extra:</label>
              <input type="number" id="defaultExtra" />
            </div>

            <button @click="addAlumno()" type="submit"> Add Alumno </button>
          </form>
        </div>
      </div>
    </div> -->

  </div>
</template>

<script>

import sendRequest from '@/assets/js/sendRequest.js'
import { map } from 'mathjs'

export default {
  data() {
    return {
      tags_to_view: [],
      SUDOmod: false,
      toggle: {
        addAlumno: false,
        addLesson: false,
        addPayment: false,
      },

      models: {
        Alumno: {
          entry_password: '',
        },
        Professor: {
          alumnoIDs: [],
          data: new Date().toISOString().split('T')[0],
          subject: [],
          arguments: '',
          minutes: 0,
          price_per_hour: 0,
          extra: 0,
        },
      },

      subject_list: [
        'Matematica',
        'Fisica',
        'Inofrmatica'
      ],

      dati: {
        Alumno: {
          id: null,
          dashboard: [],
        },
        Professor: {
          id: null,
          dashboard: [],
          alumni_list: [],
        },
      },
    }
  },

  computed: {
    tags_array() {
      return Object.values(this.$t('tags_array'))
    },
  },


  methods: {

    loginProfessor() {
      if (this.$store.state.user.id == null) {

        this.$store.commit('toggle_show', 'login')

      } else {

        sendRequest(
          {
            action: 'ProfessorGetDashBoard',
            data: JSON.stringify({}),
          },
          '/PLM/Main.php'
        )
          .then((res) => { this.dati.Professor = res.Data })
          .catch((res) => this.$store.commit('auth_error', res.Log))
      }
    },

    loginAlumno() {
      sendRequest(
        {
          action: 'AlumnoLogin',
          data: JSON.stringify({
            entry_password: this.models.Alumno.entry_password
          }),
        },
        '/PLM/Main.php'
      )
        .then((res) => { this.dati.Alumno = res.Data })
        .catch((res) => this.$store.commit('auth_error', res.Log))
    },

    exitAlumno() {
      this.dati.Alumno = {
        id: null,
        dashboard: [],
      }
    },

    exitProfessor() {
      this.dati.Professor = {
        id: null,
        dashboard: [],
        alumni_list: [],
      }
    },

    addLesson() {

      var AlumnoName = [...document.getElementById('AlumnoName').selectedOptions].map(option => option.value);
      var Subjects = [...document.getElementById('Subjects').selectedOptions].map(option => option.value);

      sendRequest(
        {
          action: 'addLesson',
          data: JSON.stringify({
            id_professor: this.dati.Professor.id,
            id_alumni: AlumnoName,
            date: document.getElementById('date').value,
            minutes: document.getElementById('minutes').value,
            extra: document.getElementById('extra').value,
            price: document.getElementById('price').value,
            arguments: document.getElementById('arguments').value,
            Subjects: Subjects,
          }),
        },
        '/PLM/Main.php'
      )
        .then((res) => {
          this.$store.commit('auth_error', res.Log),
            this.toggle.addLesson = false,
            this.loginTeacher()
        })
        .catch((res) => this.$store.commit('auth_error', res.Log))
    },


    addAlumno() {
      sendRequest(
        {
          action: 'addAlumno',
          data: JSON.stringify({
            id_owner: this.dati.Professor.id,
            name: document.getElementById('name').value,
            surname: document.getElementById('Surname').value,
            email: document.getElementById('portalEmail').value,
            defaultPrice: document.getElementById('defaultPrice').value,
            extra: document.getElementById('defaultExtra').value,
          }),
        },
        '/PLM/Main.php'
      )
        .then((res) => { this.toggle.addAlumno = false, this.getAlumniList() })
        .catch((res) => this.$store.commit('auth_error', res.Log)
        )
    },


    Modify(id, tabs) {
      var payload = {}
      tabs.forEach(element => {
        let input = document.getElementById(id + '.' + element)
        if (input) {
          payload[element] = input.value
        } else {

          return
        }
      });

      sendRequest(
        {
          action: 'Modify',
          data: JSON.stringify({
            nameTable: id.split('.')[0],
            id: id.split('.')[1],
            ...payload
          }),
        },
        '/PLM/Main.php'
      )
        .then((res) => { this.loginProfessor() })
        .catch((res) => this.$store.commit('auth_error', res.Log))
    },


    Delete(id) {
      sendRequest(
        {
          action: 'Delete',
          data: JSON.stringify({
            nameTable: id.split('.')[0],
            id: id.split('.')[1],
          }),
        },
        '/PLM/Main.php'
      )
        .then((res) => { this.loginProfessor() })
        .catch((res) => this.$store.commit('auth_error', res.Log))
    },


    alumnoSelected() {
      if (this.models.Professor.alumnoIDs.length == 1 && this.dati.Professor.alumni_list.length > 0) {
        console.log('alumnoSelected')

        map(this.dati.Professor.alumni_list, (alumno) => {
          if (alumno.id_alumno == this.models.Professor.alumnoIDs[0]) {
            // this.subject =  [],
            this.models.Professor.price_per_hour = alumno.default_price
            this.models.Professor.extra = alumno.default_extra
          }
        })
      }
    },
    handler(value) {
      this.tags_to_view = this.tags_array.map((el) => value.includes(el))
    },
  },

  watch: {
    '$store.state.user.id': {
      handler(newVal, oldVal) {
        this.loginProfessor()
      },
    },
  },
}
</script>

<style lang="scss">
.Private_Lessons_Management {
  .box {
    overflow-x: auto;
  }

  hr {
    width: 80%;
    margin-inline: auto;
    margin-block: 20px;
  }

  table {
    // font-size: small !important;

    td,
    th {
      padding-block: 0;
      padding-inline: 15px;
      border: 1px solid black;
      white-space: nowrap;
    }

    tr:hover {
      background-color: var(--Color_Hover);
      cursor: pointer;
    }

    th::first-letter {
      text-transform: capitalize;
    }
  }
}
</style>
