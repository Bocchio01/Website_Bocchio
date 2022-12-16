<i18n>
    {
      "it": {
        "tags_array": ["Diritti d'autore", "Dati", "Mappa"],

        "copyright": {
          "h2": "Diritti d'autore",
          "p": ["Queste mappe sono da intendersi di libero utilizzo solo nel caso vengano usati per scopi didattici e non commerciali.", "In caso di utilizzo commerciale è necessario contattare il creatore della mappa.", "Il creatore del sito si riserva la possibilità di modificare o rimuovere le mappe in qualsiasi momento senza preavviso."]
        },

        "data": {
          "p": "Seleziona una mappa cliccando su uno dei markers!"
        },

        "map": {
          "h2": "Mappa"
        }
      },

      "en": {
        "tags_array": ["Copyright", "Data", "Map"],

        "copyright": {
          "h2": "Copyright",
          "p": ["These maps are intended for free use only if they are used for educational and non-commercial purposes.", "In the event of commercial use, the map creator must be contacted.", "The site creator reserves the right to change or remove maps at any time without prior notice."]
        },

        "data": {
          "p": "Select a map by clicking on one of the markers!"
        },

        "map": {
          "h2": "Map"
        }
      }
    }
</i18n>

<template>
  <div class="wrap Portale Orienteering_maps">
    <CHeadPortale />
    <CMenuScelta @toParent="handler" :tags="tags_array" :start="[tags_array[1], tags_array[2]]" />
    <div class="affianca">
      <div class="box" v-show="tags_to_view[0]" style="flex: 1 1 300px">
        <h2>{{ $t('copyright.h2') }}</h2>
        <div>
          <p>{{ $t('copyright.p.0') }}</p>
          <p>{{ $t('copyright.p.1') }}</p>
          <br />
          <p>{{ $t('copyright.p.2') }}</p>
          <br />
          <p><b>Tommaso Bocchietti @ {{ new Date().getFullYear() }}</b></p>
        </div>
      </div>

      <div v-if="mapSelected == null" class="box" v-show="tags_to_view[1]">
        <p><b>{{ $t('data.p') }}</b></p>
      </div>

      <div v-else class="box" style="flex: 1 1 400px" v-show="tags_to_view[1]">
        <h2>{{ fileBlob.mapDatas[mapSelected].generalInfo.mapName }}</h2>
        <CMedia v-if="img_url" :s="img_url" :alt="fileBlob.mapDatas[mapSelected].generalInfo.impFile" class="ori_map">
        </CMedia>
        <p v-html="fileBlob.mapDatas[mapSelected].generalInfo.mapNotes"></p>
      </div>

      <div class="box" style="flex: 1 1 300px" v-show="tags_to_view[2]">
        <h2>{{ $t('map.h2') }}</h2>
        <div style="height: 80vh">
          <client-only>
            <l-map ref="myMap" :options="{ attributionControl: false }" :bounds="bounds">

              <l-tile-layer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                attribution='&copy; <a target=\"_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors' />

              <l-marker v-for="marker in markers" :key="marker.id" :lat-lng.sync="marker.position"
                @click="getMap(marker.id)">
                <l-popup>{{ marker.name }}</l-popup>
              </l-marker>

            </l-map>
          </client-only>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Dropbox } from "dropbox";

export default {
  data() {
    return {
      tags_to_view: [],
      fileBlob: {},
      mapSelected: null,
      img_url: '',
      bounds: [[45.809843, 9.08295], [45.809843, 9.08295]],

      markers: [],

      dbx: new Dropbox({
        clientId: 'e0ia56nopu9a99z',
        clientSecret: process.env.DBX_CLIENT_SECRET,
        refreshToken: process.env.DBX_REFRESH_TOKEN
      })
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
    this.getListFromDropbox()
  },

  methods: {
    handler(value) {
      this.tags_to_view = this.tags_array.map((el) => value.includes(el))
    },

    getListFromDropbox() {
      this.dbx
        .filesDownload({ path: '/mapData.json' })
        .then((res) => {
          res.result.fileBlob.text()
            .then((file) => {
              var file = JSON.parse(file)
              this.fileBlob = file

              file.mapDatas.forEach(element => {
                if (element.leaflet) {
                  this.markers.push(
                    {
                      id: element.generalInfo.mapID,
                      name: element.generalInfo.mapName,
                      position: {
                        lat: element.leaflet.center[0] || false,
                        lng: element.leaflet.center[1] || false
                      }
                    }
                  )
                  this.bounds = [
                    [Math.min(element.leaflet.center[0], this.bounds[0][0]), Math.min(element.leaflet.center[1], this.bounds[0][1])],
                    [Math.max(element.leaflet.center[0], this.bounds[1][0]), Math.max(element.leaflet.center[1], this.bounds[1][1])]
                  ]
                }
              });

            })
        })
        .catch((err) => {
          throw err
        })
    },

    getMap(id) {
      this.mapSelected = id
      var mapGeneralInfo = this.fileBlob.mapDatas.filter(map => map.generalInfo.mapID == id)[0].generalInfo

      this.dbx
        .filesDownload({ path: '/MapsGif/' + mapGeneralInfo.expFile })
        .then((res) => {
          var fileBlob = res.result.fileBlob

          var blobUrl = URL.createObjectURL(fileBlob)
          this.img_url = blobUrl
        })
        .catch((err) => {
          this.img_url = ''
          throw err
        })
    }
  }
}
</script>

<style lang="scss">
.Orienteering_maps {}

.vue2leaflet-map {
  input.glass {
    height: 30px !important;
  }
}
</style>
