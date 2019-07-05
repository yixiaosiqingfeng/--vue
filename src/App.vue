<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
  .wt1360{
    width:1360px;
    margin:auto;
  }
  ::-webkit-scrollbar {
    width: 4px;
    /*height: 4px;*/
  }

  ::-webkit-scrollbar-track {
    border-radius: 2px; /*滚动条的背景区域的圆角*/
     /*滚动条的背景颜色*/
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 2px; /*滚动条的圆角*/
    background-color: #ccc; /*滚动条的背景颜色*/
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0,0,0,0.3);
  }

  ::-webkit-scrollbar-thumb:active {
    background-color: rgba(0,0,0,0.3);
    /*cursor: pointer;*/
  }
</style>
