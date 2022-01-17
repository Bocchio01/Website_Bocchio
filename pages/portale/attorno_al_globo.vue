<template>
  <div class="wrap Portale Around_the_globe">
    <CHeadPortale />
    <CMenuScelta @toParent="handler" :tags="tags_array" />
    <div class="affianca">
      <div class="box" v-show="tags_to_view.includes(tags_array[0])" style="flex: 1 1 300px">
        <h2>Istruzioni</h2>
        <div>
          <p>Questo script ti permetterà di calcolare con facilità l'azimut e la distanza tra due punti del mondo.</p>
          <br />
          <p><strong>Comandi disponibili:</strong></p>
          <ul>
            <li>Ricerca -> Lente di ingrandimento sulla mappa</li>
            <li>Selezione -> Click sulla mappa</li>
            <li>Modifica -> Trascinamento del punto sulla mappa</li>
            <li>Eliminazione -> Icona del cestino dal box di input dati</li>
            <li>Geolocalizzazione -> Icona apposita sulla mappa</li>
          </ul>
          <br />
          <p>Con il tasto <span class="arrow">&#8597;</span> è possibile invertire le coordinate di partenza con quelle di arrivo.</p>
          <p>Il punto di partenza è segnato in verde, mentre quello di arrivo in rosso.</p>
        </div>
      </div>

      <div class="box" style="flex: 1 1 300px" v-show="tags_to_view.includes(tags_array[1])">
        <h2>Dati in input</h2>
        <p>Clicca sulla mappa per inserire le coordinate:</p>

        <div class="result">
          <div>
            <div v-for="(marker, index) in markers" :key="marker.id" style="display: flex">
              <img style="height: 25px" :src="marker.IconUrl" @click="initialLocation = marker.position" />
              <input style="color: var(--Color_Text)" v-model="marker.position" placeholder="Nessun punto selezionato" type="text" disabled />
              <span @click="clean(index)">&#x1F5D1;&#xFE0F;</span>
            </div>
          </div>
          <span class="arrow" @click="inverti()">&#8597;</span>
        </div>
        <hr />
        <h2>Dati in output</h2>
        <p>Visualizza qui i risultati:</p>
        <div class="result affianca">
          <div class="compass-bg">
            <img
              class="compass-pointer"
              src="https://vasilis-tsirimokos.com/codepen/compass-pointer.png"
              :style="'transform: rotate(' + (parseInt(risultati.azimut) + 45) + 'deg);margin:0px'"
            />
          </div>
          <div>
            <p>
              Azimut tra i due punti: <b> {{ risultati.azimut }} °</b>
            </p>
            <p>
              Distanza sulla superficie: <b> {{ risultati.distanza }} km</b>
            </p>
            <p>
              Inclinazione del tunnel: <b> {{ risultati.inclinazione }} °</b>
            </p>
            <p>
              Lunghezza del tunnel: <b> {{ risultati.lunghezza }} km</b>
            </p>
          </div>
        </div>
      </div>

      <div class="box" style="flex: 10 1 400px" v-show="tags_to_view.includes(tags_array[2])">
        <h2>Mappa</h2>
        <div style="height: 90vh">
          <client-only>
            <l-map ref="myMap" :zoom="zoom" @ready="onReady" @locationfound="onLocationFound" :center="initialLocation" :options="{ attributionControl: false }" @click="addMarker">
              <l-control-scale position="bottomleft" :imperial="true" :metric="true"></l-control-scale>
              <l-control-layers position="topright"></l-control-layers>
              <l-control-attribution
                position="bottomright"
                prefix="Bocchio | <a href='https://leafletjs.com' title='A JS library for interactive maps'>Leaflet</a>"
              ></l-control-attribution>
              <l-tile-layer
                v-for="tileProvider in tileProviders"
                :key="tileProvider.name"
                :name="tileProvider.name"
                :visible="tileProvider.visible"
                :url="tileProvider.url"
                :attribution="tileProvider.attribution"
                layer-type="base"
              />
              <v-locatecontrol />
              <l-marker
                v-for="(marker, index) in markers"
                :key="marker.id"
                draggable
                :visible="marker.visible"
                :lat-lng.sync="marker.position"
                :icon="marker.IconObj"
                @dblclick="clean(index)"
              >
                <l-popup>Questo punto di {{ marker.id }} ha coordinate {{ marker.position }}</l-popup>
              </l-marker>
            </l-map>
          </client-only>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Around_the_globe } from '@/assets/js/Around_the_globe.js'

