<template>
  <div class="content">
    <!-- 表格部分 -->
    <topicTable :show-create="showCreate" @changeStatus="changeStatus" />
    <div style="margin-left: 15px;">
      <!-- 右上部分（统计） -->
      <topicCensus />
      <!-- 右下部分（我的） -->
      <topicMine />
    </div>
  </div>
</template>

<script>
import topicTable from './components/topic_table.vue'
import topicCensus from './components/topic_census.vue'
import topicMine from './components/topic_mine.vue'
import {
  topic
} from '@/api/topic.js'

export default {
  name: 'Index',

  components: {
    topicTable,
    topicCensus,
    topicMine
  },

  data() {
    return {
      // 是否展示新建或编辑框
      showCreate: false
    }
  },

  mounted() {
    document.addEventListener('click', () => {
      this.showCreate = false
    }, false)
  },

  created() {
    const data = {
      data: {
        name: ''
      },
      limit: 10,
      page: 1,
      code: '2286'
    }
    topic(data).then(res => {
      console.log(res)
    })
  },

  methods: {
    // 子组件用于改变父组件中的showCreate
    changeStatus(status) {
      this.showCreate = status
    }
  }
}
</script>

<style scoped>
	.content {
		display: flex;
		padding-top: 15px;
		/* justify-content: space-around; */
	}
</style>
