<template>
  <div>
    <div class="wrap Portale Tabellone_torneo">
    <h1>Tabellone_torneo</h1>
      <h2>
        Torneo selezionato:
        <select @change="TorneoSelezionato()" id="NomeTorneo">
          <option value="" disabled selected hidden>Seleziona un torneo</option>
          <option
            v-for="(torneo, index) in tornei"
            :key="index"
            :value="torneo.id_torneo"
          >
            {{ torneo.nome_torneo }}
          </option>
        </select>
      </h2>
      <cMenuScelta @toParent="handler" :tags="tags_array" />
      <div class="">
        <div class="box mb" v-show="tags_to_view.includes(tags_array[0])">
          <h2>Creare un torneo:</h2>
          <ul>
            <li>
              <div class="inline">
                <label> Loggarsi nel sistema tramite apposita schermata </label
                ><button @click="toggle_login = true">Area personale</button>
              </div>
            </li>
            <li>
              <div class="inline">
                <label> Inserire il nome del nuovo Torneo </label
                ><input type="text" id="nome_torneo_scelto" />
              </div>
            </li>
            <li>
              <div class="inline">
                <label> Creare il Torneo</label>
                <button @click="create()">Crea il torneo</button>
              </div>
            </li>
          </ul>
          <!-- <p>
            Si è allora pronti a gestire il proprio torneo.
            <br>Non sarà possibile modificare il tabellone manualmente.
          </p>         -->

          <!-- <h2>Visualizzare un torneo già creato:</h2>
          <p>
            Scegliere dall'elenco il nome del torneo da voler visualizzare.
          </p> -->
        </div>

        <div class="box mb" v-show="tags_to_view.includes(tags_array[1])">
          <h2>Tabellone</h2>

          <div v-if="show_setup()">
            <button @click="setuptabellone()">Genera tabellone</button>
          </div>

          <div class="row" v-if="torneo.squadre != []">
            <div
              v-for="(fase, index_fase) in torneo.tabellone"
              :key="index_fase"
            >
              <h3>{{ index_fase }}</h3>
              <div class="column">
                <div
                  v-for="(partita, index_partita) in fase"
                  :key="index_partita"
                  class="container"
                >
                  <div
                    class="incontro"
                    @click="incontro_selezionato.fill_obj(partita)"
                  >
                    <p
                      :class="
                        (partita.Squadra_1 || 'Non definito') ==
                        partita.Squadra_Vincitrice
                          ? 'winner'
                          : ''
                      "
                    >
                      {{ partita.nome_Squadra_1 || 'Non definito' }}
                    </p>
                    <hr />
                    <p
                      :class="
                        (partita.Squadra_2 || 'Non definito') ==
                        partita.Squadra_Vincitrice
                          ? 'winner'
                          : ''
                      "
                    >
                      {{ partita.nome_Squadra_2 || 'Non definito' }}
                    </p>
                  </div>
                  <p class="result" v-if="partita.Squadra_Vincitrice">
                    {{ partita.Punteggio }}
                  </p>
                </div>
              </div>
            </div>

            <div
              v-show="incontro_selezionato.state && show_setup()"
              class="msg_bg"
              @click.self="incontro_selezionato.state = false"
            >
              <div class="wrap popup">
                <h2>Modifica lo stato dell'incontro</h2>
                <p>
                  Solo il creatore del torneo ha accesso a questa schermata.<br />
                  Aggiorna lo stato della partita selezionata inserendo i dati
                  richiesti e clicca su invia
                </p>
                <form
                  id="result_incontro"
                  onSubmit="return false;"
                  @submit="agg()"
                >
                  <div>
                    <label for="winner_sq">Squadra vincitrice</label>
                    <select name="winner" id="winner_sq" required>
                      <option value="" disabled selected hidden>Seleziona una squadra</option>
                      <option :value="incontro_selezionato.id_squadra_1">
                        {{ incontro_selezionato.nome_squadra_1 }}
                      </option>
                      <option :value="incontro_selezionato.id_squadra_2">
                        {{ incontro_selezionato.nome_squadra_2 }}
                      </option>
                    </select>
                  </div>
                  <div>
                    <label for="result">Inserisci il risultato</label>
                    <input
                      type="text"
                      name="risultato"
                      id="result"
                      required
                    />
                  </div>

                  <button type="submit" @click="agg()">
                    Aggiorna la partita
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div
          class="box"
          v-show="tags_to_view.includes(tags_array[2])"
          style="flex: 1 1 300px"
        >
          <h2>Squadre</h2>
          <div v-if="show_setup()">
            <p>
              Controlla qui i dati relativi alle squadre del tuo torneo
              attraverso una delle seguenti modalità:
            </p>
            <ul>
              <li>Carica un file formato .CSV;</li>
              <li>
                Aggiungi altre squadre al tuo torneo inserendole manualmente;
              </li>
              <li>Oppure modifica i dati di una squadra già esistente.</li>
            </ul>
            <!-- <form
              onSubmit="return false;"
              @submit="uploadData()"
              enctype="multipart/form-data"
            > -->
            <label for="file">
              File ".CSV", ogni riga deve contenere:
              Nome_Squadra,Nome_Capitano,Nome_Compagno
            </label>
            <input type="file" name="file" id="csv_id" />
            <button type="submit" @click="uploadData()">Importa i dati</button>
            <!-- <input type="submit" value="IMPORT" /> -->
            <!-- </form> -->
          </div>
          <table>
            <thead>
              <tr>
                <th>Nome_Squadra</th>
                <th>Capitano</th>
                <th>Compagno</th>
                <!-- <th>Partite_giocate</th>
                <th>Percentale_Vincite</th>
                <th v-if="show_setup()">Modifca squadra</th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="(squadra, index) in torneo.squadre" :key="index">
                <td>{{ squadra.Nome_Squadra }}</td>
                <td>{{ squadra.Capitano }}</td>
                <td>{{ squadra.Compagno }}</td>
                <!-- <td>{{ squadra.Partite_giocate }}</td>
                <td>{{ squadra.Percentuale_Vincite }}%</td> 
                <td v-if="show_setup()">
                  <button>Clicca per modifcare</button>
                </td>-->
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sendRequest from '@/assets/js/sendRequest.js'

