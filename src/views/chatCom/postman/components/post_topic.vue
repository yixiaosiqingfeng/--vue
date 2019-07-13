<template>
  <div class="topic_maxbox">
    <!-- 搜索 -->
    <div style="display: flex;justify-content: space-between;margin:10px 5px;">
      <span>选择话题</span>
      <span
        class="el-icon-close"
        style=" font-size: 18px;font-weight: 800;color:#696E78"
        @click.stop="changClose"
      />
    </div>
    <hr>
    <div class="topic_input">
      <el-input v-model="selectTopic" placeholder="请输入话题名称" class="input-with-select" size="mini">
        <el-button slot="append" icon="el-icon-search" @click="getTopic" />
      </el-input>
    </div>
    <!-- 话题 -->
    <div>
      <ul>
        <li
          v-for="item in topicList"
          :key="item.id"
          class="topic_list"
          @click="selection(item.id,item.title)"
        >
          <span>
            <el-tag type="danger">#{{ item.title }}#</el-tag>
          </span>
          <span>热度：{{ item.hot }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { addTopic } from '../../../../api/postman'
export default {
  props: {
    goTopic: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      selectTopic: '',
      topicList: [],
      topicData: {
        id: '',
        title: ''
      }
    }
  },
  watch: {
    goTopic() {
      this.autoGetTopic()
    }
  },
  methods: {
    getTopic() {
      const t = {
        code: 2291,
        data: {
          title: this.selectTopic
        },
        limit: 5,
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
    // 得到5个话题
    autoGetTopic() {
      const t = {
        code: 2291,
        data: {
          // title:this.selectTopic
        },
        limit: 5,
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
      this.topicData.id = i
      this.topicData.title = t
      this.$emit('topic', this.topicData)
    },
    changClose() {}
  }
}
</script>
<style scoped>
.topic_maxbox {
  width: 300px;
  min-height: 100px;
  background-color: #fff;
  text-align: center;
}
.topic_input {
  margin: 10px;
}
.topic_list {
  display: flex;
  justify-content: space-between;
  margin: 10px;
  cursor: pointer;
}
</style>
