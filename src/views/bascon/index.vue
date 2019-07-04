<template>
  <div style="height:100%;">
    <div>
      <el-menu router :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <el-menu-item :index="item.meta.code" v-for="(item,index) in navArr" :key="index">{{item.meta.title}}</el-menu-item>
      </el-menu>
    </div>
    <div class="appMain" style="position:relative;">
      <transition name="fade-transform" mode="out-in">
        <router-view/>
      </transition>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'index',
    data(){
      return{
        navArr:null,
        activeIndex: '0',
      }
    },
    computed:{
      ...mapGetters([
        'permission_routes',
        'sidebar'
      ]),
    },
    mounted(){
      let navArr=this.permission_routes.filter(tim=>{
        return tim.path==='/bascon'
      })[0].children
      let arr=[]
      navArr.forEach(tim=>{
        arr.push(tim.children[0])
      })
      this.navArr=arr
      this.activeIndex=this.$route.path
      console.log(this.$route.path,888)
    }
  }
</script>

<style scoped>
.appMain{
  overflow-y: scroll;

  height: calc(100vh - 105px);
}
</style>