export default {
  data() {
    return {
      tags_array: ['Crea Torneo', 'Tabellone', 'Squadre'],
      tags_to_view: [],
      toggle_login: false,

      interval: null,

      tornei: [],
      torneo: {
        id: undefined,
        creator: 'Bocchio01',
        name: undefined,
        squadre: [],
        tabellone: [],
      },
      incontro_selezionato: {
        state: false,
        fill_obj: function (partita) {
          this.id_partita = partita.id_Partita
          this.num_partita = partita.Numero_Sfida
          this.id_squadra_1 = partita.Squadra_1
          this.id_squadra_2 = partita.Squadra_2
          this.nome_squadra_1 = partita.nome_Squadra_1
          this.nome_squadra_2 = partita.nome_Squadra_2
          this.state = true
        },
      },
      // squadra_selezionata: {
      //   state: false,
      //   fill_obj: function (params) {

      //   }

      // }
    }
  },
  created() {
    this.request_tornei()
    this.interval = setInterval(() => {
      this.TorneoSelezionato()
    }, 60000)
  },

  beforeDestroy() {
    clearInterval(this.interval)
  },

  methods: {

    request_tornei() {
      sendRequest({
        action: 'request_data',
        table: 'CalcioBalilla_Tornei',
        nickname: this.$store.state.user.nickname,
      }).then((res) => (this.tornei = res))
    },

    modifiy_result(sq1, sq2, num_partita) {
      if (this.show_setup()) {
        this.incontro_selezionato.fill_obj(sq1, sq2, num_partita)
      }
    },
    agg() {
      sendRequest({
        action: 'set_result',
        winner: document.getElementById('winner_sq').value,
        punteggio: document.getElementById('result').value,
        id_partita: this.incontro_selezionato.id_partita,
        num_partita: this.incontro_selezionato.num_partita,
      }).then((res) => (console.log(res), this.TorneoSelezionato()))
    },
    setuptabellone() {
      sendRequest({
        action: 'create_tabellone',
        id_torneo: this.torneo.id,
      }).then((res) => (console.log(res), this.TorneoSelezionato()))
    },

    show_setup() {
      return this.$store.state.user.nickname == this.torneo.creator
    },
    handler(value) {
      this.tags_to_view = value
    },
    handler2(value) {
      this.console_to_view = value
    },
    handler_login() {
      this.toggle_login = false
    },

    create() {
      sendRequest({
        action: 'create_torneo',
        nome_torneo: document.getElementById('nome_torneo_scelto').value,
        nickname: this.$store.state.user.nickname,
      }).then((res) => (console.log(res), this.request_tornei()))
    },

    uploadData() {
      sendRequest({
        action: 'upload_data',
        id_torneo: this.torneo.id,
        nickname: this.$store.state.user.nickname,
        file: document.getElementById('csv_id').files[0],
      }).then((res) => (console.log(res), this.TorneoSelezionato()))
    },

    TorneoSelezionato() {
      var result = this.tornei.find((obj) => {
        return obj.id_torneo == document.getElementById('NomeTorneo').value
      })

      this.torneo.id = result.id_torneo
      this.torneo.creator = result.Creatore
      this.torneo.name = result.nome_torneo

      sendRequest({
        action: 'request_data',
        table: 'CalcioBalilla_Squadre',
        id: this.torneo.id,
      }).then((res) => (this.torneo.squadre = res))

      sendRequest({
        action: 'request_data',
        table: 'CalcioBalilla_Tabellone',
        id: this.torneo.id,
      }).then(
        (res) =>
          (this.torneo.tabellone = res.reduce(function (r, a) {
            r[a.Fase] = r[a.Fase] || []
            r[a.Fase].push(a)
            return r
          }, Object.create(null)))
      )
    },
  },
}
</script>

<style lang="scss">
.setresult {
  display: block;
  > input {
    margin: 0;
  }
  margin-block: auto;
}

.row {
  display: flex;
  /* height: 70vh; */
  padding-inline: 5%;
  column-gap: 5%;
  row-gap: 5%;
  overflow: auto;
  justify-content: flex-start;
}

.column {
  width: 25%;
  min-width: fit-content;
  height: 95%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.incontro {
  min-width: 200px;
  width: 20%;
  border: 2px solid black;
  padding: 10px;
  border-radius: 10px;
}

.incontro p {
  padding: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.winner {
  border-radius: 5px;
  font-weight: bold;
  // background-color: #15ff009c;
  background-color: var(--main_color);
}

.container {
  display: flex;
  font-size: 1.5em;
  margin-block: 30px;
  column-gap: 10px;
}

.result {
  margin-block: auto;
  margin-inline: 10px;
  min-width: fit-content;
}

// div.inline {
//   margin-block: 10px;
//   display: flex;
//   align-items: center;
//   flex-wrap: wrap;
//   column-gap: 10px;
//   row-gap: 10px;
//   > label {
//     width: 50%;
//     min-width: fit-content;
//     font-size: var(--paragraph_size);
//   }
//   > button,
//   input {
//     margin-left: 0;
//     margin-block: 0px;
//   }
// }

// .mb {
//   margin-bottom: var(--app_row_column_gap);
// }
</style>