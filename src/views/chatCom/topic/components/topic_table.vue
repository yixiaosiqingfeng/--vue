<template>
  <div class="content1">
    <div class="searchBox">
      <!-- 搜索框 -->
      <div style="width: 40%;margin-left: 10px;">
        <el-input v-model="keyWord" placeholder="请输入关键字" class="input-with-select">
          <el-select slot="prepend" v-model="searchSelect" placeholder="全部">
            <el-option label="名称" value="1" />
            <el-option label="发起人" value="2" />
            <el-option label="分类" value="3" />
          </el-select>
          <el-button slot="append" icon="el-icon-search" />
        </el-input>
      </div>
      <!-- 筛选 -->
      <div style="margin-right: 10px;">
        筛选:
        <el-dropdown style="margin-right: 10px;">
          <span class="el-dropdown-link">
            全部<i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>热门</el-dropdown-item>
            <el-dropdown-item>非热门</el-dropdown-item>
            <el-dropdown-item>置顶</el-dropdown-item>
            <el-dropdown-item>非置顶</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown style="margin-right: 10px;">
          <span class="el-dropdown-link">
            排序方式<i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>最新</el-dropdown-item>
            <el-dropdown-item>倒序</el-dropdown-item>
            <el-dropdown-item>热度</el-dropdown-item>
            <el-dropdown-item>关注数</el-dropdown-item>
            <el-dropdown-item>互动数</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button type="text" @click.stop="$emit('changeStatus', !showCreate);isEdit=false;resetForm('ruleForm')">新建</el-button>
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
            <el-form-item label="话题名称" prop="name">
              <el-input v-model="ruleForm.name" />
            </el-form-item>
            <el-form-item label="简介" prop="desc">
              <el-input v-model="ruleForm.desc" type="textarea" />
            </el-form-item>
            <el-form-item label="时间" required>
              <el-col :span="11">
                <el-form-item prop="startTime">
                  <el-date-picker v-model="ruleForm.startTime" type="datetime" placeholder="生效时间" style="width: 100%;" />
                </el-form-item>
              </el-col>
              <el-col style="text-align: center;" :span="2">-</el-col>
              <el-col :span="11">
                <el-form-item prop="endTime">
                  <el-date-picker v-model="ruleForm.endTime" type="datetime" placeholder="失效时间" style="width: 100%;" />
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="发起人" prop="initiator">
              <el-avatar size="small" :src="ruleForm.avatar" class="avatar" />
              <el-dropdown trigger="click" style="vertical-align: middle;" @command="command">
                <span class="el-dropdown-link">
                  {{ ruleForm.initiator || '发起人' }}<i class="el-icon-arrow-down el-icon--right" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="(item, index) in userList" :key="index" :command="item">
                    <el-avatar size="small" :src="item.avatar" class="avatar" />
                    {{ item.name }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-form-item>
            <el-form-item label="分类" prop="classify">
              <el-radio-group v-model="ruleForm.classify">
                <el-radio label="a类" />
                <el-radio label="b类" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="发帖权限" prop="power">
              <el-radio-group v-model="ruleForm.power">
                <el-radio label="任何人" />
                <el-radio label="需关注" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="封面图" prop="cover">
              <el-upload
                class="cover-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="ruleForm.cover" :src="ruleForm.cover" class="cover">
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
      <el-table :data="tableData" stripe :border="false">
        <el-table-column label="封面图">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover" fit="cover" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="话题名称" />
        <el-table-column prop="initiator" label="发起人" />
        <el-table-column prop="startDate" label="生效时间" />
        <el-table-column prop="endDate" label="失效时间" />
        <el-table-column prop="follow" label="关注数" />
        <el-table-column prop="comment" label="互动数" />
        <el-table-column label="操作">
          <!-- v-show="scope.$index < currentPage*pageSize && scope.$index >= (currentPage-1)*pageSize" -->
          <template slot-scope="scope">
            <el-button type="text" @click.stop="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div style="margin: 20px auto;display: flex;justify-content: center;">
        <el-pagination :current-page.sync="currentPage" :page-size="pageSize" layout="prev, pager, next, jumper" :total="tableData.length" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopicTable',

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
      searchSelect: '',
      // 是否为编辑状态
      isEdit: false,
      // 编辑条目下标
      editIndex: -1,
      // 分页下标
      currentPage: 1,
      // 每页显示的条数
      pageSize: 7,
      // 用户列表
      userList: [{
        avatar: 'http://img3.imgtn.bdimg.com/it/u=2599515051,2970322804&fm=26&gp=0.jpg',
        name: '毛泽东'
      },
      {
        avatar: 'http://img3.imgtn.bdimg.com/it/u=1494497637,3585709450&fm=26&gp=0.jpg',
        name: '周恩来'
      }
      ],
      // 表单数据
      ruleForm: {
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        name: '',
        desc: '',
        cover: '',
        startTime: new Date(),
        endTime: new Date(),
        startDate: this.formatDate(new Date(), 'yyyy-MM-dd'),
        endDate: this.formatDate(new Date(), 'yyyy-MM-dd'),
        initiator: '',
        classify: '',
        power: '',
        follow: 0,
        comment: 0
      },
      // 表单验证
      rules: {
        name: [{
          required: true,
          message: '名称不能为空'
        }],
        desc: [{
          required: true,
          message: '简介不能为空'
        }],
        cover: [{
          required: true,
          message: '请上传封面图'
        }],
        startTime: [{
          type: 'date',
          required: true,
          message: '请选择时间'
        }],
        endTime: [{
          type: 'date',
          required: true,
          message: '请选择时间'
        }],
        initiator: [{
          required: true,
          message: '请选择发起人'
        }],
        classify: [{
          required: true,
          message: '请选择分类'
        }],
        power: [{
          required: true,
          message: '请选择发帖权限'
        }]
      },
      // 静态数据
      tableData: [{
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        cover: 'http://pic29.nipic.com/20130507/8952533_183922555000_2.jpg',
        name: '话题一',
        desc: '简介一',
        initiator: '周伟鹏',
        startTime: new Date(),
        endTime: new Date(),
        startDate: this.formatDate(new Date(), 'yyyy-MM-dd'),
        endDate: this.formatDate(new Date(), 'yyyy-MM-dd'),
        classify: 'a类',
        follow: 0,
        comment: 0,
        power: '需关注'
      }, {
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        cover: 'http://pic29.nipic.com/20130507/8952533_183922555000_2.jpg',
        name: '话题二',
        desc: '简介二',
        initiator: '周伟鹏',
        startTime: new Date(),
        endTime: new Date(),
        startDate: this.formatDate(new Date(), 'yyyy-MM-dd'),
        endDate: this.formatDate(new Date(), 'yyyy-MM-dd'),
        classify: 'b类',
        follow: 0,
        comment: 0,
        power: '任何人'
      }, {
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        cover: 'http://pic29.nipic.com/20130507/8952533_183922555000_2.jpg',
        name: '话题三',
        desc: '简介三',
        initiator: '周伟鹏',
        startTime: new Date(),
        endTime: new Date(),
        startDate: this.formatDate(new Date(), 'yyyy-MM-dd'),
        endDate: this.formatDate(new Date(), 'yyyy-MM-dd'),
        classify: 'a类',
        follow: 0,
        comment: 0,
        power: '需关注'
      }, {
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        cover: 'http://pic29.nipic.com/20130507/8952533_183922555000_2.jpg',
        name: '话题四',
        desc: '简介四',
        initiator: '周伟鹏',
        startTime: new Date(),
        endTime: new Date(),
        startDate: this.formatDate(new Date(), 'yyyy-MM-dd'),
        endDate: this.formatDate(new Date(), 'yyyy-MM-dd'),
        classify: 'a类',
        follow: 0,
        comment: 0,
        power: '需关注'
      }]
    }
  },
  methods: {
    // 格式化日期
    formatDate(time, fmt) {
      var o = {
        'M+': time.getMonth() + 1, // 月份
        'd+': time.getDate(), // 日
        'h+': time.getHours(), // 小时
        'm+': time.getMinutes(), // 分
        's+': time.getSeconds(), // 秒
        'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
        'S': time.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
      }
      return fmt
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var now = new Date().getTime()
          var start = this.ruleForm.startTime.getTime()
          var end = this.ruleForm.endTime.getTime()
          if (now > start || end <= start) {
            this.$message('日期格式错误!!')
            return false
          }
          var newData = {
            name: this.ruleForm.name,
            desc: this.ruleForm.desc,
            cover: this.ruleForm.cover,
            avatar: this.ruleForm.avatar,
            startTime: this.ruleForm.startTime,
            endTime: this.ruleForm.endTime,
            startDate: this.formatDate(this.ruleForm.startTime, 'yyyy-MM-dd'),
            endDate: this.formatDate(this.ruleForm.endTime, 'yyyy-MM-dd'),
            initiator: this.ruleForm.initiator,
            classify: this.ruleForm.classify,
            power: this.ruleForm.power,
            follow: this.ruleForm.follow,
            comment: this.ruleForm.comment
          }
          if (this.isEdit) {
            for (const i in newData) {
              this.tableData[this.editIndex][i] = newData[i]
            }
            this.isEdit = false
            this.editIndex = -1
            this.$emit('changeStatus', false)
          } else {
            this.tableData.push(newData)
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
    // 编辑
    handleEdit(index, info) {
      this.editIndex = index
      for (const i in info) {
        this.ruleForm[i] = info[i]
      }
      this.isEdit = true
      this.$emit('changeStatus', true)
    },
    // 删除
    handleDelete(index, info) {
      this.$confirm('真的要删除吗？')
        .then(r => {
          this.tableData.splice(index, 1)
          this.$message('已删除')
        })
        .catch(_ => {})
    },
    // 上传的图片路径
    handleAvatarSuccess(res, file) {
      this.ruleForm.cover = URL.createObjectURL(file.raw)
    },
    // 图片格式验证
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传封面图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传封面图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 选择发起人
    command(user) {
      this.ruleForm.avatar = user.avatar
      this.ruleForm.initiator = user.name
    }
  }
}
</script>

<style scoped>
	.content1 {
		width: 70%;
		box-shadow: 0 0 10px #f0f0f0;
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
	}
</style>
