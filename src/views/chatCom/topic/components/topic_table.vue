<template>
  <div class="content1">
    <div class="searchBox">
      <!-- 搜索框 -->
      <div style="width: 40%;margin-left: 10px;">
        <el-input ref="searchInput" v-model="keyWord" placeholder="请输入关键字" @focus="enterSearch" @blur="catchEnter">
          <el-select slot="prepend" v-model="searchSelect" placeholder="名称" style="width: 90px;">
            <el-option label="名称" value="名称" />
            <el-option label="发起人" value="发起人" />
            <el-option label="分类" value="分类" />
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="searchTopic" />
        </el-input>
      </div>
      <!-- 筛选 -->
      <div style="margin-right: 10px;">
        筛选:
        <el-dropdown style="margin-right: 10px;" @command="screenSelect">
          <span class="el-dropdown-link">
            {{ screen }}<i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="全部">全部</el-dropdown-item>
            <el-dropdown-item command="热门">热门</el-dropdown-item>
            <el-dropdown-item command="非热门">非热门</el-dropdown-item>
            <el-dropdown-item command="置顶">置顶</el-dropdown-item>
            <el-dropdown-item command="非置顶">非置顶</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        排序:
        <el-dropdown style="margin-right: 10px;" @command="sortsSelect">
          <span class="el-dropdown-link">
            {{ sorts }}<i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="最新">最新</el-dropdown-item>
            <el-dropdown-item command="倒序">倒序</el-dropdown-item>
            <el-dropdown-item command="热度">热度</el-dropdown-item>
            <el-dropdown-item command="关注数">关注数</el-dropdown-item>
            <el-dropdown-item command="互动数">互动数</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button
          type="text"
          @click.stop="$emit('changeStatus', !showCreate)
                       isEdit=false;resetForm('ruleForm')"
        >新建
        </el-button>
      </div>
    </div>
    <!-- 数据条数 -->
    <div style="color: #909399;font-size: 12px;height: 40px;line-height: 40px;margin-left: 10px;">
      共<span style="color: #E6A23C;">{{ tableData.length }}</span>条数据
    </div>
    <div style="position: relative;">
      <!-- 新建 -->
      <transition name="el-zoom-in-top">
        <div v-show="showCreate" class="createData" @click.stop="$emit('changeStatus', true)">
          <p v-show="!isEdit" style="font-size: 18px;margin: 10px;">新建话题</p>
          <p v-show="isEdit" style="font-size: 18px;margin: 10px;">编辑话题</p>
          <!-- 填写表单 -->
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
            <el-form-item label="分类" prop="socialId">
              <el-select v-model="ruleForm.socialId" placeholder="请选择分类" style="width: 120px;">
                <el-option v-for="(item, index) in classifyList" :key="index" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
            <el-form-item label="话题名称" prop="title">
              <el-input v-model="ruleForm.title" />
            </el-form-item>
            <el-form-item label="简介" prop="intoduce">
              <el-input v-model="ruleForm.intoduce" type="textarea" />
            </el-form-item>
            <el-form-item label="时间">
              <el-col :span="11">
                <el-form-item prop="createDate">
                  <el-date-picker
                    v-model="ruleForm.createDate"
                    type="datetime"
                    placeholder="生效时间"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    style="width: 100%;"
                  />
                </el-form-item>
              </el-col>
              <el-col style="text-align: center;" :span="2">-</el-col>
              <el-col :span="11">
                <el-form-item prop="invalidDate">
                  <el-date-picker
                    v-model="ruleForm.invalidDate"
                    type="datetime"
                    placeholder="失效时间"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    style="width: 100%;"
                  />
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="发起人" prop="ownerName">
              <el-avatar
                size="small"
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                class="avatar"
              />
              <el-dropdown trigger="click" style="vertical-align: middle;" @command="selectInitiator">
                <span class="el-dropdown-link">
                  {{ ruleForm.ownerId }}<i class="el-icon-arrow-down el-icon--right" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="(item, index) in userList" :key="index" :command="item">
                    <el-avatar
                      size="small"
                      src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                      class="avatar"
                    />
                    {{ item.id }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-form-item>
            <el-form-item label="发帖权限" prop="jurisdiction">
              <el-radio-group v-model="ruleForm.jurisdiction">
                <el-radio :label="parseInt(10)">任何人</el-radio>
                <el-radio :label="parseInt(20)">需关注</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="封面图" prop="imgPath">
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
              <el-button @click.stop="resetForm('ruleForm', true)">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </transition>
      <!-- 表格 -->
      <!-- height="calc(100vh - 286px)" -->
      <el-table v-loading="loading" :data="tableData" stripe :border="false">
        <el-table-column label="封面图">
          <template slot-scope="scope">
            <el-image :src="scope.row.background" fit="cover" />
            <el-tag v-show="scope.row.isTop" type="success" size="mini" style="position: absolute;top: 0;right: 0;">置顶
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="话题名称" />
        <el-table-column prop="ownerName" label="发起人" />
        <el-table-column prop="createDate" label="生效时间" sortable />
        <el-table-column prop="invalidDate" label="失效时间" />
        <el-table-column prop="goodClickCount" label="关注数" />
        <el-table-column prop="commentCount" label="互动数" />
        <el-table-column label="操作">
          <!-- v-show="scope.$index < currentPage*pageSize && scope.$index >= (currentPage-1)*pageSize" -->
          <template slot-scope="scope">
            <el-button type="text" @click.stop="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
  classify_select
} from '@/api/topic'

