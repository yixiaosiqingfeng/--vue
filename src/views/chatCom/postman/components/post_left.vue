<template>
  <div>
    <leftTop />
    <leftBotm />
  </div>
</template>
<script>
import leftTop from './post_left_top'
import leftBotm from './post_left_bottom'
export default {
  name: 'PostLeft',
  components: { leftTop, leftBotm }
}
</script>
<style scoped>
</style>
