<template>
  <section class="app-main">
    <div style="display:flex;">
      <div class="leftBar">
        <div class="grid-content navbar">
          <el-menu
            router
            :default-active="activeIndex"
            class="el-menu-vertical-demo"
          >
            <el-menu-item v-for="(item,index) in navbarData" :key="index" :index="item.meta.code">
              <i class="el-icon-menu" />
              <span slot="title">{{ item.meta.title }}</span>
            </el-menu-item>
          </el-menu>
        </div>
      </div>
      <div class="rightMain">
        <div class="grid-content bg-purple ">
          <transition name="fade-transform" mode="out-in">
            <!--<keep-alive>-->
            <router-view />
            <!--</keep-alive>-->
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppMain',
  data() {
    return {
      activeIndex: ''
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.activeIndex = route.path.match(/^\/[a-zA-Z]+/)[0]
      },
      immediate: true
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    navbarData() {
      return this.permission_routes.filter(res => {
        return res.meta
      })
    }
  },
  mounted() {
  },
  methods: {}
}
</script>

<style scoped lang="scss">
  .el-menu {
    height: calc(100vh - 55px);
  }

  .el-menu-vertical-demo, .el-menu {
    border: 0;
  }

  .leftBar {
    width: 155px;
    box-shadow: 0 0 10px #ddd;
  }

  .rightMain {
    flex: 1;
    margin-left: 15px;
    box-shadow: 0 0 10px #ddd;
  }
</style>
