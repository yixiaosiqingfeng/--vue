<template>
  <div class="header_box">
    <el-button @click="logout">退出</el-button>
  </div>
</template>

<script>
  export default {
    name: 'headers',
    data() {
      return {
        flag: 2
      }
    },
    methods: {
      async logout() {
        await this.$store.dispatch('user/logout')
        location.reload()
      }
    }
  }
</script>

<style scoped>

</style>
