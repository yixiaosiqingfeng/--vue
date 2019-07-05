<template>
  <div class="header_box">
    <el-button @click="logout">退出</el-button>
  </div>
</template>

<script>
export default {
  name: 'Headers',
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
.header_box{
  box-shadow: 0 5px 10px #eee;
  margin-bottom:15px;
}
</style>
