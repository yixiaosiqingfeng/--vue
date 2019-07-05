<template>
  <div>
    <div>
      <headers @disHid="disHid" />
    </div>
    <div class="wt1360 AppMain">
      <AppMain />
    </div>
  </div>
</template>

<script>
import headers from './components/headers'
import AppMain from './components/AppMain'

export default {
  name: 'Layout',
  components: { headers, AppMain },
  data() {
    return {
      flag: false
    }
  },
  methods: {
    disHid(val) {
      this.flag = val
    }
  }
}
</script>

<style scoped lang="scss">
  .AppMain {
    height: calc(100vh - 53px);
    background-color: #fff;
  }

</style>
<!--<style lang="scss" scoped>-->
<!--.Navbar_box {-->
<!--position: absolute;-->
<!--z-index: 888;-->
<!--top: 50px;-->
<!--left: 0;-->
<!--width:0;-->
<!--height: calc(100vh - 50px);-->
<!--overflow:hidden;-->
<!--}-->

<!--.zhezao {-->
<!--position:absolute;-->
<!--left:0;-->
<!--top:50px;-->
<!--right:0;-->
<!--height: calc(100vh - 50px);-->
<!--width:100%;-->
<!--background-color: rgba(0, 0, 0, 0.3);-->
<!--opacity: 0;-->
<!--}-->

<!--.open_box {-->
<!--animation: strat 0.6s;-->
<!--animation-fill-mode: forwards;-->
<!--}-->
<!--.hidden_box{-->
<!--animation: end 0.6s;-->
<!--animation-fill-mode: forwards;-->
<!--}-->
<!--.open_zhezao{-->
<!--animation: stratZ 0.3s;-->
<!--animation-fill-mode: forwards;-->
<!--}-->
<!--.hidden_zhezao{-->
<!--animation: endZ 0.3s;-->
<!--animation-fill-mode: forwards;-->
<!--display:none;-->
<!--}-->
<!--@keyframes stratZ {-->
<!--0%{-->
<!--opacity: 0;-->
<!--}-->
<!--100%{-->
<!--opacity: 1;-->
<!--}-->
<!--}-->
<!--@keyframes endZ {-->
<!--0%{-->
<!--opacity: 1;-->
<!--}-->
<!--100%{-->
<!--opacity: 0;-->
<!--}-->
<!--}-->

<!--@keyframes strat {-->
<!--0%{-->
<!--width:0;-->
<!--}-->
<!--100%{-->
<!--width:200px;-->
<!--}-->
<!--}-->
<!--@keyframes end {-->
<!--0%{-->
<!--width:200px;-->
<!--}-->
<!--100%{-->
<!--width:0;-->
<!--}-->
<!--}-->
<!--</style>-->
