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
        <button @click="getListFromDropbox()">Get files!</button>

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

        </div>
      </div>

      <div class="box" style="flex: 1 1 300px" v-show="tags_to_view[1]">
        <!-- 
        <h2>{{ $t('data.input.h2') }}</h2>
        <p>{{ $t('data.input.p') }}</p>


        <h2>{{ $t('data.output.h2') }}</h2>
        <p>{{ $t('data.output.p') }}</p> -->

        <p v-if="mapSelected == null"> Seleziona una mappa cliccando uno dei marker!</p>
        <div v-else>
          <h2>{{ fileBlob.mapDatas[mapSelected].generalInfo.mapName }}</h2>
          <img src="" :alt="fileBlob.mapDatas[mapSelected].generalInfo.impFile">
          <p v-html="fileBlob.mapDatas[mapSelected].generalInfo.mapNotes"></p>
        </div>


        <!-- <div v-for="map, index in fileBlob.mapDatas" :key="index" class="result">
          <p v-html="map.generalInfo.mapNotes"></p>
          <p> Baricentro x: {{ map.leaflet.center[0] }} </p>
          <p> Baricentro y: {{ map.leaflet.center[1] }} </p>
        </div> -->

      </div>

      <div class="box" style="flex: 1 1 400px" v-show="tags_to_view[2]">
        <h2>{{ $t('map.h2') }}</h2>
        <div style="height: 80vh">
          <client-only>
            <l-map ref="myMap" :zoom="14" @ready="onReady" :center="initialLocation"
              :options="{ attributionControl: false }" @click="mapClick">

              <l-tile-layer v-for="tileProvider in tileProviders" :key="tileProvider.name" :name="tileProvider.name"
                :visible="tileProvider.visible" :url="tileProvider.url" :attribution="tileProvider.attribution"
                layer-type="base" />

              <!-- <l-image-overlay url="/Liceo_Giovio.svg" :bounds="bounds"></l-image-overlay> -->

              <l-marker v-for="(marker, index) in markers" :key="marker.id" :lat-lng.sync="marker.position"
                @click="mapSelected = marker.id">
                <l-popup>{{ marker.id }} : {{ marker.name }}</l-popup>
              </l-marker>
            </l-map>
          </client-only>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { fromUTMtoWGS84 } from '@/assets/js/portal/fromUTMtoWGS84.js'
import { Dropbox } from "dropbox";

export default {
  data() {
    return {
      tags_to_view: [],
      fileBlob: {},
      mapSelected: null,
      initialLocation: [45.81627549092696, 9.038869381902748],
      bounds: [[45.7874, 9.076009], [45.789492, 9.078911]],

      markers: [],

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
    console.log('Montato')
  },

  methods: {
    onReady(mapObject) {

      mapObject.locate()
      console.log('Map ready!')
      this.getListFromDropbox()

      // var imageUrl = '/Liceo_Giovio.svg';
      // var errorOverlayUrl = 'https://cdn-icons-png.flaticon.com/512/110/110686.png';

      // var NWcoord = [
      //   45.7874,
      //   9.076009
      // ]

      // var SEcoord = [
      //   45.789492,
      //   9.078911
      // ]

      // var latLngBounds = L.latLngBounds([NWcoord, SEcoord]);

      // var imageOverlay = L.imageOverlay(imageUrl, latLngBounds, {
      //   opacity: 1,
      //   errorOverlayUrl: errorOverlayUrl,
      //   interactive: false
      // }).addTo(mapObject);

    },

    handler(value) {
      this.tags_to_view = this.tags_array.map((el) => value.includes(el))
    },

    mapClick(event) {
      console.log('Map clicked!', event)
    },

    getListFromDropbox() {
      console.log('getListFromDropbox')
      const dbx = new Dropbox({
        accessToken: 'sl.BRxJ01DvZcuyTGQb-vpnsjQId8bZBkDqzpjCU-mAeuPZPlVW9PTy2HoVumpQdJqH0edqRbyDqQqm4zZrczn85E8hEd23Eb2nCRFLw5sVUtGEe1i8BMfwsaEyCSH-dHHOZT3cufVu',
      })

      dbx
        .filesDownload({ path: '/mapData.json' })
        .then((res) => {
          console.log()
          res.result.fileBlob.text()
            .then((file) => {
              var file = JSON.parse(file)
              this.fileBlob = file

              file.mapDatas.forEach(element => {
                this.markers.push(
                  {
                    id: element.generalInfo.mapID,
                    name: element.generalInfo.mapName,
                    position: {
                      lat: element.leaflet.center[0],
                      lng: element.leaflet.center[1]
                    }
                  }
                )
              });


            })

          // let data = res.result

          // fs.writeFile('.' + data.path_display, data.fileBinary, 'binary', (err) => {
          //   if (err) {
          //     throw err
          //   }
          //   console.log(`File: ${data.name} saved.`)
          // })
        })
        .catch((err) => {
          throw err
        })
    },

    getMap(id) {
      console.log('Marker clicked:' + id)
      var mapName = this.fileBlob.mapDatas.filter(map => map.generalInfo.mapID == id)[0].generalInfo.mapName
      console.log(mapName)
    }
  }
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
