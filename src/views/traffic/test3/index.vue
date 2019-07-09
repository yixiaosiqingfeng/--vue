<template>
  <div>
    <biaoqin v-model="value" />
  </div>
</template>

<script>
import biaoqin from './biaoqing'

export default {
  name: 'Index',
  components: { biaoqin },
  data() {
    return {
      value: ' '
    }
  },
  watch: {
    value() {
      console.log(this.value, '我是传过来的值')
    }
  }
}
</script>

<style scoped>

</style>
