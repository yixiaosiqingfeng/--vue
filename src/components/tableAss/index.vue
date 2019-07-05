<template>
  <div>
    <tableAss
      :loading="loading"
      :table-data="tableData"
      :table-config="tableConfig"
      @popupFn="popupFn"
    >
      <template slot="footer" slot-scope="scope">
        <slot name="footer" :row="scope.row" :$index="scope.$index" />
      </template>
      <template slot="header" slot-scope="scope">
        <slot name="header" :scope="scope" />
      </template>
    </tableAss>
    <pagination
      :total="tableQuery.total"
      :page-size="tableQuery.pageSize"
      :current-page="tableQuery.currentPage"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    />
  </div>
</template>

<script>

import pagination from './components/pagination'
import tableAss from './components/tableAss'
import { getTable } from '@/api/table'

export default {
  name: 'Index',
  components: { pagination, tableAss },
  props: {
    tableConfig: {
      type: Array,
      default() {
        return [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }
        ]
      }
    },
    path: {
      type: String,
      default: ''
    },
    queryData: {
      type: Object,
      default() {
        return {
          limit: 5,
          page: 2,
          data: {}
        }
      }
    },
    target: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableData: null,
      loading: true,
      tableQuery: {
        total: 1,
        pageSize: 5,
        currentPage: 1
      },
      itData: null
    }
  },
  watch: {
    target() {
      this.itData = this.queryData
      this.tableQuery.pageSize = this.itData.limit
      this.tableQuery.currentPage = this.itData.page
      this.initData()
    }
  },
  mounted() {
    this.itData = this.queryData
    this.tableQuery.pageSize = this.itData.limit
    this.tableQuery.currentPage = this.itData.page
    this.initData()
  },
  methods: {
    handleSizeChange(val) {
      this.tableQuery.pageSize = val
      this.itData.limit = val
      this.initData()
    },
    handleCurrentChange(val) {
      this.tableQuery.currentPage = val
      this.itData.page = val
      this.initData()
    },
    initData() {
      getTable(this.itData, this.path).then(res => {
        this.tableData = res.data
        this.tableQuery.total = res.total
        this.loadingFn()
      })
    },
    popupFn(boo) {
      this.$emit('popupFn', boo)
    },
    loadingFn() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 400)
    }
  }
}
</script>

<style scoped>

</style>
