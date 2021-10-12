<template>
  <div class="wrap portal">
    <CMenuScelta @toParent="handler" :tags="tags_array" />
    <main >
      <div v-show="tags_to_view.includes(tags_array[0])">
        <h2>Location map</h2>
      </div>

      <div v-show="tags_to_view.includes(tags_array[1])">
        <h2>Joystick</h2>
        <div id="joy_link"></div>
        <div id="frequency_box">
          <span>Minima frequenza</span>
          <input id="frequency" type="range" value="150" min="0" max="300" />
          <span>Massima frequenza</span>
        </div>
      </div>

      <div v-show="tags_to_view.includes(tags_array[2])">
        <h2>Video streaming</h2>
      </div>
    </main>

    <div class="o_separator"></div>
    <div class="console_upper_control" v-if="consoles.hasOwnProperty('Server')">
      <p>Chiave di identificazione al Server: {{ name_of_client }}</p>
      <button @click="disconnect(name_of_client)">Scollegati dal server</button>
      <CMenuScelta @toParent="handler2" :tags="Object.keys(this.consoles)" />
    </div>
    <div class="console_upper_control" v-else>
      <button @click="startServer" v-bind:disable="this.stage == 'Connessione in corso...'">{{ this.stage }}</button>
    </div>
    <main class="console">
      <div
        v-for="(console, index) in consoles"
        :key="index"
        v-show="console_to_view.includes(index)"
      >
        <h3 :class="checkStatus(console.status)">{{ index }}</h3>
        <p v-html="console.sended_data.join('<br>')"></p>
        <button @click="disconnect(index)" v-if="index != 'Server'">
          Forza disconnessione dal Server
        </button>
      </div>
    </main>
  </div>
</template>

<script >
import { toRef } from '@nuxtjs/composition-api'

import { Web_car } from '@/assets/js/Web_car.js'
import { JoyStick } from '@/assets/js/library/JoyStick-lib/joy.min.js'

export default {
  setup() {
    const consoles = toRef(Web_car._, 'console')
    const name_of_client = toRef(Web_car, 'name_of_client')
    const stage = toRef(Web_car.stage, 'text')
    return {
      consoles,
      name_of_client,
      stage
    }
  },

  data() {
    return {
      tags_array: ['Location', 'Joystick', 'Video'],
      tags_to_view: ['Joystick'],
      console_to_view: [],
    }
  },
  mounted() {
    new JoyStick('joy_link', {
      title: 'joystick_canvas',
      internalFillColor: 'orange',
      internalStrokeColor: 'orange',
      externalStrokeColor: 'black',
    })
  },
  methods: {
    handler(value) {
      this.tags_to_view = value
    },
    handler2(value) {
      this.console_to_view = value
    },
    startServer() {
      this.console_to_view = []
      Web_car.init()
    },
    checkStatus(status) {
      const stateObj = {
        0: 'pending',
        1: 'open',
        2: 'pending',
        3: 'close',
      }
      return stateObj[status]
    },
    disconnect(target) {
      Web_car.disconnect(target)
    }
  },
}
</script>

<style scoped>
#joy_link {
  min-height: 400px;
  min-width: 400px;
}
.wrap_element {
  text-align: center;
}
.console_upper_control {
  text-align: center;
}
.console_upper_control > * {
  margin-block: 10px;
}
.console {
  text-align: center;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  grid-column-gap: var(--app_row_column_gap);
  grid-row-gap: var(--app_row_column_gap);
  overflow-x: auto;
}

.console > div {
  border: var(--app_border_setting);
  border-radius: var(--header_border_radius);
  padding: 30px;
  padding-top: 17px;
  overflow-x: auto;
}

.console > div > h3 {
  font-size: var(--app_subtitle_size);
  align-content: center;
  display: inline-flex;
  margin-bottom: 10px;
}

.console > div > p {
  overflow-y: auto;
  text-align: left;
  font-family: 'Lucida Console', 'Courier New', monospace;
  font-size: var(--app_paragraph_size);
  color: white;
  background-color: var(--background_color_body);
  min-width: -webkit-fill-available;
  height: 200px;
  resize: none;
  white-space: nowrap;
}
.console > div > button {
  margin-top: 10px;
}

.console > div > h3::after {
  margin-left: 20px;
  margin-top: auto;
  margin-bottom: auto;
  content: '';
  align-content: center;
  display: inline-flex;
  height: 20px;
  width: 20px;
  border-radius: 50%;
}

.open::after {
  background-color: green;
}

.pending::after {
  background-color: orange;
}

.close::after {
  background-color: red;
}
</style>