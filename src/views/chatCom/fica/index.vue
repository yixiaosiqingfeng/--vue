<template>
  <div style="position: relative;padding:0 5px;" class="huatiClass">
    <!-- 头部搜索部分 -->
    <ficaHeader @searchFn="searchFn" @sortFn="sortFn" @updateData="updateData" />
    <!-- 当前已筛选出来的数据统计 -->
    <div class="add_btn_box">
      <p style="font-size:12px;color:#999;" class="ml10 mt10 mb10">共找到<i style="color: orange;font-weight:500;">{{ total }}</i>条数据</p>
    </div>
    <!--表格部分-->
    <div class="ml5">
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          label="分类图片"
          width="100"
        >
          <template slot-scope="scope">
            <div class="modify">
              <div v-show="scope.row.flag" style="width:40px;height:50px;">
                <el-upload
                  class="avatar-uploader"
                  :action="queryUrl"
                  :show-file-list="false"
                  :data="{type:1}"
                  :accept="accept"
                  :on-success="handleAvatarSuccess1"
                  :before-upload="beforeAvatarUpload"
                >
                  <img
                    v-if="scope.row.imgPath"
                    :src="scope.row.imgPath"
                    class="avatar"
                    style="width:45px;height:45px;"
                  >
                  <i v-else class="el-icon-plus avatar-uploader-icon" />
                </el-upload>
              </div>
              <div v-show="!scope.row.flag" style="width:50px;height:50px;">
                <img
                  v-if="scope.row.imgPath"
                  :src="scope.row.imgPath"
                  class="avatar"
                  width="50"
                  height="50"
                  style="cursor:pointer;"
                  @click="queryImgFn(scope.row.imgPath)"
                >
                <div v-else style="width:50px;height:50px;" />
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="分类名称"
          width="180"
        >
          <template slot-scope="scope">
            <div>
              <el-input v-show="scope.row.flag" v-model="scope.row.name" size="mini" />
              <span v-show="!scope.row.flag">{{ scope.row.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="备注"
        >
          <template slot-scope="scope">
            <div>
              <el-input v-show="scope.row.flag" v-model="scope.row.note" size="mini" />
              <span v-show="!scope.row.flag">{{ scope.row.note }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="topicCount"
          width="70"
          label="话题数"
        />
        <el-table-column
          width="80"
          prop="createrName"
          label="创建人"
        />
        <el-table-column
          width="150"
          prop="createDate"
          label="创建时间"
        />
        <el-table-column
          prop="createDate"
          width="140"
          label="操作"
        >
          <template slot-scope="scope">
            <div>
              <el-button v-show="!scope.row.flag" type="text" @click="modifyFn(scope.row)">修改</el-button>
              <el-button v-show="scope.row.flag" type="text" @click="saveFn(scope.row)">保存修改</el-button>
              <el-button v-show="scope.row.flag" type="text" @click="closeFn(scope.row)">取消</el-button>
              <el-button v-show="!scope.row.flag" type="text" @click="deleteFn(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页部分-->
    <pagin
      class="mt10"
      :total="total"
      :page-size="queryData.limit"
      :current-page="queryData.page"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    />
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import ficaHeader from './compontents/fica_header'
import pagin from '@/components/tableAss/components/pagination'
import {
  categoryList,
  delCategory,
  updateCategory
} from '@/api/fica'

export default {
  components: { ficaHeader, pagin },
  data() {
    return {
      accept: '.png,.jpg',
      dialogVisible: false,
      dialogImageUrl: '',
      // 服务器地址
      yunUrl: 'http://192.168.0.254/changjia/static/',
      // 表格参数
      total: 0,
      loading: true,
      tableData: [],
      // 新增框的控制开关
      popover: false,
      // 列表请求参数
      queryData: {
        data: {
          name: '',
          sortOrderByTime: null,
          sortOrderByTopic: null
        },
        limit: 10,
        page: 1,
        code: '2286'
      },

      // 修改数据
      modifyData: null,
      modifyFlag: true,
      initModifyUrl: '',
      initModifyname: '',
      initModifynote: ''
    }
  },
  computed: {
    queryUrl() {
      return process.env.VUE_APP_BASE_API + '/common/upload_v1'
      // return 'http://192.168.0.14:8084/common/upload_v1'
    }
  },
  created() {
    this.popover = true
    this.initData()
  },
  methods: {
    getQueryData(obj) {
      obj.data.name = obj.data.name ? obj.data.name.trim() : null
      categoryList(obj).then(res => {
        if (res.success && res.errorCode === 0) {
          this.total = res.total
          res.data.forEach(tim => {
            tim.flag = false
          })
          this.tableData = res.data
          this.loadingFn()
        }
      })
    },
    // 初始化数据
    initData() {
      this.getQueryData(this.queryData)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG /PNG格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleAvatarSuccess1(res, file) {
      if (res.success && res.errorCode === 0) {
        this.modifyData.imgPath = res.data ? this.yunUrl + res.data.realPath + res.data.fileName : ''
      }
    },
    modifyFn(obj) {
      if (this.modifyFlag) {
        obj.flag = true
        this.modifyData = obj
        this.initModifyUrl = obj.imgPath
        this.initModifyname = obj.name
        this.initModifynote = obj.note
        this.modifyFlag = false
      } else {
        this.$message.error('请把上一条修改完成或取消')
      }
    },
    // 保存修改接口
    saveFn(obj) {
      const data = {
        data: {
          id: '',
          name: '',
          status: '',
          imgPath: '',
          note: ''
        },
        code: '2288'
      }
      for (const a in data.data) {
        data.data[a] = obj[a]
      }
      if (data.data.name === '') {
        this.$message.error('分类名称不能为空哦！')
        return
      }
      this.$confirm('确定要保存修改吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateCategory(data).then(res => {
          if (res.success && res.errorCode === 0) {
            obj.flag = false
            this.modifyFlag = true
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改'
        })
      })
    },
    // 取消函数
    closeFn(obj) {
      obj.flag = false
      obj.imgPath = this.initModifyUrl
      obj.name = this.initModifyname
      obj.note = this.initModifynote
      this.modifyFlag = true
    },
    // 删除接口
    deleteFn(obj) {
      const data = {
        data: {
          id: obj.id
        },
        code: '2287'
      }
      this.$confirm('确定要删除吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delCategory(data).then(res => {
          if (res.success && res.errorCode === 0) {
            obj.flag = false
            this.initData()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 分页
    handleSizeChange(val) {
      this.queryData.limit = val
      this.initData()
    },
    handleCurrentChange(val) {
      this.queryData.page = val
      this.initData()
    },
    // 请求动画
    loadingFn() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 400)
    },
    searchFn(val) {
      this.queryData.data.name = val
      this.initData()
    },
    queryImgFn(url) {
      this.dialogImageUrl = url
      this.dialogVisible = true
    },
    sortFn(obj) {
      this.queryData.data.sortOrderByTopic = obj.sortOrderByTopic
      this.queryData.data.sortOrderByTime = obj.sortOrderByTime
      this.initData()
    },
    updateData() {
      this.initData()
    }
  }
}
</script>

<style scoped>
  .add_btn_box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
<style>
  .huatiClass .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .huatiClass .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .huatiClass .avatar {
    width: 50px;
    height: 50px;
    display: block;
  }

  .huatiClass .modify .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }

</style>
