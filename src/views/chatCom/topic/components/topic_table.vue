<template>
  <div class="content1" style="padding:10px 5px 0 9px;">
    <div class="searchBox">
      <!-- 搜索框 -->
      <div style="width: 220px;">
        <el-input
          ref="searchInput"
          v-model="queryData.data.title"
          size="mini"
          placeholder="请输入关键字"
          clearable
          @keyup.enter.native="initData"
          @clear="initData"
        >
          <el-button slot="append" icon="el-icon-search" @click="initData" />
        </el-input>
      </div>
      <!-- 筛选 -->
      <div style="margin-right: 10px;">
        <el-dropdown style="margin-right: 10px;" trigger="click" size="mini" @command="screenSelect">
          <span class="el-dropdown-link" style="color:#999;">
            筛选:
            <el-button type="text"><span style="color:#999;">{{ screen }}<i class="el-icon-arrow-down el-icon--right" /></span></el-button>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="0">热门</el-dropdown-item>
            <el-dropdown-item :command="1">非热门</el-dropdown-item>
            <el-dropdown-item :command="2">置顶</el-dropdown-item>
            <el-dropdown-item :command="3">非置顶</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown style="margin-right: 10px;" trigger="click" size="mini" @command="screenSelect1">
          <span class="el-dropdown-link">
            <el-button type="text"><span style="color:#999;">{{ screen1 }}<i class="el-icon-arrow-down el-icon--right" /></span></el-button>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="0">按时间</el-dropdown-item>
            <el-dropdown-item :command="1">按倒序</el-dropdown-item>
            <el-dropdown-item :command="2">按热度</el-dropdown-item>
            <el-dropdown-item :command="3">按关注数</el-dropdown-item>
            <el-dropdown-item :command="4">按互动数</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button
          type="text"
          class="mr10"
          size="mini"
          @click.stop="addFn"
        >新建<i class="el-icon-plus" />
        </el-button>
      </div>
    </div>
    <!-- 数据条数 -->
    <div style="color: #909399;font-size: 12px;height: 40px;line-height: 40px;margin-left: 10px;">
      共<span style="color: orange;font-weight:500;">{{ tableData.length }}</span>条数据
    </div>
    <!-- 新建 -->
    <div style="position: relative;">
      <transition name="el-zoom-in-top">
        <div v-show="showCreate" class="createData" style="width:550px;" @click.stop="$emit('changeStatus', true)">
          <p v-show="!isEdit" style="font-size: 18px;margin: 10px;">新建话题</p>
          <p v-show="isEdit" style="font-size: 18px;margin: 10px;">编辑话题</p>
          <!-- 填写表单 -->
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
            <el-form-item label="分类" prop="socialId">
              <el-select
                v-model="ruleForm.socialId"
                clearable
                size="mini"
                filterable
                placeholder="请选择分类"
                style="width: 120px;"
              >
                <el-option v-for="item in classifyList" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
            <el-form-item label="话题名称" prop="title">
              <el-input v-model="ruleForm.title" style="width:120px;" placeholder="请输入话题名称" size="mini" />
            </el-form-item>
            <el-form-item label="简介" prop="intoduce">
              <el-input v-model="ruleForm.intoduce" placeholder="请输入简介内容" type="textarea" />
            </el-form-item>
            <el-form-item label="生效时间">
              <el-radio-group v-model="ruleForm.timeStatus">
                <el-radio :label="false">永久</el-radio>
                <el-radio :label="true">选择时间</el-radio>
              </el-radio-group>
              <div v-if="ruleForm.timeStatus" style="display:flex;">
                <el-form-item prop="createDate">
                  <el-date-picker
                    v-model="ruleForm.effectTime"
                    size="mini"
                    type="datetime"
                    placeholder="开始时间"
                    :picker-options="pickerOptionsStart"
                    value-format="yyyy-MM-dd HH:mm"
                    format="yyyy-MM-dd HH:mm"
                    style="width: 100%;"
                    @change="changeEnd"
                  />
                </el-form-item>
                -
                <el-form-item prop="invalidDate">
                  <el-date-picker
                    v-model="ruleForm.invalidDate"
                    size="mini"
                    :picker-options="pickerOptionsEnd"
                    type="datetime"
                    placeholder="结束时间"
                    value-format="yyyy-MM-dd HH:mm"
                    format="yyyy-MM-dd HH:mm"
                    style="width: 100%;"
                  />
                </el-form-item>
              </div>
            </el-form-item>
            <el-form-item label="发起人" prop="ownerName">
              <el-avatar
                size="small"
                :src="initPhoto?initPhoto:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
                class="avatar"
              />
              <el-dropdown trigger="click" style="vertical-align: middle;" @command="selectInitiator">
                <span class="el-dropdown-link">
                  {{ ruleForm.ownerName?ruleForm.ownerName:'无数据' }}<i class="el-icon-arrow-down el-icon--right" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="(item, index) in userList" :key="index" :command="item">
                    <el-avatar
                      v-if="item.photo"
                      size="small"
                      :src="item.photo"
                      class="avatar"
                    />
                    <el-avatar
                      v-else
                      size="small"
                      src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                      class="avatar"
                    />
                    {{ item.nickname }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-form-item>
            <el-form-item label="发帖权限" prop="jurisdiction">
              <el-radio-group v-model="ruleForm.jurisdiction">
                <el-radio :label="10">任何人</el-radio>
                <el-radio :label="20">需关注</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="封面图" prop="background">
              <el-upload
                class="cover-uploader"
                :action="queryUrl"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :headers="headers"
                :data="resData"
              >
                <img v-if="ruleForm.background" :src="ruleForm.background" class="cover">
                <i v-else class="el-icon-plus cover-uploader-icon" />
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button v-show="!isEdit" type="primary" @click.stop="submitForm('ruleForm')">立即创建</el-button>
              <el-button v-show="isEdit" type="primary" @click.stop="submitForm('ruleForm')">确定编辑</el-button>
              <el-button @click.stop="resetForm('ruleForm')">重置</el-button>
              <el-button @click.stop="showCreate=false">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </transition>
      <!-- 表格 -->
      <!-- height="calc(100vh - 286px)" -->
      <el-table v-loading="loading" :data="tableData" stripe :border="false">
        <el-table-column label="封面图">
          <template slot-scope="scope">
            <div>
              <el-image :src="scope.row.background" fit="cover" />
              <span
                v-show="scope.row.isTop"
                class="iconfont icon-zhiding"
                style="position: absolute;top: 0;left: 0;color:red;"
              />
              <span
                v-show="scope.row.isPopular"
                class="iconfont icon-remen"
                style="position: absolute;top: 0;right: 0;color:red;"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="话题名称" />
        <el-table-column prop="ownerName" label="发起人" width="70" />
        <el-table-column prop="effectTime" label="生效时间">
          <template slot-scope="scope">
            <div>
              {{ scope.row.timeStatus?scope.row.effectTime:'永久生效' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="invalidDate" label="失效时间">
          <template slot-scope="scope">
            <div>
              {{ scope.row.timeStatus?scope.row.invalidDate:'永久生效' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="goodClickCount" label="关注数" width="70" />
        <el-table-column prop="commentCount" label="互动数" width="70" />
        <el-table-column label="操作" width="240">
          <template slot-scope="scope">
            <el-button type="text" @click.stop="handleEdit(scope.row)">编辑</el-button>
            <el-button type="text" @click="handleDelete( scope.row)">删除</el-button>
            <el-button type="text" @click="placement(scope.row)">{{ scope.row.isTop?'取消置顶':'置顶' }}</el-button>
            <el-button type="text" @click="popularFn(scope.row)">{{ scope.row.isPopular?'取消热门':'标记热门' }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div>
        <pagin
          class="mt10"
          :total="total"
          :page-size="pageSize"
          :current-page="currentPage"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import pagin from '@/components/tableAss/components/pagination'
import {
  topic_select,
  topic_add,
  topic_update,
  topic_delete,
  classify_select,
  placementApi,
  popularApi
} from '@/api/topic'
import { getToken } from '@/utils/auth'
import { initiatorApi } from '@/api_new/topic'

export default {
  name: 'TopicTable',
  components: { pagin },
  data() {
    return {
      // 发起人初始头像
      initPhoto: '',
      // 搜索关键字
      // 是否为编辑状态
      isEdit: false,
      showCreate: false, // 显示或隐藏弹框
      // 分页下标
      currentPage: 1,
      // 每页显示的条数
      pageSize: 10,
      total: 0,
      // 是否处于加载状态
      loading: false,
      // 筛选
      screen: '热门',
      screen1: '按时间',
      // 上传图片
      headers: {
        token: getToken()
      },
      resData: {
        type: 1
      },
      // 用户列表
      userList: [],
      // 分类列表
      classifyList: [],
      // 表单数据
      ruleForm: {
        title: '', // String,话题名（必填）
        background: '', // binary,背景图片
        note: '', // String,备注
        ownerId: '', // String,发起人id(必传)
        ownerName: '', // String,发起人姓名(必传)
        isTop: '', // int,是否置顶，默认0,1置顶
        locationName: '', // String,区域名
        socialId: '', // String,圈子id(必传)
        logo: '', // String,话题logo
        intoduce: '', // String,简介(必传)
        hot: '', // "int,热度值，默认0
        forumCount: '', // int,帖子数
        invalidDate: '', // date,失效时间
        jurisdiction: 10, // int,发帖权限  默认10 所有人，20 仅关注
        imgPath: '', // String,图片路径
        timeStatus: false, // String,图片路径
        effectTime: '', // 生效时间
        id: '' // 话题ID
      },
      // 时间限制
      pickerOptionsStart: {
        disabledDate(time) {
          return time.getTime() < new Date(new Date().toLocaleDateString()).getTime()
        }
      },
      pickerOptionsEnd: {
        disabledDate(time) {
          return time.getTime() < new Date(new Date().toLocaleDateString()).getTime()
        }
      },
      // 表单验证
      rules: {
        title: [{ required: true, message: '名称不能为空' }],
        intoduce: [{ required: true, message: '简介不能为空' }],
        background: [{ required: true, message: '请上传封面图' }],
        ownerName: [{ required: true, message: '请选择发起人' }],
        socialId: [{ required: true, message: '请选择分类' }],
        jurisdiction: [{ required: true, message: '请选择发帖权限' }],
        effectTime: [{ required: true, message: '请选择开始时间' }],
        invalidDate: [{ required: true, message: '请选择结束时间' }]
      },
      // 话题数据
      tableData: [],
      // 查询数据
      queryData: {
        data: {
          title: null,
          screen: 0,
          sortOrder: 0
        },
        limit: 10,
        page: 1,
        code: '2291'
      }
    }
  },
  computed: {
    queryUrl() {
      return process.env.VUE_APP_BASE_API + '/common/upload_v1'
      // return 'http://192.168.0.14:8084/common/upload_v1'
    },
    url() {
      return 'http://192.168.0.254/changjia/static/'
    }
  },
  created() {
    this.initPhoto = this.$store.getters.userInFo.photo
    this.ruleForm.ownerName = this.$store.getters.userInFo.userName
    this.initData()
    this.initiator()
    document.addEventListener('click', () => {
      this.showCreate = false
    }, false)
    this.selectClassify()
  },
  methods: {
    // 发起人请求数据  nickname
    initiator() {
      const data = {
        code: '1810',
        data: {
          appAccountId: this.$store.getters.userInFo.appAccountId
        }
      }
      initiatorApi(data).then(res => {
        if (res.success && res.errorCode === 0) {
          this.userList = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 选择发起人
    selectInitiator(item) {
      console.log()
      this.initPhoto = item.photo
      this.ruleForm.ownerId = item.id
      this.ruleForm.ownerName = item.nickname
    },
    // 查询话题
    selectTopic(obj) {
      obj.data.title = obj.data.title ? obj.data.title.trim() : null
      topic_select(obj).then(res => {
        if (res.errorCode === 0 && res.success) {
          this.tableData = []
          this.total = res.total
          this.tableData = res.data
          this.loadingFn()
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'error'
          })
        }
      })
    },
    initData() {
      this.selectTopic(JSON.parse(JSON.stringify(this.queryData)))
    },
    // 筛选
    screenSelect(val) {
      const obj = {
        '0': '热门',
        '1': '非热门',
        '2': '置顶',
        '3': '非置顶'
      }
      if (this.screen === obj[val]) {
        return
      }
      this.screen = obj[val]
      this.queryData.data.screen = val
      this.initData()
    },
    screenSelect1(val) {
      const obj = {
        '0': '按时间',
        '1': '按倒序',
        '2': '按热度',
        '3': '按关注数',
        '4': '按互动数'
      }
      if (this.screen1 === obj[val]) {
        return
      }
      this.screen1 = obj[val]
      this.queryData.data.sortOrder = val
      this.initData()
    },
    // 新增按钮函数
    addFn() {
      this.showCreate = true
      this.isEdit = false
    },
    // 查询分类
    selectClassify() {
      const requestSelect = {
        data: {},
        code: '2286'
      }
      classify_select(requestSelect).then(res => {
        if (res.errorCode === 0 && res.success) {
          this.classifyList = res.data
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'error'
          })
        }
      })
    },
    // 结束时间限制开始时间
    changeEnd() {
      this.pickerOptionsEnd = Object.assign({}, this.pickerOptionsEnd, {
        disabledDate: (time) => {
          return time.getTime() < new Date(this.ruleForm.effectTime).getTime()
        }
      })
    },
    // 新增话题函数在提交里面调用
    addTopic() {
      const obj = {}
      for (const a in this.ruleForm) {
        obj[a] = this.ruleForm[a]
      }
      const requestAdd = {
        data: obj,
        code: '2295'
      }
      topic_add(requestAdd).then(res => {
        if (res.errorCode === 0 && res.success) {
          this.showCreate = false
          this.resetForm('ruleForm')
          this.$message({
            message: '创建成功',
            type: 'success'
          })
          this.initData()
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'error'
          })
        }
      })
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            this.updateTopic()
          } else {
            // 新增
            this.addTopic()
          }
        } else {
          this.$message('error submit!!')
          return false
        }
      })
    },
    // 重置及取消
    resetForm(formName, flag) {
      this.$refs[formName].resetFields()
      if (flag) {
        this.$emit('changeStatus', false)
      }
    },
    // 进入编辑状态
    handleEdit(info) {
      this.showCreate = true
      for (const i in this.ruleForm) {
        this.ruleForm[i] = info[i]
      }
      this.isEdit = true
    },
    // 删除
    handleDelete(info) {
      this.$confirm('真的要删除吗？')
        .then(r => {
          this.deleteTopic(info.id)
        })
        .catch(_ => {
        })
    },
    // 上传的图片路径
    handleAvatarSuccess(res, file) {
      this.ruleForm.background = res.data ? this.url + res.data.realPath + res.data.fileName : ''
      console.log(this.ruleForm.background, 777)
    },
    // 图片格式验证
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传封面图片只能是 JPG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传封面图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },

    // 删除话题
    deleteTopic(deleteId) {
      const requestDelete = {
        data: {
          id: deleteId
        },
        code: '2294'
      }
      topic_delete(requestDelete).then(res => {
        if (res.errorCode === 0 && res.success) {
          this.initData()
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'error'
          })
        }
      })
    },
    // 修改话题
    updateTopic() {
      const requestUpdate = {
        data: this.ruleForm,
        code: '2293'
      }
      topic_update(requestUpdate).then(res => {
        if (res.errorCode === 0 && res.success) {
          this.isEdit = false
          this.showCreate = false
          this.$message({
            message: '修改',
            type: 'success'
          })
          this.initData()
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'error'
          })
        }
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      console.log(666)
      this.selectTopic()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.selectTopic()
    },
    // 请求动画
    loadingFn() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 400)
    },
    // 置顶
    placement(obj) {
      const data = {
        data: {
          id: obj.id,
          isTop: !obj.isTop
        },
        code: '2605'
      }
      placementApi(data).then(res => {
        if (res.errorCode === 0 && res.success) {
          this.initData()
          this.$message({
            message: '置顶成功',
            type: 'success'
          })
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'error'
          })
        }
      })
    },
    popularFn(obj) {
      const data = {
        data: {
          id: obj.id,
          isPopular: !obj.isPopular
        },
        code: '2606'
      }
      popularApi(data).then(res => {
        if (res.errorCode === 0 && res.success) {
          this.initData()
          this.$message({
            message: '标记成功',
            type: 'success'
          })
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'error'
          })
        }
      })
    }
  }
}
</script>
<style scoped>
  .content1 {
    width: 100%;
    height: calc(100vh - 130px);
    overflow-y: scroll;
    box-shadow: 0 0 10px #f0f0f0;
  }

  .content1::-webkit-scrollbar {
    display: none
  }

  .searchBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .el-select {
    width: 80px;
  }

  .createData {
    box-shadow: 0 0 15px #ccc;
    border-radius: 3px;
    background: #fff;
    position: absolute;
    left: 15%;
    top: 0;
    z-index: 2;
    padding: 20px;
  }

  .td {
    border-left: none;
    border-right: none;
  }

  .cover-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 100px;
    height: 100px;
  }

  .cover-uploader:hover {
    border-color: #409EFF;
  }

  .cover-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }

  .cover {
    width: 100px;
    height: 100px;
    display: block;
  }

  .avatar {
    vertical-align: middle;
    margin: 5px 10px 5px 0;
    height: 28px;
    width: 28px;
  }

  .el-table_1_column_1 {
    position: relative;
  }
</style>
