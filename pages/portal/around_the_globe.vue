<i18n>
{
  "it": {
    "tags_array": ["Istruzioni", "Dati", "Mappa"],

    "instructions": {
      "h2": "Istruzioni",
      "p": [
        "Questo script ti permetterà di calcolare con facilità l'azimut e la distanza tra due punti del mondo.",
        "Comandi disponibili:",
        "Con il tasto <span>&#8597;</span> è possibile invertire le coordinate di partenza con quelle di arrivo.",
        "Il punto di partenza è segnato in verde",
        "mentre quello di arrivo in rosso"],
      "li": [
        "Seleziona -> Click sulla mappa",
        "Modifica -> Trascina il marker sulla mappa",
        "Elimina -> Icona del cestino dal box di input dati o doppio click del marker sulla mappa",
        "Ricerca -> Lente di ingrandimento sulla mappa",
        "Focus -> Click del marker dal box di input dati"
      ]
    },

    "data": {
      "input": {
        "h2": "Dati in input",
        "p": "Clicca sulla mappa per inserire le coordinate:"
      },
      "output": {
        "h2": "Dati in output",
        "p": "Visualizza qui i risultati:",
        "results": [
          "Azimut tra i due punti:",
          "Distanza sulla superficie:",
          "Inclinazione del tunnel:",
          "Lunghezza del tunnel:"
          ]
      }
    },

    "map": {
      "h2": "Mappa",
      "popup": ["Questo punto di ", " ha coordinate "]
    }
  },

  "en": {
    "tags_array": ["Instructions", "Data", "Map"],

    "instructions": {
      "h2": "Instructions",
      "p": [
        "This script will let you easily calculate azimuth angle and distances between two points on the earth's surface.",
        "Available controls:",
        "With the button <span>&#8597;</span> is possible to invert starting and arrival coordinates.",
        "Starting point is the green one",
        "while the arrival is the red one"],
      "li": [
        "Select -> Click on the map",
        "Modify -> Drag the marker on the map",
        "Delete -> Trash icon from input data box or double click of marker on the map",
        "Search -> Magnifying glass on the map",
        "Focus -> Click of marker from input data box"
      ]
    },

    "data": {
      "input": {
        "h2": "Input data",
        "p": "Click on the map to enter coordinates here:"
      },
      "output": {
        "h2": "Output data",
        "p": "View results here:",
        "results": [
          "Azimuth between points:",
          "Distance over Earth's surface:",
          "Tunnel's angle:",
          "Tunnel's lenght:"
          ]
      }
    },

    "map": {
      "h2": "Map",
      "popup": ["This point called ", " has coordinates "]
    }
  }
}
</i18n>

<template>
  <div class="wrap Portale Around_the_globe">
    <CHeadPortale />
    <CMenuScelta @toParent="handler" :tags="tags_array" :start="[tags_array[1], tags_array[2]]" />
    <div class="affianca">
      <div class="box" v-show="tags_to_view[0]" style="flex: 1 1 300px">
        <h2>{{ $t('instructions.h2') }}</h2>
        <div>
          <p>{{ $t('instructions.p.0') }}</p>
          <br />
          <p>
            <strong>{{ $t('instructions.p.1') }}</strong>
          </p>
          <ul>
            <li>{{ $t('instructions.li.0') }}</li>
            <li>{{ $t('instructions.li.1') }}</li>
            <li>{{ $t('instructions.li.2') }}</li>
            <li>{{ $t('instructions.li.3') }}</li>
            <li>{{ $t('instructions.li.4') }}</li>
          </ul>
          <br />
          <p v-html="$t('instructions.p.2')"></p>

          <p>
            {{ $t('instructions.p.3') }} <span><img style="height: 25px" :src="markers[0].IconUrl" /></span>, {{ $t('instructions.p.4') }}
            <span><img style="height: 25px" :src="markers[1].IconUrl" /></span>
          </p>
        </div>
      </div>

      <div class="box" style="flex: 1 1 300px" v-show="tags_to_view[1]">
        <h2>{{ $t('data.input.h2') }}</h2>
        <p>{{ $t('data.input.p') }}</p>

        <div class="result">
          <div>
            <div v-for="(marker, index) in markers" :key="marker.id" style="display: flex">
              <img style="height: 25px" :src="marker.IconUrl" @click="initialLocation = marker.position" />
              <input style="color: var(--Color_Text)" v-model="marker.position" type="text" disabled />
              <span style="cursor: pointer" @click="clean(index)">&#x1F5D1;&#xFE0F;</span>
            </div>
          </div>
          <span style="cursor: pointer" @click="inverti()">&#8597;</span>
        </div>
        <hr />
        <h2>{{ $t('data.output.h2') }}</h2>
        <p>{{ $t('data.output.p') }}</p>
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
              {{ $t('data.output.results.0') }} <b> {{ risultati.azimut }}°</b>
            </p>
            <p>
              {{ $t('data.output.results.1') }} <b> {{ risultati.distanza }} km</b>
            </p>
            <p>
              {{ $t('data.output.results.2') }} <b> {{ risultati.inclinazione }}°</b>
            </p>
            <p>
              {{ $t('data.output.results.3') }} <b> {{ risultati.lunghezza }} km</b>
            </p>
          </div>
        </div>
      </div>

      <div class="box" style="flex: 10 1 400px" v-show="tags_to_view[2]">
        <h2>{{ $t('map.h2') }}</h2>
        <div style="height: 90vh">
          <client-only>
            <l-map ref="myMap" :zoom="13" @ready="onReady" @locationfound="onLocationFound" :center="initialLocation" :options="{ attributionControl: false }" @click="addMarker">
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
              <!-- <v-locatecontrol /> -->
              <l-marker
                v-for="(marker, index) in markers"
                :key="marker.id"
                draggable
                :visible="marker.visible"
                :lat-lng.sync="marker.position"
                :icon="marker.IconObj"
                @dblclick="clean(index)"
              >
                <l-popup>{{ $t('map.popup.0') }} {{ marker.id }} {{ $t('map.popup.1') }} {{ marker.position }}</l-popup>
              </l-marker>
            </l-map>
          </client-only>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Around_the_globe } from '@/assets/js/portal/around_the_globe.js'

export default {
  data() {
    return {
      tags_to_view: [],
      risultati: Around_the_globe.result,
      initialLocation: [0, 0],

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

  computed: {
    tags_array: {
      get() {
        return Object.values(this.$t('tags_array'))
      },
    },
  },

  mounted() {
    this.markers[0].IconObj = this.createIcon(this.markers[0].IconUrl)
    this.markers[1].IconObj = this.createIcon(this.markers[1].IconUrl)
  },

  methods: {
    onReady(mapObject) {
      const provider = new this.OpenStreetMapProvider()

      const searchControl = new this.GeoSearchControl({
        notFoundMessage: 'Sembra non esista alcuna località associata a questo indirizzo...',
        provider: provider,
        autoCompleteDelay: 100,
        autoClose: true,
        keepResult: true,
      })

      mapObject.addControl(searchControl)
      mapObject.locate()

      this.geodesic = new L.Geodesic().addTo(mapObject)
    },
    onLocationFound(location) {
      this.initialLocation = location.latlng
    },
    handler(value) {
      this.tags_to_view = this.tags_array.map((el) => value.includes(el))
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
</script>

<style lang="scss">
.Around_the_globe {
  hr {
    margin-block: var(--Margin_Gap);
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
