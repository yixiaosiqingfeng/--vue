<template>
  <div style="box-shadow: 0 0 15px #eee;">
    <!-- 顶部搜索 -->
    <div class="right_list_top">
      <div class="list_top_select">
        <div style="display:flex;margin-top: 8px;">
          <div class="el-sl">
            <el-select v-model="value" placeholder="请选择" size="mini">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="el_in">
            <el-input
              v-model="selectType"
              placeholder="请输入内容"
              class="input-with-select"
              size="mini"
            >
              <i slot="suffix" class="el-icon-search el-input__icon" @click="handleIconClick" />
            </el-input>
          </div>
        </div>
      </div>

      <div>
        <span>筛选：</span>
        <el-dropdown>
          <span class="el-dropdown-link">
            置顶
            <i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>置顶</el-dropdown-item>
            <el-dropdown-item>非置顶</el-dropdown-item>
            <el-dropdown-item>热门</el-dropdown-item>
            <el-dropdown-item>非热门</el-dropdown-item>
            <el-dropdown-item>采纳</el-dropdown-item>
            <el-dropdown-item>非采纳</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <span style="margin-left:20px;">排序：</span>
        <el-dropdown>
          <span class="el-dropdown-link">
            最新
            <i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>最新</el-dropdown-item>
            <el-dropdown-item>倒序</el-dropdown-item>
            <el-dropdown-item>热度</el-dropdown-item>
            <el-dropdown-item>字数</el-dropdown-item>
            <el-dropdown-item>评论数</el-dropdown-item>
            <el-dropdown-item>分享数</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-tooltip class="item" effect="dark" content="升序" placement="top">
          <span class="iconfont icon-shengjiangxu" style="cursor: pointer;" />
        </el-tooltip>
      </div>
    </div>

    <!-- 帖子 -->
    <div class="right_list_post">
      <p
        style="color:#82848a;margin:8px 5px;"
      >共找到{{ listData.length }}条互动</p>
      <div style="height:10px;background-color: #FBFBFB;" />
      <div style="overflow-y:auto; overflow-x:hidden; height:calc(100vh - 360px);">
        <div class="infinite-list-wrapper">
          <ul v-infinite-scroll="load" class="list" infinite-scroll-disabled="disabled">
            <li v-for="(i,index) in listData" :key="i.id" :ref="index" class="infinite-list-item">
              <div style="display:flex;margin-top:10px;">
                <!-- 头像 -->
                <div class="postdata_left">
                  <div class="postdata_left_photo">
                    <img src="http://pic29.nipic.com/20130507/8952533_183922555000_2.jpg" alt>
                  </div>
                </div>
                <!-- 帖子右侧 -->
                <div class="postdata_right">
                  <div style="display:flex;">
                    <div style="width:88%;">
                      <div>
                        <span>{{ i.createName }}</span>
                        <el-tooltip class="item" effect="dark" content="置顶" placement="top-end">
                          <i
                            v-show="i.stick===20"
                            class="iconfont icon-zhiding"
                            style="color:#F98700;font-size:20px;"
                          />
                        </el-tooltip>
                        <el-button type="text">复制</el-button>
                      </div>

                      <div>
                        <span v-show="!i.programName" style="color:red;">无对应节目&nbsp;</span>
                        <span v-show="i.programName" style="color:red;">{{ i.programName }}&nbsp;</span>
                        <span style="color:#666;">{{ i.createDate }}</span>
                      </div>
                    </div>

                    <!-- 帖子管理功能 -->
                    <div style="width:12%;margin-top:5px;">
                      <el-dropdown trigger="click" @command="handleCommand">
                        <span class="el-dropdown-link">
                          帖子管理
                          <i class="el-icon-arrow-down el-icon--right" />
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item
                            v-show="i.stick===10"
                            :command="{id:i.id,stick:i.stick,value:postFunction.zd}"
                          >置顶该贴</el-dropdown-item>
                          <el-dropdown-item
                            v-show="i.stick===20"
                            :command="{id:i.id,stick:i.stick,value:postFunction.qxzd}"
                          >取消置顶</el-dropdown-item>
                          <el-dropdown-item :command="{id:i.id,value:postFunction.rm}">标记热门</el-dropdown-item>

                          <el-popover placement="left" width="100%" trigger="click">
                            <change :change-data="changeData" @changePost="changePost" />
                            <el-dropdown-item
                              slot="reference"
                              :command="{changeData:i,value:postFunction.xg,}"
                            > 修改帖子</el-dropdown-item>
                          </el-popover>

                          <el-dropdown-item :command="{id:i.id,value:postFunction.cc}" v-html="'删除帖子'" />
                          <el-dropdown-item :command="{id:i.id,value:postFunction.sc}">收藏帖子</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </div>

                  <!-- 帖子内容 -->
                  <div
                    ref="cont"
                    style="margin-top:10px;color:#666;font-size:14px;line-height: 20px;"
                    :contenteditable="ediText==='1'"
                    v-html="i.content"
                  />
                  <div style="color:red;margin-top:5px;">#{{ i.title }}</div>
                  <!-- 帖子图片 -->
                  <div v-show="i.type==='20'" class="postdata_right_photo">
                    <img src alt>
                  </div>
                  <!-- 点赞，评论，收藏 -->
                  <div style="margin-top:10px;">
                    <el-tooltip class="item" effect="dark" content="点赞" placement="top">
                      <span class="iconfont icon-dianzan1">
                        <span style="color:#999;">{{ i.goodClickCount }}</span>
                      </span>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="评论" placement="top">
                      <span
                        style="margin:0 5px;cursor: pointer;"
                        class="iconfont icon-pinglun"
                        @click="showNav(index)"
                      >
                        <span style="color:#999;">{{ i.commentCount }}</span>
                      </span>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="转发" placement="top">
                      <span class="iconfont icon-zhuanfa">
                        <span style="color:#999;">{{ i.trunCount }}</span>
                      </span>
                    </el-tooltip>
                  </div>
                </div>
              </div>
              <!-- 评论页面 -->
              <postComment style="display: none" />
            </li>
          </ul>
          <p v-if="loading" style="text-align: center;">加载中...</p>
          <p v-if="noMore" style="text-align: center;">没有更多了</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import postComment from './post_right_comment'
