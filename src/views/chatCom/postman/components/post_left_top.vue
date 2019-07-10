<template>
  <div class="box">
    <div class="top_header">
      <span style="font-weight:800;font-size: 16px;">数据统计</span>
      <span>更多</span>
    </div>

    <div class="top_data">
      <div style="width:50%;">
        <p style="font-weight:800;font-size: 16px;">1200</p>
        <p>总话题数</p>
        <p>环比昨日 2% <i class="iconfont icon-up" style="color:green" /> </p>
      </div>
      <div style="width:50%;">
        <p style="font-weight:800;font-size: 16px;">1200</p>
        <p>总话题数</p>
        <p>环比昨日 2%<i class="iconfont icon-down" style="color:red" /></p>
      </div>
      <div style="width:50%;">
        <p style="font-weight:800;font-size: 16px;">1200</p>
        <p>总话题数</p>
        <p>环比昨日 2%<i class="iconfont icon-up" style="color:green" /></p>
      </div>
      <div style="width:50%;">
        <p style="font-weight:800;font-size: 16px;">1200</p>
        <p>总话题数</p>
        <p>环比昨日 2%<i class="iconfont icon-down" style="color:red" /></p>
      </div>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style scoped>
.box{
  height: 210px;
  border: 1px solid #ccc;
  box-shadow:0 0 15px #eee;
  margin-top: 5px;
}
.top_header{
  display: flex;
  justify-content: space-between;
  margin: 5px;
}
.top_data{
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  font-size: 10px;
}
.top_data>div{
 margin-top: 20px;
}
.top_data p{
  margin-top: 5px;
}
</style>
