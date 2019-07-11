<template>
  <div class="box">
    <div class="top_header">
      <span>数据统计</span>
      <span>更多</span>
    </div>

    <div class="top_data">
      <div style="width:50%;">
        <p>1200</p>
        <p>总话题数</p>
        <p>环比昨日 2% <i class="el-icon-top" /> </p>
      </div>
      <div style="width:50%;">
        <p>1200</p>
        <p>总话题数</p>
        <p>环比昨日 2%<i class="el-icon-top" /></p>
      </div>
      <div style="width:50%;">
        <p>1200</p>
        <p>总话题数</p>
        <p>环比昨日 2%<i class="el-icon-top" /></p>
      </div>
      <div style="width:50%;">
        <p>1200</p>
        <p>总话题数</p>
        <p>环比昨日 2%<i class="el-icon-top" /></p>
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
  height: 143px;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 2px 2px #eee;
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
 margin-top: 10px;
}
.top_data p{
  margin-top: 2px;
}
</style>
