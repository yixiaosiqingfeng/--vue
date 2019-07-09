<template>
  <div>
    <div>https://api.ly522.com/ico/favicon.php?url=https://www.baidu.com</div>
    <div>https://www.weibo.com/favicon.ico</div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Index',
  data() {
    return {

    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      axios.get('https://www.weibo.com/favicon.ico')
        .then(function(response) {
          console.log(response)
        })
        .catch(function(error) {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>

</style>
