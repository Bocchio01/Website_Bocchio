<template>
  <div>
    <div class="wrap portal Arduino_Web_Car">
      <cMenuScelta @toParent="handler" :tags="tags_array" />
      <div class="affianca">
        <div class="box" v-show="tags_to_view.includes(tags_array[0])">
          <h2>Location map</h2>
        </div>

        <div class="box" v-show="tags_to_view.includes(tags_array[1])">
          <h2>Joystick</h2>

          <cJoyStick style="margin:auto"/>

          <div id="frequency_box">
            <span>Minima frequenza</span>
            <input id="frequency" type="range" value="150" min="0" max="300" />
            <span>Massima frequenza</span>
          </div>
        </div>

        <div class="box" v-show="tags_to_view.includes(tags_array[2])">
          <h2>Video streaming</h2>
        </div>
      </div>
    </div>
    <div class="wrap portal Arduino_Web_Car">
      <div
        class="console_upper_control"
        v-if="consoles.hasOwnProperty('Server')"
      >
        <p>Chiave di identificazione al Server: {{ name_of_client }}</p>
        <button @click="disconnect(name_of_client)">
          Scollegati dal server
        </button>
        <cMenuScelta @toParent="handler2" :tags="Object.keys(this.consoles)" />
      </div>
      <div class="console_upper_control" v-else>
        <button
          @click="startServer"
          v-bind:disable="this.stage == 'Connessione in corso...'"
        >
          {{ this.stage }}
        </button>
      </div>
      <div class="affianca">
        <div
          class="box console"
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
      </div>
    </div>
  </div>
</template>

<script >
import { toRef } from '@nuxtjs/composition-api'

import { Web_car } from '@/assets/js/Web_car.js'

export default {
  setup() {
    const consoles = toRef(Web_car._, 'console')
    const name_of_client = toRef(Web_car, 'name_of_client')
    const stage = toRef(Web_car.stage, 'text')
    return {
      consoles,
      name_of_client,
      stage,
    }
  },

  data() {
    return {
      tags_array: ['Location', 'Joystick', 'Video'],
      tags_to_view: ['Joystick'],
      console_to_view: [],

      x: 0,
      y: 0,
      speed: 0,
      angle: 0,
    }
  },

  methods: {
    dragg() {
      console.log(event.offsetX, event.offsetY)
    },
    handleChange({ x, y, speed, angle }) {
      this.x = x
      this.y = y
      this.speed = speed
      this.angle = angle
    },
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
    },
  },
}
</script>

<style lang="scss">
#joy_link {
  min-height: 400px;
  min-width: 400px;
}

.console {
  flex: 1 1 auto;
  text-align: center;
  overflow: auto;
  &:nth-child(1) {
    width: 100%;
  }
  > h3 {
    font-size: var(--paragraph_size);
    &::after {
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
    &.open::after {
      background-color: green;
    }

    &.pending::after {
      background-color: orange;
    }

    &.close::after {
      background-color: red;
    }
  }
  > p {
    overflow: auto;
    text-align: left;
    font-family: 'Lucida Console', 'Courier New', monospace;
    font-size: var(--paragraph_size);
    color: white;
    background-color: var(--background_color_body);
    height: 200px;
    white-space: nowrap;
  }
  * {
    margin-block: 5px;
  }
}
</style>