import change from './change'
import axios from 'axios'
export default {
  components: {
    postComment,
    change
  },
  props: {
    post: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // 传递数据
      changeData: {},
      // 帖子管理功能
      postFunction: {
        cc: '删除',
        zd: '置顶',
        rm: '热门',
        xg: '修改',
        sc: '收藏',
        qxzd: '取消置顶'
      },
      // 控制是否可以编辑
      ediText: '',
      ediFlag: true,
      // 当前被编辑的帖子ID
      textId: '',
      content: '',
      // 搜索内容
      selectType: '',
      searchSelect: '',
      // 异步加载
      count: 10,
      loading: false,
      // 控制评论展现
      currentTab: '',
      // 帖子列表数据
      listData: [],
      options: [
        {
          value: '选项1',
          label: '节目'
        },
        {
          value: '选项2',
          label: '话题'
        },
        {
          value: '选项3',
          label: '内容'
        },
        {
          value: '选项4',
          label: '账号'
        }
      ],
      value: '全部'
    }
  },
  computed: {
    noMore() {
      if (this.listData.length === 0) {
        return
      } else {
        return this.count >= this.listData.length
      }
    },
    disabled() {
      return this.loading || this.noMore
    }
  },
  watch: {
    post() {
      this.getPostList()
    }
  },
  mounted() {
    this.getPostList()
  },

  methods: {
    // 搜索功能
    handleIconClick() {
      if (this.selectType === '') {
        this.$message.warning('请输入需要搜索的内容')
      }
      const l = {
        code: '1807',
        data: {
          content: this.selectType
        },
        limit: 99,
        page: 1
      }
      axios
        .post('http://192.168.0.18:3366/community_auth/select_forum_list_v1', l)
        .then(res => {
          if (res.data.success && res.data.errorCode === 0) {
            this.listData = res.data.data
          } else {
            this.$message.error(res.data.msg)
          }
        })
    },
    load() {
      this.loading = true
      setTimeout(() => {
        this.count += 10
        this.loading = false
      }, 2000)
    },
    // 帖子管理功能
    handleCommand(command) {
      // 删除
      if (command.value === '删除') {
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
          .then(() => {
            const c = {
              code: '1806',
              data: {
                id: command.id
              }
            }
            axios
              .post(
                'http://192.168.0.18:3366/community_auth/remove_forum_v1',
                c
              )
              .then(res => {
                console.log(res, 111111)
                if (res.data.success && res.data.errorCode === 0) {
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  })
                  this.getPostList()
                  this.ediText = ''
                } else {
                  this.$message.error(res.data.msg)
                }
              })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
      } else if (command.value === '修改') {
        // 修改功能
        this.textId = command.id
        this.changeData = command.changeData
        console.log(this.changeData, '修改数据')
      } else if (command.value === '置顶') {
        // 置顶功能
        this.$confirm('是否置顶?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
          .then(() => {
            const c = {
              code: '1803',
              data: {
                id: command.id,
                stick: command.stick
              }
            }
            axios
              .post('http://192.168.0.18:3366/community_auth/stick_v1', c)
              .then(res => {
                console.log(res, 111111)
                if (res.data.success && res.data.errorCode === 0) {
                  this.$message({
                    type: 'success',
                    message: '置顶成功!'
                  })
                  this.getPostList()
                } else {
                  this.$message.error(res.data.msg)
                }
              })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
      } else if (command.value === '取消置顶') {
        // 置顶功能
        this.$confirm('是否取消置顶?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          const c = {
            code: '1803',
            data: {
              id: command.id,
              stick: command.stick
            }
          }
          axios
            .post('http://192.168.0.18:3366/community_auth/stick_v1', c)
            .then(res => {
              if (res.data.success && res.data.errorCode === 0) {
                this.$message({
                  type: 'success',
                  message: '已取消置顶!'
                })
                this.getPostList()
              } else {
                this.$message.error(res.data.msg)
              }
            })
        })
      }
    },
    showNav(index) {
      if (this.$refs[index][0].childNodes[2].style.display === 'none') {
        this.$refs[index][0].childNodes[2].style.display = 'block'
      } else if (this.$refs[index][0].childNodes[2].style.display === 'block') {
        this.$refs[index][0].childNodes[2].style.display = 'none'
      }
    },
    // 获取帖子列表
    getPostList() {
      const l = {
        code: '1807',
        data: {},
        limit: 99,
        page: 1
      }
      axios
        .post('http://192.168.0.18:3366/community_auth/select_forum_list_v1', l)
        .then(res => {
          if (res.data.success && res.data.errorCode === 0) {
            this.listData = res.data.data
          } else {
            this.$message.error(res.data.msg)
          }
        })
    },
    changePost() {
      this.post++
    }
  }
}
</script>
<style scoped>
.infinite-list-item {
  border-top: 1px solid #eee;
  margin-bottom: 10px;
}
.right_list_top {
  margin: 10px 5px;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.list_top_select >>> .el-input__inner {
  padding-right: 60px;
}
.list_top_select {
  height: 36px;
}
.right_list_post {
  margin-top: 5px;
}
/* 帖子 */
.postdata_left {
  width: 10%;
  height: 100px;
}
.postdata_left_photo {
  height: 60px;
  width: 60px;
  border-radius: 50%;
  background-color: #909399;
  margin: 10px auto;
}
.postdata_left_photo > img {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 50%;
}
.postdata_right {
  width: 90%;
}
.postdata_right_photo {
  width: 200px;
  height: 100px;
  margin-top: 5px;
  background-color: #909399;
}
.comment {
  margin: 0 10px;
  cursor: pointer;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.input {
  width: 135px;
}
.el-sl /deep/ .el-input__inner {
  width: 115px;
}
.post_change {
  position: absolute;
  top: 380px;
  left: 138px;
}
</style>
