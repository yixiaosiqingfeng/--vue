<template>
  <div class="topic_maxbox">
    <!-- 搜索 -->
    <div class="topic_input">
      <el-input v-model="selectTopic" placeholder="请输入内容" class="input-with-select" size="mini">
        <el-button slot="append" icon="el-icon-search" @click="getTopic" />
      </el-input>
    </div>
    <!-- 话题 -->
    <div>
      <ul>
        <li v-for="item in topicList" :key="item.id" class="topic_list" @click="selection(item.id,item.title)">
          <span>#{{ item.title }}#</span>
          <span>热度：{{ item.hot }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { addTopic } from '../../../../api/postman'
export default {
  data() {
    return {
      selectTopic: '',
      topicList: []
    }
  },
  methods: {
    getTopic() {
      const t = {
        code: 2291,
        data: {
          // title:this.selectTopic
        },
        limit: 100,
        page: 1
      }
      addTopic(t).then(res => {
        if (res.success && res.errorCode === 0) {
          this.topicList = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    selection(i, t) {
      console.log(i, t, 9999999)
      this.$emit('topic', i, t)
    }
  }
}
</script>
<style scoped>
.topic_maxbox {
  width: 230px;
  min-height: 100px;
  background-color: #eee;
  text-align: center;
}
.topic_input {
  margin: 10px;
}
.topic_list{
  display: flex;
  justify-content: space-between;
  margin: 10px;
  cursor: pointer;
}
</style>
