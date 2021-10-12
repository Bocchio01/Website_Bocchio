<template>
  <div class="wrap portal">
    <CMenuScelta @toParent="handler" :tags="tags_array" />
    <div v-show="tags_to_view.includes(tags_array[0])">
      <h2>Istruzioni</h2>
      <div>
        <p>Questo script ti permetterà di calcolare con facilità l'azimut e la
        distanza tra due punti del mondo.</p>
        <br />
        <p><strong>Comandi disponibili:</strong></p>
        <ul>
          <li>
            Ricerca -> Lente di ingrandimento in alto a destra sulla mappa
          </li>
          <li>Selezione -> Click sulla mappa</li>
          <li>Modifica -> Trascinamento del punto sulla mappa</li>
          <li>Eliminazione -> Doppio click del punto sulla mappa</li>
        </ul>
        <br />
        <p>Con il tasto <span>&#8597;</span> è possibile invertire le coordinate di
        partenza con quelle di arrivo.</p>
        <p>Il punto di partenza è segnato in verde, mentre quello di arrivo in
        rosso.</p>
      </div>
    <div class="o_separator"></div>
    </div>
    <main>

    <div v-show="tags_to_view.includes(tags_array[1])">
      <h2>Dati in input</h2>
      <p>Inserisci di seguito le coordinate o clicca sulla mappa:</p>

      <table>
        <tbody>
          <tr v-for="(type, index) in ['partenza', 'arrivo']" :key="index">
            <td>
              <img
                style="height: 25px"
                :src="data[type].IconUrl"
                @click="focusOn(data[type])"
              />
            </td>
            <td>
              <input
                v-model="data[type].coord_to_show"
                placeholder="Nessun punto selezionato"
                type="text"
                @change="update(data[type])"
              />
            </td>
            <td>
              <span @click="clean(data[type])">🗑️</span>
            </td>
            <td rowspan="2" v-if="type == 'partenza'">
              <span @click="inverti()">&#8597;</span>
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Dati in output</h2>
      <p>Visualizza qui i risultati:</p>
      <table>
        <caption>
          Indicazioni reali
        </caption>
        <tbody>
          <tr>
            <td colspan="2">
              <div class="compass-bg">
                <img
                  class="compass-pointer"
                  src="http://vasilis-tsirimokos.com/codepen/compass-pointer.png"
                  :style="
                    'transform: rotate(' +
                    (parseInt(risultati.azimut) + 45) +
                    'deg);'
                  "
                />
              </div>
            </td>
          </tr>
          <tr>
            <td id="compass">Azimut: {{ risultati.azimut }} °</td>
            <td id="compass_dist">Distanza: {{ risultati.distanza }} km</td>
          </tr>
        </tbody>
      </table>

      <table>
        <caption>
          Tunnel
        </caption>
        <tbody>
          <tr>
            <td colspan="2">
              <div class="tunnel-bg">
                <img
                  class="tunnel-pointer"
                  src="https://res.cloudinary.com/bocchio/image/upload/v1633648333/Portali/Around_the_globe/Tunnel_main.png"
                  :style="
                    'transform: rotate(' +
                    (parseInt(risultati.inclinazione) - 45) +
                    'deg);'
                  "
                />
              </div>
            </td>
          </tr>
          <tr>
            <td id="tunnel">Inclinazione: {{ risultati.inclinazione }} °</td>
            <td id="tunnel_dist">Lunghezza: {{ risultati.lunghezza }} km</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="map_container" v-show="tags_to_view.includes(tags_array[2])">
      <h2>Mappa</h2>

      <div id="map"></div>
    </div>
    </main>
  </div>
</template>

<script>
import { Around_the_globe } from '@/assets/js/Around_the_globe.js'

export default {
  data() {
    return {
      tags_array: ['Guida', 'Dati', 'Mappa'],
      tags_to_view: [],
      data: Around_the_globe.dati,
      risultati: Around_the_globe.result,
    }
  },
  head() {
    return {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css',
        },
        {
          rel: 'stylesheet',
          href: 'https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.css',
        },
      ],
      script: [
        {
          hid: 'stripe',
          src: 'https://unpkg.com/mathjs@9.4.4/lib/browser/math.js',
          defer: true,
        },
        {
          hid: 'stripe',
          src: 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js',
          defer: true,
        },
        {
          hid: 'stripe',
          src: 'https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js',
          defer: true,
        },
        {
          hid: 'stripe',
          src: 'https://cdn.jsdelivr.net/npm/leaflet.geodesic',
          defer: true,
        },
      ],
    }
  },
  mounted() {
    try {
      Around_the_globe.loadMap()
    } catch (error) {
      location.reload()
    }
  },
  methods: {
    handler(value) {
      this.tags_to_view = value
    },
    clean(el) {
      Around_the_globe.clean(el)
    },
    focusOn(el) {
      Around_the_globe.focusOn(el)
    },
    update(el) {
      Around_the_globe.update(el)
    },
    inverti() {
      Around_the_globe.inverti()
    },
  },
  beforeDestroy() {
    Around_the_globe.clean(this.data.partenza)
    Around_the_globe.clean(this.data.arrivo)
  },
}
</script>

<style >
.map_container {
  width: 100%;
  max-width: 900px;
}
.portal span,
td img {
  cursor: pointer;
}
.compass-bg {
  width: 150px;
  height: 150px;
  background-size: 150px;
  background-image: url('https://vasilis-tsirimokos.com/codepen/compass-bg.png');
  margin-inline: auto;
}
.tunnel-bg {
  width: 150px;
  height: 150px;
  background-size: 150px;
  background-image: url('https://res.cloudinary.com/bocchio/image/upload/v1633647876/Portali/Around_the_globe/Tunnel_sfondo.jpg');
  margin-inline: auto;
}

.compass-pointer {
  transform: rotate(45deg);
  width: 150px;
}
.tunnel-pointer {
  transform: rotate(45deg);
  width: 130px;
  margin: 10px;
}

#map {
  width: 100%;
  min-height: 100vh;
  margin-inline: auto;
}

@media (max-width: 1000px) {
  main.specify {
    display: block;
  }
  .v_separator {
    display: none;
  }
  #map {
    width: 95%;
    min-height: 90vh;
  }
}
</style>