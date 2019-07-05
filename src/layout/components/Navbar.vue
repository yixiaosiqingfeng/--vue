<template>
  <div class="navbar_box">edwed</div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      name: ''
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ])
  },
  mounted() {

  }
}
</script>
<style lang="scss" scoped>
  .navbar_box {
    height: calc(100vh - 50px);
    background-color: #fff;
  }
</style>
