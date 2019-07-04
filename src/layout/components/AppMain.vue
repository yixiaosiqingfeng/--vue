<template>
  <section class="app-main">
    <el-row>
      <el-col :span="3">
        <div class="grid-content navbar">
          <el-menu
            router
            :default-active="activeIndex"
            class="el-menu-vertical-demo"
          >
            <el-menu-item :index="item.meta.code" v-for="(item,index) in navbarData" :key="index">
              <i class="el-icon-menu"></i>
              <span slot="title">{{item.meta.title}}</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="21">
        <div class="grid-content bg-purple ">
          <transition name="fade-transform" mode="out-in">
            <!--<keep-alive>-->
            <router-view/>
            <!--</keep-alive>-->
          </transition>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'AppMain',
    data() {
      return {
        index: '',
        activeIndex: ''
      }
    },
    watch: {
      $route: {
        handler: function(route) {
          this.activeIndex=route.path.match(/^\/[a-z]+/)[0]
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
    methods: {},
    mounted() {
      console.log(this.navbarData,7777)
    }
  }
</script>

<style scoped lang="scss">
  .el-menu {
    height: calc(100vh - 40px);
  }
</style>
