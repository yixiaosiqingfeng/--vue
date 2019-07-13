<template>
  <!-- 右上部分 -->
  <div class="content2">
    <span style="font-size: 16px;font-weight: 700;margin-left: 10px;">数据统计</span><span style="float: right;color: #606266;">更多</span>
    <el-row style="margin-top: 20px;">
      <el-col :span="12">
        <div class="census">
          <p>1200</p>
          <p>总话题数</p>
          <p>环比昨日2%↑</p>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="census">
          <p>1200</p>
          <p>今日互动总数</p>
          <p>环比昨日2%↑</p>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="census">
          <p>1200</p>
          <p>总话题数</p>
          <p>环比昨日2%↑</p>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="census">
          <p>1200</p>
          <p>总话题数</p>
          <p>环比昨日2%↑</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'TopicCensus'
}
</script>

<style scoped>
	.content2 {
		width: 315px;
		box-shadow: 0 0 10px #f0f0f0;
		padding: 20px;
	}

	.census {
		text-align: center;
	}

	.census p {
		padding: 5px;
	}

	.census p:nth-of-type(1) {
		font-weight: 700;
	}

	.census p:nth-of-type(2) {
		font-size: 12px;
		color: #606266;
	}

	.census p:nth-of-type(3) {
		font-size: 12px;
		color: #909399;
	}
</style>
