<template>
  <div>
    <CWrap :obj="$t('error.wraps')" :msg="$t('error.msg')" />
  </div>
</template>

<script>
export default {
  props: ['error'],
  mounted() {
    this.$t('error').title = this.$t('error').title + ' ' + this.error.statusCode
  },
}
</script>
