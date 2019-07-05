<template>
  <div style="height:100%;position:relative;">
    <div class="topBar">
      <el-menu router :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <el-menu-item v-for="(item,index) in navArr" :key="index" :index="item.meta.code">{{ item.meta.title }}
        </el-menu-item>
      </el-menu>
    </div>
    <div class="appMain_box">
      <div class="appMain">
        <transition name="fade-transform" mode="out-in">
          <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Index',
  props: {
    path: {
      type: String,
      default: '/juris'
    }
  },
  data() {
    return {
      navArr: null,
      activeIndex: '0'
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ])
  },
  mounted() {
    const navArr = this.permission_routes.filter(tim => {
      return tim.path === this.path
    })[0].children
    const arr = []
    navArr.forEach(tim => {
      arr.push(tim.children[0])
    })
    this.navArr = arr
    this.activeIndex = this.$route.path
  }
}
</script>

<style scoped>
  .appMain_box {
    position:relative;
    top:60px;
    height: calc(100vh - 115px);
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .appMain{
    width:100%;
    position:absolute;
  }
  .el-menu-demo{
    border:0;
  }
  .topBar{
    position:absolute;
    width:100%;
    box-shadow: 0 5px 10px #f6f6f6;
    z-index: 500;
  }
</style>
