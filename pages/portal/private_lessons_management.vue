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
    <CMenuScelta
      @toParent="handler"
      :tags="tags_array"
      :start="[tags_array[1]]"
    />

    <div v-show="tags_to_view[0]">
      <div v-if="!dati.Alumno.id" class="wrap popup">
        <h2>Login</h2>
        <p>
          Effettua il login usando la password che ti è stata fornita per
          accedere alla tua pagina personale
        </p>
        <div>
          <label for="PLM_alumni_password">Password:</label>
          <input
            type="text"
            name="PLM_alumni_password"
            id="PLM_alumni_password"
            required
            v-model="models.Alumno.entry_password"
          />
          <button @click="loginAlumno()" type="submit">Accedi</button>
        </div>
      </div>

      <div v-else class="wrap popup">
        <h2>Pagina personale</h2>
        <p>
          Di seguito trovi tutti i tuoi dati relativi alle lezioni fatte, i
          pagamenti e alcune statistiche magari interessanti.
        </p>
        <p>
          Se noti qualcosa di strano o qualche dato mancate fammelo sapere via
          WhatsApp che provvederò a sistemare e correggere.
        </p>
        <br />
        <p>Tommaso</p>

        <br />
        <button v-if="dati.Professor.id" @click="SUDOmod = !SUDOmod">
          Go in SUDO mod
        </button>

        <br />
        <p>
          Di default vengono visualizzati qui solo gli ultimi 20 record di ogni
          tabella.
        </p>
        <p>Per visualizzare i dati completi, clicca qui.</p>
        <button @click="loginAlumno('complete')">Dump completo</button>

        <br />
        <p>Per chiudere il database, effettua il logout.</p>
        <button @click="exitAlumno()" type="submit">Logout</button>
      </div>

      <hr />

      <cDashBoard
        @Modify="Modify"
        @Delete="Delete"
        :data="dati.Alumno.dashboard"
        :SUDO="SUDOmod"
      ></cDashBoard>
    </div>

    <div v-show="tags_to_view[1]">
      <div v-if="!dati.Professor.id" class="wrap popup">
        <h2>Login</h2>
        <p>
          Se sei un professore, effettua il login per gestire i tuoi alunni.
        </p>
        <button @click="loginProfessor()" type="submit">Accedi</button>
      </div>

      <div v-else class="wrap popup">
        <h2>Pagina personale per professori</h2>
        <p>Questo è il tuo pannello di controllo.</p>
        <br />
        <label for="buttons">
          Utilizzza i seguenti pulsanti per aggiungere nuovi record al database.
        </label>
        <div id="buttons" style="display: flex">
          <button @click="toggle.addLesson = true">Add Lesson</button>
          <button @click="toggle.addAlumno = true">Add Alumno</button>
          <button @click="toggle.addPayment = true">Add Payment</button>
        </div>
        <br />
        <p>
          Per modifcare o eliminare record già presenti nel database entra in
          modalità SUDO e fai doppio click sul record interessato da una delle
          tabelle sotto.
        </p>
        <button @click="SUDOmod = !SUDOmod">Enter/Exit SUDO</button>
        <br />
        <p>
          Di default vengono visualizzati qui solo gli ultimi 20 record di ogni
          tabella.
        </p>
        <p>Per visualizzare i dati completi, clicca qui.</p>
        <button @click="loginProfessor('complete')">Dump completo</button>

        <br />
        <p>Per chiudere il database, effettua il logout.</p>
        <button @click="exitProfessor()" type="submit">Logout</button>
      </div>

      <hr />

      <cDashBoard
        @Modify="Modify"
        @Delete="Delete"
        :data="dati.Professor.dashboard"
        :SUDO="SUDOmod"
      ></cDashBoard>
    </div>

    <div
      class="msg_bg"
      :class="[toggle.addLesson ? 'visible' : 'hidden']"
      @click.self="toggle.addLesson = false"
    >
      <div class="wrap popup">
        <h2>Nuova lezione</h2>
        <p>Aggiungi una nuova lezione</p>
        <div>
          <div class="inline no-button">
            <label for="AlumnoName">Alunno:</label>
            <select
              @change="alumnoSelected()"
              id="AlumnoName"
              name="AlumnoName[]"
              multiple
              required
              v-model="models.Professor.lesson.id_alumni"
            >
              <option
                v-for="(alumno, index) in dati.Professor.alumni_list"
                :key="index"
                :value="alumno.id_alumno"
              >
                ({{ alumno.owner }}) - {{ alumno.name }} {{ alumno.surname }}
              </option>
            </select>
          </div>

          <div class="inline no-button">
            <label for="date">Data:</label>
            <input
              type="date"
              id="date"
              v-model="models.Professor.lesson.date"
            />
          </div>

          <div class="inline no-button">
            <label for="Subjects">Materie:</label>
            <select
              id="Subjects"
              name="Subjects[]"
              multiple
              v-model="models.Professor.lesson.subjects"
            >
              <option
                v-for="(subject, index) in dati.Professor.subject_list"
                :key="index"
                :value="subject"
              >
                {{ subject }}
              </option>
            </select>
          </div>

          <div>
            <label for="arguments">Argomenti:</label>
            <input
              type="text"
              id="arguments"
              v-model="models.Professor.lesson.arguments"
            />
          </div>

          <div class="inline no-button">
            <label for="minutes">Minutes</label>
            <input
              type="number"
              id="minutes"
              v-model="models.Professor.lesson.minutes"
            />
          </div>

          <div class="inline no-button">
            <label for="price_per_hour">Price_per_hour</label>
            <input
              type="number"
              id="price_per_hour"
              v-model="models.Professor.lesson.price_per_hour"
            />
          </div>

          <div class="inline no-button">
            <label for="extra">Extra</label>
            <input
              type="number"
              id="extra"
              v-model="models.Professor.lesson.extra"
            />
          </div>

          <button @click="add(models.Professor.lesson, 'Lesson')" type="submit">
            Add Lessons
          </button>
        </div>
      </div>
    </div>

    <div
      class="msg_bg"
      :class="[toggle.addAlumno ? 'visible' : 'hidden']"
      @click.self="toggle.addAlumno = false"
    >
      <div class="wrap popup">
        <h2>Nuovo Alumno</h2>
        <p>Aggiungi un nuovo alunno</p>
        <div>
          <div class="inline no-button">
            <label for="id_auth_professors">id_auth_professors:</label>
            <select
              id="id_auth_professors"
              name="id_auth_professors[]"
              multiple
              v-model.number="models.Professor.alumno.id_auth_professors"
            >
              <option
                v-for="(professor, index) in dati.Professor.professor_list"
                :key="index"
                :value="professor.id"
              >
                {{ professor.nickname }}
              </option>
            </select>
          </div>

          <div>
            <label for="name">Nome:</label>
            <input
              type="text"
              id="name"
              v-model="models.Professor.alumno.name"
            />
          </div>

          <div>
            <label for="Surname">Surname:</label>
            <input
              type="text"
              id="Surname"
              v-model="models.Professor.alumno.surname"
            />
          </div>

          <div>
            <label for="portalEmail">Email:</label>
            <input
              type="text"
              id="portalEmail"
              v-model="models.Professor.alumno.email"
            />
          </div>

          <div class="inline no-button">
            <label for="default_subjects">default_subjects:</label>
            <select
              id="default_subjects"
              name="default_subjects[]"
              multiple
              v-model="models.Professor.alumno.default_subjects"
            >
              <option
                v-for="(subject, index) in dati.Professor.subject_list"
                :key="index"
                :value="subject"
              >
                {{ subject }}
              </option>
            </select>
          </div>

          <div class="inline no-button">
            <label for="default_price">default_price:</label>
            <input
              type="number"
              id="default_price"
              v-model="models.Professor.alumno.default_price"
            />
          </div>

          <div class="inline no-button">
            <label for="default_extra">default_extra:</label>
            <input
              type="number"
              id="default_extra"
              v-model="models.Professor.alumno.default_extra"
            />
          </div>

          <button @click="add(models.Professor.alumno, 'Alumno')" type="submit">
            Add Alumno
          </button>
        </div>
      </div>
    </div>

    <div
      class="msg_bg"
      :class="[toggle.addPayment ? 'visible' : 'hidden']"
      @click.self="toggle.addPayment = false"
    >
      <div class="wrap popup">
        <h2>Nuovo PAgamento</h2>
        <p>Aggiungi un nuovo pagamento</p>
        <div>
          <div class="inline no-button">
            <label for="AlumnoNamePayment">Alunno:</label>
            <select
              id="AlumnoNamePayment"
              name="AlumnoNamePayment"
              required
              v-model.number="models.Professor.payment.id_alumno"
            >
              <option
                v-for="(alumno, index) in dati.Professor.alumni_list"
                :key="index"
                :value="alumno.id_alumno"
              >
                ({{ alumno.owner }}) - {{ alumno.name }} {{ alumno.surname }}
              </option>
            </select>
          </div>

          <div>
            <label for="date">Date:</label>
            <input
              type="date"
              id="date"
              v-model="models.Professor.payment.date"
            />
          </div>

          <div>
            <label for="amount">amount:</label>
            <input
              type="number"
              id="amount"
              v-model.number="models.Professor.payment.amount"
            />
          </div>

          <div>
            <label for="location">location:</label>
            <input
              type="text"
              id="location"
              v-model="models.Professor.payment.location"
            />
          </div>

          <div class="inline no-button">
            <label for="payment_type">typpayment_typee:</label>
            <select
              id="payment_type"
              name="payment_type"
              v-model="models.Professor.payment.payment_type"
            >
              <option
                v-for="(payment_type, index) in dati.Professor
                  .payment_type_list"
                :key="index"
                :value="payment_type"
              >
                {{ payment_type }}
              </option>
            </select>
          </div>

          <button
            @click="add(models.Professor.payment, 'Payment')"
            type="submit"
          >
            Add Payment
          </button>
        </div>
      </div>
    </div>
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
            lesson: {
              id_alumni: [],
              date: new Date().toISOString().split('T')[0],
              subjects: [],
              arguments: '',
              minutes: 0,
              price_per_hour: 0,
              extra: 0,
            },
            alumno: {
              id_auth_professors: [],
              name: '',
              surname: '',
              email: '',
              default_subjects: ['Matematica', 'Fisica', 'Informatica'],
              default_price: 15,
              default_extra: 5,
            },
            payment: {
              id_alumno: null,
              date: new Date().toISOString().split('T')[0],
              amount: 0,
              location: '',
              payment_type: ['Contanti', 'Bonifico'],
            },
          },
        },

        subject_list: ['Matematica', 'Fisica', 'Informatica'],

        dati: {
          Alumno: {
            id: null,
            dashboard: [],
          },
          Professor: {
            id: null,
            dashboard: [],
            alumni_list: [],
            professor_list: [],
            subject_list: [],
            payment_type_list: [],
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
      loginProfessor(dumpType = 'limited') {
        if (this.$store.state.user.id == null) {
          this.$store.commit('toggle_show', 'login')
        } else {
          sendRequest(
            {
              action: 'ProfessorGetDashBoard',
              data: JSON.stringify({
                dumpType: dumpType,
              }),
            },
            '/PLM/Main.php'
          )
            .then((res) => {
              this.dati.Professor = res.Data
            })
            .catch((res) => this.$store.commit('auth_error', res.Log))
        }
      },

      loginAlumno(dumpType = 'limited') {
        sendRequest(
          {
            action: 'AlumnoLogin',
            data: JSON.stringify({
              entry_password: this.models.Alumno.entry_password,
              dumpType: dumpType,
            }),
          },
          '/PLM/Main.php'
        )
          .then((res) => {
            this.dati.Alumno = res.Data
          })
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
          professor_list: [],
          subject_list: [],
          payment_type_list: [],
        }
      },

      add(models, type) {
        let payload = {}

        for (let [key, value] of Object.entries(models)) {
          payload[key] = value
        }

        sendRequest(
          {
            action: 'Add',
            data: JSON.stringify({
              type: type,
              ...payload,
            }),
          },
          '/PLM/Main.php'
        )
          .then((res) => {
            this.toggle.addAlumno = false
            this.toggle.addLesson = false
            this.toggle.addPayment = false
            this.loginProfessor()
          })
          .catch((res) => this.$store.commit('auth_error', res.Log))
      },

      Modify(id, tabs) {
        var payload = {}
        tabs.forEach((element) => {
          let input = document.getElementById(id + '.' + element)
          if (input) {
            payload[element] = input.value
          } else {
            return
          }
        })

        sendRequest(
          {
            action: 'Modify',
            data: JSON.stringify({
              nameTable: id.split('.')[0],
              id: id.split('.')[1],
              ...payload,
            }),
          },
          '/PLM/Main.php'
        )
          .then((res) => {
            this.loginProfessor()
            // this.loginAlumno()
          })
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
          .then((res) => {
            this.loginProfessor()
            // this.loginAlumno()
          })
          .catch((res) => this.$store.commit('auth_error', res.Log))
      },

      alumnoSelected() {
        if (
          this.models.Professor.lesson.id_alumni.length == 1 &&
          this.dati.Professor.alumni_list.length > 0
        ) {
          map(this.dati.Professor.alumni_list, (alumno) => {
            if (alumno.id_alumno == this.models.Professor.lesson.id_alumni[0]) {
              this.subject_list = alumno.default_subjects
              this.models.Professor.lesson.price_per_hour = alumno.default_price
              this.models.Professor.lesson.extra = alumno.default_extra
            }
          })
        } else {
          this.subject_list = []
          this.models.Professor.lesson.price_per_hour = 0
          this.models.Professor.lesson.extra = 0
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
