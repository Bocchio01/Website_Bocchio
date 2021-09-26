<template>
  <div>
    <cWrap v-for="(data, index) in datas" :key="index" :obj="data" />
  </div>
</template>


<script>
import json from '@/assets/json/Home.json'
export default {
  data() {
    return {
      datas: json,
    }
  },
}
</script>