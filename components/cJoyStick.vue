<style>
.vue-joystick {
  display: block;
  background: white;
  height: 256px;
  width: 256px;
  border-radius: 50%;
  position: relative;
  border: solid 4px var(--Color_Main);
}
/*.vue-joystick::after,*/
.vue-joystick::before {
  content: '';
  position: absolute;
}
.vue-joystick::before {
  left: 0;
  right: 0;
  margin: -32px;
  background: var(--Color_Main);
  height: 64px;
  width: 64px;
  border-radius: 50%;
  transform: translateX(var(--x)) translateY(var(--y));
}
/*.vue-joystick::after {
  left: 126px;
  bottom: 128px;
  border-radius: 10px;
  width: 4px;
  background: var(--Color_Main);
  transform: rotate(var(--angle));
  transform-origin: bottom center;
  height: var(--speed);
}*/
</style>
<template>
  <div id="joystick_id" class="vue-joystick" :style="style" @touchmove="handleTouch" @mousemove="handleMove" @mousedown="handleStart" @mouseup="handleRelease" @touchend="handleRelease"></div>
</template>
<script>
export default {
  data() {
    return {
      x: 0,
      y: 0,
      angle: 0,
      speed: 0,
      isMouseDown: false,
    }
  },
  computed: {
    style() {
      return {
        '--x': `${this.x + 128}px`,
        '--y': `${this.y + 128}px`,
        '--speed': `${this.speed}px`,
        '--angle': `${this.angle}deg`,
      }
    },
  },
  methods: {
    handleStart() {
      this.isMouseDown = true
    },
    handleTouch({ touches: [touch] }) {
      const { clientX, clientY } = touch
      this.getValues(clientX, clientY)
    },

    handleMove({ clientX, clientY }) {
      if (!this.isMouseDown) {
        return
      }
      this.getValues(clientX, clientY)
    },

    handleRelease() {
      this.emitAll('release')
      this.isMouseDown = false
      this.x = 0
      this.y = 0
      this.speed = 0
      this.angle = 0
      this.emitAll()
    },

    emitAll(name = 'change') {
      this.$emit(name, {
        x: this.x,
        y: this.y,
        speed: this.speed,
        angle: this.angle,
      })
    },
    getValues(x, y) {
      const rect = document.getElementById('joystick_id').getBoundingClientRect()

      const parameters = [Math.round(x - rect.left), 256 - Math.round(y - rect.top)]
      this.x = Math.min(128, Math.round(x - rect.left) - 128)
      this.y = Math.round(y - rect.top) - 128
      const min = [-90, -50]
      const max = [90, 50]
      var fin_value = []
      for (var i = 0; i < min.length; i++) {
        var range = max[i] - min[i]
        fin_value[i] = Math.floor((parameters[i] / 256) * range + min[i])
      }
      this.speed = fin_value[1]
      this.angle = fin_value[0]
      this.emitAll()
    },
  },
  mounted() {
    this.emitAll()
  },
}
</script>
