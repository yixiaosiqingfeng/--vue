<template>
  <div class="fica_header mt10 huatiClass_add">
    <div class="ml5">
      <div class="el-input">
        <el-input
          v-model="value"
          size="mini"
          clearable
          placeholder="请输入内容"
          class="input-with-select"
          @keyup.enter.native="submit"
          @clear="submit"
        >
          <el-button slot="append" icon="el-icon-search" @click="submit" />
        </el-input>
      </div>
    </div>
    <div>
      <el-dropdown trigger="click" @command="handleCommand">
        <div class="el-dropdown-link" style="cursor:pointer;">
          <el-button type="text">{{ message }}<i class="el-icon-arrow-down el-icon--right" /></el-button>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="按最新">按最新</el-dropdown-item>
          <el-dropdown-item command="按话题数">按话题数</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-tooltip class="item" effect="dark" :content="sort" placement="top-end">
        <el-button type="text" @click="sortFn"><span class="iconfont icon-shengjiangxu" /></el-button>
      </el-tooltip>
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
              <div class="huatiClass_add">
                <el-upload
                  class="avatar-uploader"
                  :action="queryUrl"
                  :accept="accept"
                  :show-file-list="false"
                  :data="{type:1}"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img
                    v-if="ruleForm.data.imgPath"
                    width="80"
                    height="80"
                    :src="ruleForm.data.imgPath"
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
      <!--<el-button type="text" class="mr15" @click="addDialog">新增<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i></el-button>-->
    </div>
  </div>
</template>
<script>
import { addCategory } from '@/api/fica'

export default {
  data() {
    return {
      value: '',
      message: '按最新',
      sort: '升序',
      searchData: {
        sortOrderByTime: 0,
        sortOrderByTopic: null
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
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      },
      popover: false,
      accept: '.png,.jpg',
      yunUrl: 'http://192.168.0.254/changjia/static/'
    }
  },
  computed: {
    queryUrl() {
      return process.env.VUE_APP_BASE_API + '/common/upload_v1'
      // return 'http://192.168.0.14:8084/common/upload_v1'
    }
  },
  methods: {
    submit() {
      this.$emit('searchFn', this.value)
    },
    handleCommand(val) {
      if (this.message === val) {
        return
      }
      this.message = val
      if (val === '按最新') {
        this.searchData.sortOrderByTime = 0
        this.searchData.sortOrderByTopic = null
      } else {
        this.searchData.sortOrderByTime = null
        this.searchData.sortOrderByTopic = 0
      }
      this.sort = '升序'
      this.$emit('sortFn', this.searchData)
      // console.log(JSON.parse(JSON.stringify(this.searchData)), 666666)
    },
    sortFn() {
      this.sort = this.sort === '升序' ? '降序' : this.sort === '降序' ? '升序' : ''
      if (this.sort === '降序') {
        if (this.searchData.sortOrderByTime === 0) {
          this.searchData.sortOrderByTime = 1
          this.searchData.sortOrderByTopic = null
        } else if (this.searchData.sortOrderByTopic === 0) {
          this.searchData.sortOrderByTopic = 1
          this.searchData.sortOrderByTime = null
        }
      } else {
        if (this.searchData.sortOrderByTime === 1) {
          this.searchData.sortOrderByTime = 0
          this.searchData.sortOrderByTopic = null
        } else if (this.searchData.sortOrderByTopic === 1) {
          this.searchData.sortOrderByTopic = 0
          this.searchData.sortOrderByTime = null
        }
      }
      this.$emit('sortFn', this.searchData)
    },
    // 上传函数
    handleAvatarSuccess(res, file) {
      if (res.success && res.errorCode === 0) {
        this.ruleForm.data.imgPath = res.data ? this.yunUrl + res.data.realPath + res.data.fileName : ''
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
    // 创建函数
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.data.createrName = this.$store.getters.userInFo.username + 'qwdq'
          addCategory(this.ruleForm).then(res => {
            if (res.success && res.errorCode === 0) {
              this.popover = false
              this.resetForm('ruleForm')
              this.$emit('updateData')
            }
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
    }
  }
}
</script>
<style scoped>
  .fica_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .el-select .el-input {
    width: 80px;
  }

  .input-with-select {
    width: 300px;
  }

  /*.input-with-select .el-input-group__prepend {*/
  /*background-color: #fff;*/
  /*}*/
</style>
<style>
  .huatiClass_add .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .huatiClass_add .el-upload--text {
    border: 1px dashed #ccc;
    width: 80px;
    height: 80px;
    border-radius: 6px;
  }
  .huatiClass_add .avatar-uploader{
    height: 80px;
  }
</style>

