<template>
  <div class="left_my">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="我的帖子" name="first">我的帖子</el-tab-pane>
      <el-tab-pane label="我的收藏" name="second">我的收藏</el-tab-pane>
      <el-tab-pane label="我的评论" name="third">我的评论</el-tab-pane>
      <el-tab-pane label="我的点赞" name="fourth">我的点赞</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'second'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
<style scoped>
.left_my {
  margin-top: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc;
  padding-left: 2px;
}
.left_my >>> .el-tabs__item {
  padding: 0 10px;
}
</style>
