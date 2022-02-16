<template>
  <div>
    <CHeadBase />
    <CWrap v-for="(data, index) in $t('index.wraps')" :key="index" :obj="data" :msg="$t('index.msg')" />
  </div>
</template>
