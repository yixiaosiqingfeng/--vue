<template>
  <div class="content">
    <div class="content1">
      <div class="searchBox">
        <!-- 搜索框 -->
        <div style="width: 40%;">
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
          <el-dropdown>
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
          <el-dropdown>
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
          <el-button type="text" @click="showCreate = true">新建</el-button>
        </div>
      </div>
      <!-- 数据条数 -->
      <div style="color: #909399;font-size: 12px;height: 40px;line-height: 40px;">
        共<span style="color: #E6A23C;">{{ tableData.length }}</span>条数据
      </div>

      <div style="position: relative;">
        <!-- 新建 -->
        <transition name="el-zoom-in-top">
          <div v-show="showCreate" class="createData">
            <p v-show="!isEdit" style="font-size: 18px;margin-left: 10px;">新建话题</p>
            <p v-show="isEdit" style="font-size: 18px;margin-left: 10px;">编辑话题</p>
            <!-- 填写表单 -->
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
              <el-form-item label="话题名称" prop="name">
                <el-input v-model="ruleForm.name" />
              </el-form-item>
              <el-form-item label="简介" prop="desc">
                <el-input v-model="ruleForm.desc" type="textarea" />
              </el-form-item>
              <el-form-item label="时间">
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
                <el-radio-group v-model="ruleForm.initiator">
                  <el-radio label="本账号" />
                  <el-radio label="小号" />
                </el-radio-group>
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
                <el-input v-model="ruleForm.cover" />
              </el-form-item>
              <el-form-item>
                <el-button v-show="!isEdit" type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button v-show="isEdit" type="primary" @click="submitForm('ruleForm')">确定编辑</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
                <el-button @click="resetForm('ruleForm', true)">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </transition>
        <!-- 表格 -->
        <el-table :data="tableData" stripe :border="false">
          <el-table-column label="封面图">
            <template slot-scope="scope">
              <img :src="scope.row.cover" alt="" style="width: 100px;">
            </template>
          </el-table-column>
          <el-table-column prop="name" label="话题名称" />
          <el-table-column prop="initiator" label="发起人" />
          <el-table-column prop="startDate" label="生效时间" />
          <el-table-column prop="endDate" label="失效时间" />
          <el-table-column prop="follow" label="关注数" />
          <el-table-column prop="comment" label="互动数" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div>
      <div class="content2">
        <span v-show="!isEdit" style="font-size: 16px;font-weight: 700;margin-left: 10px;">数据统计</span><span style="float: right;color: #606266;">更多</span>
        <el-row style="margin-top: 20px;">
          <el-col :span="12">
            <div class="census">
              <p>1200</p>
              <p>总话题数</p>
              <p>环比昨日2%↑</p>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="census">
              <p>1200</p>
              <p>今日互动总数</p>
              <p>环比昨日2%↑</p>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="census">
              <p>1200</p>
              <p>总话题数</p>
              <p>环比昨日2%↑</p>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="census">
              <p>1200</p>
              <p>总话题数</p>
              <p>环比昨日2%↑</p>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="content3">
        <el-row>
          <el-col :span="6"><span :class="{tabBar: true, active: tabIndex == 0}" @click="tabIndex = 0">我的帖子</span></el-col>
          <el-col :span="6"><span :class="{tabBar: true, active: tabIndex == 1}" @click="tabIndex = 1">我的收藏</span></el-col>
          <el-col :span="6"><span :class="{tabBar: true, active: tabIndex == 2}" @click="tabIndex = 2">我的评论</span></el-col>
          <el-col :span="6"><span :class="{tabBar: true, active: tabIndex == 3}" @click="tabIndex = 3">我的点赞</span></el-col>
        </el-row>
        <div v-show="tabIndex == 0" class="tiezi">我的帖子</div>
        <div v-show="tabIndex == 1" class="tiezi">我的收藏</div>
        <div v-show="tabIndex == 2" class="tiezi">我的评论</div>
        <div v-show="tabIndex == 3" class="tiezi">我的点赞</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',

  data() {
    return {
      keyWord: '',
      searchSelect: '',
      showCreate: false,
      isEdit: false,
      editIndex: -1,
      tabIndex: 0,
      ruleForm: {
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
      tableData: [{
        cover: 'http://pic29.nipic.com/20130507/8952533_183922555000_2.jpg',
        name: '话题一',
        desc: '简介简介',
        initiator: '发起人',
        startTime: new Date(),
        endTime: new Date(),
        startDate: this.formatDate(new Date(), 'yyyy-MM-dd'),
        endDate: this.formatDate(new Date(), 'yyyy-MM-dd'),
        classify: 'xx类',
        follow: 0,
        comment: 0,
        power: ''
      }, {
        cover: 'http://pic29.nipic.com/20130507/8952533_183922555000_2.jpg',
        name: '话题一',
        desc: '简介简介',
        initiator: '发起人',
        startTime: new Date(),
        endTime: new Date(),
        startDate: this.formatDate(new Date(), 'yyyy-MM-dd'),
        endDate: this.formatDate(new Date(), 'yyyy-MM-dd'),
        classify: 'xx类',
        follow: 0,
        comment: 0,
        power: ''
      }, {
        cover: 'http://pic29.nipic.com/20130507/8952533_183922555000_2.jpg',
        name: '话题一',
        desc: '简介简介',
        initiator: '发起人',
        startTime: new Date(),
        endTime: new Date(),
        startDate: this.formatDate(new Date(), 'yyyy-MM-dd'),
        endDate: this.formatDate(new Date(), 'yyyy-MM-dd'),
        classify: 'xx类',
        follow: 0,
        comment: 0,
        power: ''
      }, {
        cover: 'http://pic29.nipic.com/20130507/8952533_183922555000_2.jpg',
        name: '话题一',
        desc: '简介简介',
        initiator: '发起人',
        startTime: new Date(),
        endTime: new Date(),
        startDate: this.formatDate(new Date(), 'yyyy-MM-dd'),
        endDate: this.formatDate(new Date(), 'yyyy-MM-dd'),
        classify: 'xx类',
        follow: 0,
        comment: 0,
        power: ''
      }]
    }
  },

  // beforeCreate() {
  //   Date.prototype.format = function(fmt) {
  //     var o = {
  //       'M+': this.getMonth() + 1, // 月份
  //       'd+': this.getDate(), // 日
  //       'h+': this.getHours(), // 小时
  //       'm+': this.getMinutes(), // 分
  //       's+': this.getSeconds(), // 秒
  //       'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
  //       'S': this.getMilliseconds() // 毫秒
  //     }
  //     if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length)) }
  //     for (var k in o) {
  //       if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
  //     }
  //     return fmt
  //   }
  // },

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
            this.tableData[this.editIndex] = newData
            this.isEdit = false
            this.editIndex = -1
            this.showCreate = false
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
        this.showCreate = false
      }
    },
    // 编辑
    handleEdit(index, info) {
      this.editIndex = index
      this.ruleForm = {
        name: info.name,
        desc: info.desc,
        cover: info.cover,
        startTime: info.startTime,
        endTime: info.endTime,
        startDate: info.startDate,
        endDate: info.endDate,
        initiator: info.initiator,
        classify: info.classify,
        power: info.power,
        follow: info.follow,
        comment: info.comment
      }
      this.isEdit = true
      this.showCreate = true
    },
    // 删除
    handleDelete(index, info) {
      this.tableData.splice(index, 1)
      this.$message('已删除')
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

	.content1 {
		width: 70%;
		box-shadow: 5px 5px 5px #f5f5f5;
	}

	.content2 {
		width: 300px;
		box-shadow: 0px 0px 10px #f5f5f5;
		padding: 20px;
	}

	.content3 {
		width: 300px;
		height: 300px;
		box-shadow: 0px 0px 10px #f5f5f5;
		margin-top: 20px;
		padding: 20px;
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

	.census {
		text-align: center;
	}

	.census p:nth-of-type(1) {
		font-weight: 700;
	}

	.census p:nth-of-type(2) {
		font-size: 12px;
		color: #606266;
	}

	.census p:nth-of-type(3) {
		font-size: 12px;
		color: #909399;
	}

	.tabBar {
		font-size: 12px;
		text-align: center;
		transition: all .5s;
	}

	.active {
		font-size: 14px;
		font-weight: 700;
	}
</style>
