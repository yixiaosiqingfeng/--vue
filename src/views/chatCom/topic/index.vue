<template>
  <div class="content" @click="showCreate = false">
    <!-- 表格部分 -->
    <topicTable :show-create="showCreate" @changeStatus="changeStatus" />
    <div>
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
		padding: 20px;
		justify-content: space-around;
	}
</style>
