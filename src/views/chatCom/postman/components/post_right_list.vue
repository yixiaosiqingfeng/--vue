<template>
  <div>
    <!-- 顶部搜索 -->
    <div class="right_list_top">
      <div class="list_top_select">
        <div style="display:flex;">
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
            <el-input v-model="selectType" placeholder="请输入内容" class="input-with-select" size="mini">
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

        <span class="iconfont icon-shengjiangxu" style="cursor: pointer;" />
      </div>
    </div>

    <!-- 帖子 -->
    <div class="right_list_post">
      <p style="color:#82848a;">共找到{{ listData.length }}条互动，222条评论</p>
      <div style="overflow-y:auto; overflow-x:hidden; height:600px;">
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
                    <div style="width:90%;">
                      <div>
                        <span>{{ i.createName }}</span>
                        <el-button type="text">复制</el-button>
                      </div>

                      <div>
                        <span style="color:red;">节目名称&nbsp;</span>
                        <span style="color:#666;">{{ i.createDate }}</span>
                      </div>
                    </div>

                    <!-- 帖子管理功能 -->
                    <div style="width:10%;margin-top:5px;">
                      <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link">
                          帖子管理
                          <i class="el-icon-arrow-down el-icon--right" />
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="a">置顶该贴</el-dropdown-item>
                          <el-dropdown-item command="b">标记热门</el-dropdown-item>
                          <el-dropdown-item command="c">修改帖子</el-dropdown-item>
                          <el-dropdown-item command="d">删除帖子</el-dropdown-item>
                          <el-dropdown-item command="e">收藏帖子</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </div>

                  <!-- 帖子内容 -->
                  <div
                    style="margin-top:10px;color:#666;font-size:14px;line-height: 20px;"
                  >{{ i.content }}</div>

                  <div style="color:red;margin-top:5px;">#我要上热门</div>

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
              <hr>
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
import { getList } from '../../../../api/postman'
export default {
  components: {
    postComment
  },
  data() {
    return {
      selectType: '',
      searchSelect: '',
      // 异步加载
      count: 10,
      loading: false,
      // 控制评论展现
      currentTab: '',
      // 帖子列表数据
      listData: [],
      options: [{
        value: '选项1',
        label: '节目'
      }, {
        value: '选项2',
        label: '话题'
      }, {
        value: '选项3',
        label: '内容'
      }, {
        value: '选项4',
        label: '账号'
      }],
      value: ''
    }
  },
  computed: {
    noMore() {
      if (this.listData.length === 0) { return } else {
        return this.count >= this.listData.length
      }
    },
    disabled() {
      return this.loading || this.noMore
    }
  },
  mounted() {
    this.getPostList()
  },
  methods: {
    handleIconClick(ev) {
      console.log(ev)
    },
    load() {
      this.loading = true
      setTimeout(() => {
        this.count += 10
        this.loading = false
      }, 2000)
    },
    handleCommand(command) {
      this.$message('click on item ' + command)
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
        code: 2270,
        data: {},
        limit: 10,
        page: 1
      }
      getList(l).then(res => {
        console.log(res, '列表内容')
        this.listData = res.data
      })
    }
  }
}
</script>
<style scoped>
.right_list_top {
  margin-top: 10px;
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
  height: 300px;
  margin-top: 5px;
  background-color: #fff;
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
.input{
  width: 135px;
}
.el-sl /deep/ .el-input__inner{
  width: 115px;

}
</style>
