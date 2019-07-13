<template>
  <div class="content">
    <!-- 表格部分 -->
    <topicTable :show-create="showCreate" @changeStatus="changeStatus" />

  </div>
</template>

<script>
import topicTable from './components/topic_table.vue'

export default {
  name: 'Index',

  components: {
    topicTable
  },

  data() {
    return {
      // 是否展示新建或编辑框
      showCreate: false
    }
  },

  mounted() {

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
		justify-content: space-between;
	}
</style>
