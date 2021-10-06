<template>
  <div class="media">
    <video controls>
      <source :src="s" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <p>{{ c }}</p>
  </div>
</template>

<script>
export default {
  props: ['s', 'a', 'c'],
}
</script>