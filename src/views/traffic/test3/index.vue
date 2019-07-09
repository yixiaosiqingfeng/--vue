<template>
  <div>
    <biaoqin v-model="value" @submit="submit" />
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
      console.log(11)
    }
  },
  methods: {
    submit() {
      console.log(this.value, 222)
    }
  }
}
</script>

<style scoped>

</style>
