<template>
  <div style="position: relative;" class="huatiClass">
    <!-- 头部搜索部分 -->
    <ficaHeader @searchFn="searchFn" />
    <!-- 当前已筛选出来的数据统计 -->
    <div class="add_btn_box">
      <p style="font-size:12px;color:#999;" class="ml10">共找到22条数据</p>
      <div>
        <el-popover
          v-model="popover"
          placement="bottom-end"
          width="400"
          trigger="click"
        >
          <div>
            <h3 class="mb20">新增分类</h3>
            <el-form ref="ruleForm" :model="ruleForm.data" :rules="rules" label-width="100px" class="demo-ruleForm">
              <el-form-item label="分类名称" prop="name">
                <el-input v-model="ruleForm.data.name" />
              </el-form-item>
              <el-form-item label="备注" prop="note">
                <el-input v-model="ruleForm.data.note" type="textarea" />
              </el-form-item>
              <el-form-item label="图片" prop="imgPath">
                <div style="width:82px;overflow:hidden;">
                  <el-upload
                    class="avatar-uploader"
                    :action="queryUrl"
                    :show-file-list="false"
                    :data="{type:1}"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img
                      v-if="ruleForm.data.imgPath"
                      :src="getUrl(ruleForm.data.imgPath)"
                      class="avatar"
                    >
                    <i v-else class="el-icon-plus avatar-uploader-icon" />
                  </el-upload>
                </div>
              </el-form-item>
              <el-form-item>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">创建</el-button>
              </el-form-item>
            </el-form>
          </div>
          <el-button slot="reference" type="text" class="mr30">新增<i class="el-icon-arrow-down el-icon--right" />
          </el-button>
        </el-popover>
      </div>
    </div>
    <!--表格部分-->
    <div>
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          label="图片"
          width="100"
        >
          <template slot-scope="scope">
            <div class="modify">
              <div v-show="scope.row.flag" style="width:69px;height:80px;">
                <el-upload
                  class="avatar-uploader"
                  :action="queryUrl"
                  :show-file-list="false"
                  :data="{type:1}"
                  :on-success="handleAvatarSuccess1"
                  :before-upload="beforeAvatarUpload"
                >
                  <img
                    v-if="scope.row.imgPath"
                    :src="getUrl(scope.row.imgPath)"
                    class="avatar"
                    style="width:75px;height:75px;"
                  >
                  <i v-else class="el-icon-plus avatar-uploader-icon" />
                </el-upload>
              </div>
              <div v-show="!scope.row.flag" style="width:69px;height:80px;">
                <img v-if="scope.row.imgPath" :src="scope.row.imgPath" class="avatar" width="100%" height="100%">
                <div v-else style="width:69px;height:80px;" />
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
          label="话题数"
        />
        <el-table-column
          prop="createrName"
          label="创建人"
        />
        <el-table-column
          prop="createDate"
          label="创建时间"
        />
        <el-table-column
          prop="createDate"
          width="150"
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
  </div>
</template>

<script>
import ficaHeader from './compontents/fica_header'
import pagin from '@/components/tableAss/components/pagination'
import {
  addCategory,
  categoryList,
  delCategory,
  updateCategory
} from '@/api/fica'

export default {
  components: { ficaHeader, pagin },
  data() {
    return {
      urlsuccess: false,
      // 表格参数
      total: 0,
      loading: true,
      tableData: [],
      // 新增框的控制开关
      popover: false,
      // 列表请求参数
      queryData: {
        data: {
          name: ''
        },
        limit: 10,
        page: 1,
        code: '2286'
      },
      // 新增参数
      ruleForm: {
        data: {
          name: '',
          note: '',
          createrName: '',
          imgPath: ''
        },
        code: '2289'
      },
      // 验证规则
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
      },
      // 修改数据
      modifyData: null,
      modifyFlag: true
    }
  },
  computed: {
    queryUrl() {
      // return process.env.VUE_APP_BASE_API + '/common/upload_v1'
      return 'http://192.168.0.14:8084/common/upload_v1'
    }
  },
  created() {
    this.initData()
  },
  methods: {
    getQueryData(obj) {
      obj.data.name = obj.data.name === '' ? null : obj.data.name
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
    // 上传函数
    handleAvatarSuccess(res, file) {
      console.log(res, 666)
      if (res.success && res.errorCode === 0) {
        this.urlsuccess = true
        this.ruleForm.data.imgPath = res.data ? res.data.realPath : ''
      }
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
        this.modifyData.imgPath = res.data ? process.env.VUE_APP_BASE_API + res.data.realPath : ''
      }
    },
    // 创建函数
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.data.createrName = this.$store.getters.userInFo.username + 'qwdq'
          console.log(this.ruleForm, 55555)
          addCategory(this.ruleForm).then(res => {
            if (res.success && res.errorCode === 0) {
              this.popover = false
              this.urlsuccess = false
              this.resetForm('ruleForm')
              this.initData()
            }
            console.log(res)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 重置按钮
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    modifyFn(obj) {
      if (this.modifyFlag) {
        obj.flag = true
        this.modifyData = obj
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
      var re = new RegExp('^' + process.env.VUE_APP_BASE_API)
      if (data.data.imgPath) {
        data.data.imgPath = data.data.imgPath.replace(re, '')
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
      this.$confirm('确定要保存修改吗？', '提示', {
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
    getUrl(url) {
      return process.env.VUE_APP_BASE_API + url
    },
    searchFn() {
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
<style lang="scss">
  .huatiClass {
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }

    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 80px;
      height: 80px;
      line-height: 80px;
      text-align: center;
    }

    .avatar {
      width: 80px;
      height: 80px;
      display: block;
    }

    .modify {
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 60px;
        height: 60px;
        line-height: 60px;
        text-align: center;
      }
    }
  }
</style>
