<template>
  <div class="content3">
    <el-row>
      <el-col :span="6"><span :class="{tabBar: true, active: tabIndex == 0}" @click="tabIndex = 0">我的帖子</span></el-col>
      <el-col :span="6"><span :class="{tabBar: true, active: tabIndex == 1}" @click="tabIndex = 1">我的收藏</span></el-col>
      <el-col :span="6"><span :class="{tabBar: true, active: tabIndex == 2}" @click="tabIndex = 2">我的评论</span></el-col>
      <el-col :span="6"><span :class="{tabBar: true, active: tabIndex == 3}" @click="tabIndex = 3">我的点赞</span></el-col>
    </el-row>
    <div v-show="tabIndex == 0" class="mine">帖子</div>
    <div v-show="tabIndex == 1" class="mine">收藏</div>
    <div v-show="tabIndex == 2" class="mine">评论</div>
    <div v-show="tabIndex == 3" class="mine">点赞</div>
  </div>
</template>

<script>
export default {
  name: 'TopicMine',

  data() {
    return {
      // 右下部分标签页下标
      tabIndex: 0
    }
  }
}
</script>

<style scoped>
	.content3 {
		width: 315px;
		height: calc(100vh - 367px);
		box-shadow: 0 0 10px #f0f0f0;
		margin-top: 15px;
		padding: 20px;
	}

	.tabBar {
		font-size: 12px;
		text-align: center;
		transition: all .3s;
		cursor: pointer;
	}

	.active {
		font-size: 14px;
		font-weight: 700;
	}

	.mine {
		font-size: 50px;
		font-weight: 900;
		text-align: center;
		transform: translateY(80px);
	}
</style>
