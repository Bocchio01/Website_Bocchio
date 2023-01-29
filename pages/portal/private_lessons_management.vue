<i18n>
{
  "it": {
    "tags_array": ["Per alunni", "Per professori"],

    "alumni_head": {
      "login": {
        "h2": "Login Alumno",
        "p": "Effettua il login usando la password che ti è stata fornita per accedere alla tua pagina personale.",
        "label": "Password",
        "button": "Accedi"
      },
      "logged": {
        "h2": "Pagina personale per alumni",
        "p": [
          "Di seguito trovi tutti i tuoi dati relativi alle lezioni fatte, i pagamenti e alcune statistiche magari interessanti.",
          "Se noti qualcosa di strano o qualche dato mancate fammelo sapere via WhatsApp che provvederò a sistemare e correggere.",
          "Di default vengono visualizzati qui solo gli ultimi 20 record di ogni tabella. Per visualizzare i dati completi, clicca qui.",
          "Per chiudere il database, effettua il logout."
        ],
        "button": ["Visualizza tutti i dati", "Logout"]
      }
    },

    "professors_head": {
      "login": {
        "h2": "Login Professore",
        "p": "Se sei un professore, effettua il login per gestire i tuoi alunni.",
        "button": "Accedi"
      },
      "logged": {
        "h2": "Pagina personale per professori",
        "p": [
          "Utilizzza i seguenti pulsanti per aggiungere nuovi record al database.",
          "Per modifcare o eliminare record già presenti nel database entra in modalità SUDO cliccando sulla tabella interessata e successivamete sul record interessato.",
          "Di default vengono visualizzati qui solo gli ultimi 20 record di ogni tabella. Per visualizzare i dati completi, clicca qui.",
          "Per chiudere il database, effettua il logout."
        ],
        "button": [
          "Aggiungi una nuova lezione",
          "Aggiungi un nuovo pagamento",
          "Aggiungi un nuovo alunno",
          "Visualizza tutti i dati",
          "Logout"
        ]
      }
    },

    "forms": {
      "lesson": {
        "h2": "Aggiungi una nuova lezione",
        "p": "Compila il form per aggiungere una nuova lezione al database.",
        "label": {
          "student": "Alumno/i",
          "date": "Data",
          "subject": "Materia",
          "arguments": "Argomenti",
          "duration": "Durata [minuti]",
          "price": "Prezzo all'ora [€]",
          "extra": "Extra [€]"
        },
        "button": "Aggiungi la lezione"
      },

      "payment": {
        "h2": "Aggiungi un nuovo pagamento",
        "p": "Compila il form per aggiungere un nuovo pagamento al database.",
        "label": {
          "student": "Alumno",
          "date": "Data",
          "location": "Luogo",
          "amount": "Importo [€]",
          "method": "Metodo di pagamento"
        },
        "button": "Aggiungi il pagamento"
      },

      "alumno": {
        "h2": "Aggiungi un nuovo alunno",
        "p": "Compila il form per aggiungere un nuovo alunno al database.",
        "label": {
          "auth_professor": "Professori autorizzati",
          "name": "Nome",
          "surname": "Cognome",
          "email": "Email",
          "phone": "Telefono",
          "subject": "Materie",
          "price": "Prezzo all'ora [€]",
          "extra": "Extra [€]"
        },
        "button": "Aggiungi"
      }
    }
  },

  "en": {
    "tags_array": ["For alumni", "For professors"],

    "alumni_head": {
      "login": {
        "h2": "Alumni login",
        "p": "Log in using the password provided to you to access your personal page.",
        "label": "Password",
        "button": "Login"
      },
      "logged": {
        "h2": "Personal page for alumni",
        "p": [
          "Below you will find all your data on lessons taken, payments and some possibly interesting statistics.",
          "If you notice anything strange or any missing data let me know via WhatsApp and I will fix and correct it.",
          "By default only the last 20 records of each table are displayed here. To view the complete data, click here.",
          "To close the database, log out."
        ],
        "button": ["View all data", "Logout"]
      }
    },

    "professors_head": {
      "login": {
        "h2": "Login Professor",
        "p": "If you are a professor, please login to manage your pupils.",
        "button": "Login"
      },
      "logged": {
        "h2": "Personal page for professors",
        "p": [
          "Use the following buttons to add new records to the database.",
          "To edit or delete records already in the database enter the SUDO mode by clicking on the relevant table and then on the relevant record.",
          "By default, only the last 20 records of each table are displayed here. To view the complete data, click here.",
          "To close the database, log out."
        ],
        "button": [
          "Add a new lesson",
          "Add a new payment",
          "Add a new pupil",
          "Display all data",
          "Logout"
        ]
      }
    },

    "forms": {
      "lesson": {
        "h2": "Add a new lesson",
        "p": "Fill in the form to add a new lesson to the database.",
        "label": {
          "student": "Alumnus(s)",
          "date": "Date",
          "subject": "Subject",
          "arguments": "Topics",
          "duration": "Duration [minutes]",
          "price": "Price per hour [€]",
          "extra": "Extra [€]"
        },
        "button": "Add lesson"
      },

      "payment": {
        "h2": "Add new payment",
        "p": "Fill in the form to add a new payment to the database.",
        "label": {
          "student": "Alumnus",
          "date": "Date",
          "location": "Place",
          "amount": "Amount [€]",
          "method": "Payment method"
        },
        "button": "Add payment"
      },

      "alumno": {
        "h2": "Add new alumnus",
        "p": "Fill in the form to add a new alumnus to the database.",
        "label": {
          "auth_professor": "Authorised professors",
          "name": "Name",
          "surname": "Surname",
          "email": "Email",
          "phone": "Phone",
          "subject": "Subject",
          "price": "Price per hour [€]",
          "extra": "Extra [€]"
        },
        "button": "Add"
      }
    }
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
        <h2>{{ $t('alumni_head.login.h2') }}</h2>
        <p>{{ $t('alumni_head.login.p') }}</p>
        <div>
          <label for="PLM_alumni_password"
            >{{ $t('alumni_head.login.label') }}:</label
          >
          <input
            type="text"
            name="PLM_alumni_password"
            id="PLM_alumni_password"
            required
            v-model="models.Alumno.entry_password"
          />
          <button @click="getDashBoardAlumni()" type="submit">
            {{ $t('alumni_head.login.button') }}
          </button>
        </div>
      </div>

      <div v-else class="wrap popup">
        <h2>{{ $t('alumni_head.logged.h2') }}</h2>
        <p>{{ $t('alumni_head.logged.p.0') }}</p>
        <p>{{ $t('alumni_head.logged.p.1') }}</p>
        <br />
        <p><b>Tommaso</b></p>

        <br />
        <p>{{ $t('alumni_head.logged.p.2') }}</p>
        <button @click="getDashBoardAlumni('complete')" type="submit">
          {{ $t('alumni_head.logged.button.0') }}
        </button>

        <br />
        <p>{{ $t('alumni_head.logged.p.3') }}</p>
        <button @click="exitAlumno()" type="submit">
          {{ $t('alumni_head.logged.button.1') }}
        </button>
      </div>

      <hr />

      <cDashBoard
        @modifyRecord="modifyRecord"
        @deleteRecord="deleteRecord"
        :data="dati.Alumno.dashboard"
        :SUDO="!!dati.Professor.id"
      ></cDashBoard>
    </div>

    <div v-show="tags_to_view[1]">
      <div v-if="!dati.Professor.id" class="wrap popup">
        <h2>{{ $t('professors_head.login.h2') }}</h2>
        <p>{{ $t('professors_head.login.p') }}</p>
        <button @click="getDashBoardProfessor()" type="submit">
          {{ $t('professors_head.login.button') }}
        </button>
      </div>

      <div v-else class="wrap popup">
        <h2>{{ $t('professors_head.logged.h2') }}</h2>
        <p>{{ $t('professors_head.logged.p.0') }}</p>
        <button type="submit" @click="toggle.addLesson = true">
          {{ $t('professors_head.logged.button.0') }}
        </button>
        <button type="submit" @click="toggle.addPayment = true">
          {{ $t('professors_head.logged.button.1') }}
        </button>
        <button type="submit" @click="toggle.addAlumno = true">
          {{ $t('professors_head.logged.button.2') }}
        </button>

        <br />
        <p>{{ $t('professors_head.logged.p.1') }}</p>

        <br />
        <p>{{ $t('professors_head.logged.p.2') }}</p>
        <button @click="getDashBoardProfessor('complete')" type="submit">
          {{ $t('professors_head.logged.button.3') }}
        </button>

        <br />
        <p>{{ $t('professors_head.logged.p.3') }}</p>
        <button @click="exitProfessor()" type="submit">
          {{ $t('professors_head.logged.button.4') }}
        </button>
      </div>

      <hr />

      <cDashBoard
        @modifyRecord="modifyRecord"
        @deleteRecord="deleteRecord"
        :data="dati.Professor.dashboard"
        :SUDO="!!dati.Professor.id"
      ></cDashBoard>
    </div>

    <div
      class="msg_bg"
      :class="[toggle.addLesson ? 'visible' : 'hidden']"
      @click.self="toggle.addLesson = false"
    >
      <div class="wrap popup">
        <h2>{{ $t('forms.lesson.h2') }}</h2>
        <p>{{ $t('forms.lesson.p') }}</p>
        <div>
          <div>
            <label for="AlumnoName"
              >{{ $t('forms.lesson.label.student') }}:</label
            >
            <select
              @change="alumnoSelected()"
              id="AlumnoName"
              name="AlumnoName[]"
              multiple
              required
              v-model="models.Professor.lesson.id_alumni"
              style="width: 100%; height: 20ch"
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
            <label for="date">{{ $t('forms.lesson.label.date') }}:</label>
            <input
              type="date"
              id="date"
              v-model="models.Professor.lesson.date"
            />
          </div>

          <div>
            <label for="Subjects"
              >{{ $t('forms.lesson.label.subject') }}:</label
            >
            <select
              id="Subjects"
              name="Subjects[]"
              multiple
              v-model="models.Professor.lesson.subjects"
              style="width: 100%"
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
            <label for="arguments"
              >{{ $t('forms.lesson.label.arguments') }}:</label
            >
            <input
              type="text"
              id="arguments"
              v-model="models.Professor.lesson.arguments"
            />
          </div>

          <div style="display: flex; flex-wrap: wrap">
            <div>
              <label for="minutes"
                >{{ $t('forms.lesson.label.duration') }}:</label
              >
              <input
                type="number"
                id="minutes"
                v-model="models.Professor.lesson.minutes"
              />
            </div>

            <div>
              <label for="price_per_hour"
                >{{ $t('forms.lesson.label.price') }}:</label
              >
              <input
                type="number"
                id="price_per_hour"
                v-model="models.Professor.lesson.price_per_hour"
              />
            </div>

            <div>
              <label for="extra">{{ $t('forms.lesson.label.extra') }}:</label>
              <input
                type="number"
                id="extra"
                v-model="models.Professor.lesson.extra"
              />
            </div>
          </div>

          <button
            @click="addRecord(models.Professor.lesson, 'Lesson')"
            type="submit"
          >
            {{ $t('forms.lesson.button') }}
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
        <h2>{{ $t('forms.payment.h2') }}</h2>
        <p>{{ $t('forms.payment.p') }}</p>
        <div>
          <div>
            <label for="AlumnoNamePayment"
              >{{ $t('forms.payment.label.student') }}:</label
            >
            <select
              id="AlumnoNamePayment"
              name="AlumnoNamePayment"
              required
              v-model.number="models.Professor.payment.id_alumno"
              style="width: 100%"
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
            <label for="date">{{ $t('forms.payment.label.date') }}:</label>
            <input
              type="date"
              id="date"
              v-model="models.Professor.payment.date"
            />
          </div>

          <div>
            <label for="location"
              >{{ $t('forms.payment.label.location') }}:</label
            >
            <input
              type="text"
              id="location"
              v-model="models.Professor.payment.location"
            />
          </div>

          <div>
            <label for="payment_type"
              >{{ $t('forms.payment.label.method') }}:</label
            >
            <select
              id="payment_type"
              name="payment_type"
              v-model="models.Professor.payment.payment_type"
              style="width: 100%"
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

          <div>
            <label for="amount">{{ $t('forms.payment.label.amount') }}:</label>
            <input
              type="number"
              id="amount"
              v-model.number="models.Professor.payment.amount"
            />
          </div>

          <button
            @click="addRecord(models.Professor.payment, 'Payment')"
            type="submit"
          >
            {{ $t('forms.payment.button') }}
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
        <h2>{{ $t('forms.alumno.h2') }}</h2>
        <p>{{ $t('forms.alumno.p') }}</p>
        <div>
          <div>
            <label for="id_auth_professors"
              >{{ $t('forms.alumno.label.auth_professor') }}:</label
            >
            <select
              id="id_auth_professors"
              name="id_auth_professors[]"
              multiple
              v-model.number="models.Professor.alumno.id_auth_professors"
              style="width: 100%; height: 10ch"
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
            <label for="name">{{ $t('forms.alumno.label.name') }}:</label>
            <input
              type="text"
              id="name"
              v-model="models.Professor.alumno.name"
            />
          </div>

          <div>
            <label for="Surname">{{ $t('forms.alumno.label.surname') }}:</label>
            <input
              type="text"
              id="Surname"
              v-model="models.Professor.alumno.surname"
            />
          </div>

          <div>
            <label for="portalEmail"
              >{{ $t('forms.alumno.label.email') }}:</label
            >
            <input
              type="text"
              id="portalEmail"
              v-model="models.Professor.alumno.email"
            />
          </div>

          <div>
            <label for="default_subjects"
              >{{ $t('forms.alumno.label.subject') }}:</label
            >
            <select
              id="default_subjects"
              name="default_subjects[]"
              multiple
              v-model="models.Professor.alumno.default_subjects"
              style="width: 100%"
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

          <div style="display: flex; flex-wrap: wrap">
            <div>
              <label for="default_price"
                >{{ $t('forms.alumno.label.price') }}:</label
              >
              <input
                type="number"
                id="default_price"
                v-model="models.Professor.alumno.default_price"
              />
            </div>

            <div>
              <label for="default_extra"
                >{{ $t('forms.alumno.label.extra') }}:</label
              >
              <input
                type="number"
                id="default_extra"
                v-model="models.Professor.alumno.default_extra"
              />
            </div>
          </div>

          <button
            @click="addRecord(models.Professor.alumno, 'Alumno')"
            type="submit"
          >
            {{ $t('forms.alumno.button') }}
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
              default_subjects: [],
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
      getDashBoardProfessor(dumpType = 'limited') {
        if (this.$store.state.user.id == null) {
          this.$store.commit('toggle_show', 'login')
        } else {
          sendRequest(
            {
              action: 'get',
              data: JSON.stringify({
                dumpType: dumpType,
                type: 'ProfessorDashBoard',
              }),
            },
            '/PLM/Main.php'
          )
            .then((res) => {
              this.dati.Professor = res.Data
            })
            .catch((res) => alert(res.Log.slice(-1)))
        }
      },

      getDashBoardAlumni(dumpType = 'limited') {
        sendRequest(
          {
            action: 'get',
            data: JSON.stringify({
              entry_password: this.models.Alumno.entry_password,
              dumpType: dumpType,
              type: 'AlumnoDashBoard',
            }),
          },
          '/PLM/Main.php'
        )
          .then((res) => {
            this.dati.Alumno = res.Data
          })
          .catch((res) => alert(res.Log.slice(-1)))
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

      addRecord(models, type) {
        let payload = {}

        for (let [key, value] of Object.entries(models)) {
          payload[key] = value
        }

        sendRequest(
          {
            action: 'add',
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
            this.getDashBoardProfessor()
          })
          .catch((res) => alert(res.Log.slice(-1)))
      },

      modifyRecord(id, tabs) {
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
            action: 'update',
            data: JSON.stringify({
              nameTable: id.split('.')[0],
              id: id.split('.')[1],
              ...payload,
            }),
          },
          '/PLM/Main.php'
        )
          .then((res) => {
            this.getDashBoardProfessor()
            if (this.models.Alumno.entry_password != '')
              this.getDashBoardAlumni()
          })
          .catch((res) => alert(res.Log.slice(-1)))
      },

      deleteRecord(id) {
        sendRequest(
          {
            action: 'delete',
            data: JSON.stringify({
              nameTable: id.split('.')[0],
              id: id.split('.')[1],
            }),
          },
          '/PLM/Main.php'
        )
          .then((res) => {
            this.getDashBoardProfessor()
            if (this.models.Alumno.entry_password != '')
              this.getDashBoardAlumni()
          })
          .catch((res) => alert(res.Log.slice(-1)))
      },

      alumnoSelected() {
        if (
          this.models.Professor.lesson.id_alumni.length == 1 &&
          this.dati.Professor.alumni_list.length > 0
        ) {
          map(this.dati.Professor.alumni_list, (alumno) => {
            if (alumno.id_alumno == this.models.Professor.lesson.id_alumni[0]) {
              this.models.Professor.lesson.price_per_hour = alumno.default_price
              this.models.Professor.lesson.extra = alumno.default_extra
            }
          })
        } else {
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
          this.getDashBoardProfessor()
        },
      },
    },
  }
</script>

<style lang="scss">
  .Private_Lessons_Management {
    hr {
      width: 80%;
      margin-inline: auto;
      margin-block: 20px;
    }
  }
</style>