export default {
  data() {
    return {
      tags_array: ['Guida', 'Dati', 'Mappa'],
      tags_to_view: ['Mappa'],

      ready: false,

      risultati: Around_the_globe.result,
      initialLocation: [0, 0],
      zoom: 13,

      markers: [
        {
          id: 'Partenza',
          position: { lat: 0, lng: 0 },
          visible: false,
          IconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
          IconObj: {},
        },
        {
          id: 'Arrivo',
          position: { lat: 0, lng: 0 },
          visible: false,
          IconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
          IconObj: {},
        },
      ],
      tileProviders: [
        {
          name: 'OpenStreetMap',
          visible: true,
          attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        },
        {
          name: 'OpenTopoMap',
          visible: false,
          url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
          attribution:
            'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
        },
      ],
    }
  },
  mounted() {
    this.markers[0].IconObj = this.createIcon(this.markers[0].IconUrl)
    this.markers[1].IconObj = this.createIcon(this.markers[1].IconUrl)
  },

  head() {
    return {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css',
          defer: true,
        },
        {
          rel: 'stylesheet',
          href: 'https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.css',
          defer: true,
        },
        {
          rel: 'stylesheet',
          href: 'https://unpkg.com/leaflet-geosearch@3.0.0/dist/geosearch.css',
          defer: true,
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
          src: 'https://cdn.jsdelivr.net/npm/leaflet.geodesic',
          defer: true,
        },
      ],
    }
  },

  methods: {
    onReady(mapObject) {
      this.ready = true
      const provider = new this.OpenStreetMapProvider()

      const searchControl = new this.GeoSearchControl({
        notFoundMessage: 'Sembra non esista alcuna località associata a questo indirizzo...',
        provider: provider,
        autoCompleteDelay: 100,
        autoClose: true,
        keepResult: true,
      })

      mapObject.addControl(searchControl)

      this.tags_to_view = []
      mapObject.locate()
      setTimeout(() => {
        try {
          this.geodesic = new L.Geodesic().addTo(mapObject)
        } catch (error) {
          console.log('Errore')
        }
      }, 2000)
    },
    onLocationFound(location) {
      this.initialLocation = location.latlng
    },
    handler(value) {
      this.tags_to_view = value
    },
    inverti() {
      var foo = this.markers[0].position
      this.markers[0].position = this.markers[1].position
      this.markers[1].position = foo
    },
    addMarker(event) {
      for (let i = 0; i < 2; i++) {
        if (!this.markers[i].visible) {
          this.markers[i].position = event.latlng
          this.markers[i].visible = true
          return
        }
      }
      console.log('Marker gia segnati')
    },
    createIcon(url) {
      return new L.Icon({
        iconUrl: url,
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      })
    },
    clean(id) {
      this.geodesic.setLatLngs([])
      this.markers[id].position = { lat: 0, lng: 0 }
      this.markers[id].visible = false
    },
  },
  watch: {
    markers: {
      handler(val) {
        var points = []
        if (this.markers[0].visible && this.markers[1].visible) {
          val.forEach((element) => {
            points.push(element.position)
          })
          this.geodesic.setLatLngs(points)
          this.risultati.distanza = (this.geodesic.statistics.totalDistance / 1000).toFixed(2)
          Around_the_globe.init(points)
        } else {
          this.risultati.azimut = 'NaN'
          this.risultati.distanza = 'NaN'
          this.risultati.inclinazione = 'NaN'
          this.risultati.lunghezza = 'NaN'
        }
      },
      deep: true,
    },
  },
}
//sistemare il rilascio automatico del drag se si va troppo pianno con il cursone
</script>

<style lang="scss">
/* @import 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'; */

.Around_the_globe {
  hr {
    margin-block: var(--Margin_Gap);
  }
  .arrow {
    padding-inline: 10px;
  }
  span {
    cursor: pointer;
  }
  .compass-bg {
    width: 150px;
    height: 150px;
    background-size: 150px;
    background-image: url('https://vasilis-tsirimokos.com/codepen/compass-bg.png');
    margin-inline: auto;
  }

  .compass-pointer {
    transform: rotate(45deg);
    width: 150px;
  }
}
.vue2leaflet-map {
  input.glass {
    height: 30px !important;
  }
}
</style>
