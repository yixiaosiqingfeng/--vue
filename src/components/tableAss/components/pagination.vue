// 分页
<template>
  <div style="display:flex;justify-content: center;">
    <el-pagination
      :current-page="pagData.currentPage"
      :page-sizes="pageSizes"
      :page-size="pagData.pageSize"
      :layout="layout"
      :total="pagData.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    pageSizes: {
      type: Array,
      default() {
        return [10, 15, 20, 25]
      }
    },
    total: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    }
  },
  data() {
    return {
      currentPage4: 4,
      pagData: {
        currentPage: 1,
        pageSize: 10,
        total: 12
      }
    }
  },
  watch: {
    total() {
      this.pagData.pageSize = this.pageSize
      this.pagData.currentPage = this.currentPage
      this.pagData.total = this.total
    },
    pageSize() {
      this.pagData.pageSize = this.pageSize
    },
    currentPage() {
      this.pagData.currentPage = this.currentPage
    }
  },
  mounted() {
    this.pagData.pageSize = this.pageSize
    this.pagData.currentPage = this.currentPage
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('handleSizeChange', val)
    },
    handleCurrentChange(val) {
      this.$emit('handleCurrentChange', val)
    }
  }
}
</script>

<style scoped>

</style>