import { getToken } from '@/utils/auth'

export default {
  name: 'TopicTable',
  components: { pagin },
  props: {
    showCreate: {
      type: Boolean
    }
  },

  data() {
    return {
      // 搜索关键字
      keyWord: '',
      // 搜索分类
      searchSelect: '名称',
      // 是否为编辑状态
      isEdit: false,
      // 编辑条目下标
      editIndex: -1,
      // 分页下标
      currentPage: 1,
      // 每页显示的条数
      pageSize: 10,
      total: 0,
      // 是否处于加载状态
      loading: false,
      // 筛选
      screen: '全部',
      // 排序
      sorts: '最新',
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
        background: '',
        clickCount: '',
        commentCount: '',
        createDate: '',
        createrId: '',
        forumCount: '',
        goodClickCount: '',
        hot: '',
        id: '',
        ids: '',
        intoduce: '',
        invalidDate: '',
        isDelete: false,
        isTop: false,
        jurisdiction: '',
        locationName: '',
        logo: '',
        note: '',
        operateDate: '',
        operaterId: '',
        ownerId: '',
        ownerName: '',
        shareCount: '',
        socialId: '',
        title: '',
        trunCount: ''
      },
      // 表单验证
      rules: {
        title: [{
          required: true,
          message: '名称不能为空'
        }],
        intoduce: [{
          required: true,
          message: '简介不能为空'
        }],
        imgPath: [{
          required: false,
          message: '请上传封面图'
        }],
        ownerName: [{
          required: false,
          message: '请选择发起人'
        }],
        socialId: [{
          required: true,
          message: '请选择分类'
        }],
        jurisdiction: [{
          required: true,
          message: '请选择发帖权限'
        }]
      },
      // 话题数据
      tableData: []
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
    this.selectTopic(true)
    this.selectClassify()
    this.userList.push(this.$store.getters.userInFo)
  },
  methods: {
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
          this.resetForm('ruleForm', true)
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
    handleEdit(index, info) {
      this.editIndex = index
      // this.ruleForm = info
      for (const i in this.ruleForm) {
        this.ruleForm[i] = info[i]
      }
      this.isEdit = true
      this.$emit('changeStatus', true)
    },
    // 删除
    handleDelete(index, info) {
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
    // 选择发起人
    selectInitiator(item) {
      this.ruleForm.ownerId = item.id
      this.ruleForm.ownerName = item.username
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
    // 新增话题
    addTopic() {
      const requestAdd = {
        data: {
          title: this.ruleForm.title,
          background: this.ruleForm.background,
          ownerId: this.ruleForm.ownerId,
          ownerName: this.ruleForm.ownerName,
          socialId: this.ruleForm.socialId,
          intoduce: this.ruleForm.intoduce,
          invalidDate: this.ruleForm.invalidDate,
          jurisdiction: this.ruleForm.jurisdiction
        },
        code: '2295'
      }
      topic_add(requestAdd).then(res => {
        if (res.errorCode === 0 && res.success) {
          this.$emit('changeStatus', false)
          this.selectTopic(true)
          this.$message('已添加！')
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'error'
          })
        }
      })
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
          this.selectTopic(true)
          this.$message('已删除')
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
        data: {
          title: this.ruleForm.title,
          background: this.ruleForm.background,
          socialId: this.ruleForm.socialId,
          intoduce: this.ruleForm.intoduce,
          invalidDate: this.ruleForm.invalidDate,
          jurisdiction: this.ruleForm.jurisdiction,
          id: this.ruleForm.id
        },
        code: '2293'
      }
      topic_update(requestUpdate).then(res => {
        if (res.errorCode === 0 && res.success) {
          this.isEdit = false
          this.editIndex = -1
          this.selectTopic(true)
          this.$emit('changeStatus', false)
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'error'
          })
        }
      })
    },
    // 查询话题
    selectTopic(flag) {
      const requestSelect = {
        data: flag ? {} : {
          title: this.keyWord.trim()
        },
        limit: this.pageSize,
        page: this.currentPage,
        code: '2291'
      }
      topic_select(requestSelect).then(res => {
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
    // 搜索
    searchTopic() {
      if (this.keyWord === '' || this.keyWord.trim() === '') {
        this.selectTopic(true)
      } else {
        this.selectTopic()
      }
    },
    // 回车搜索
    enterSearch() {
      document.onkeyup = event => {
        if (event.keyCode === 13) {
          this.searchTopic()
        }
      }
    },
    // input失去焦点时取消回车
    catchEnter() {
      document.onkeyup = () => {
      }
    },
    // 筛选
    screenSelect(command) {
      this.screen = command
    },
    // 排序
    sortsSelect(command) {
      this.sorts = command
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
    }
  }
}
</script>

<style scoped>
  .content1 {
    width: 73%;
    height: calc(100vh - 130px);
    overflow-y: scroll;
    box-shadow: 0 0 10px #f0f0f0;
  }

  .content1::-webkit-scrollbar {
    display: none
  }

  .searchBox {
    background: #fafafa;
    height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .el-select {
    width: 80px;
  }

  .createData {
    width: 70%;
    box-shadow: 0px 0px 10px #f0f0f0;
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
</style>
