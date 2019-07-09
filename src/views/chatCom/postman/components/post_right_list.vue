<template>
  <div>
    <!-- 顶部搜索 -->
    <div class="right_list_top">
      <div class="list_top_select">
        <el-input v-model="input3" placeholder="请输入内容" class="input-with-select" size="mini">
          <el-select slot="prepend" v-model="select" placeholder="请选择">
            <el-option label="话题" value="1" />
            <el-option label="节目" value="2" />
            <el-option label="内容" value="3" />
            <el-option label="账号" value="4" />
          </el-select>
          <i slot="suffix" class="el-icon-search el-input__icon" @click="handleIconClick" />
        </el-input>
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
      </div>
    </div>

    <!-- 帖子 -->
    <div class="right_list_post">
      <p style="color:#82848a;">共找到532条互动，222条评论</p>
      <div style="overflow-y:auto; overflow-x:hidden; height:600px;">
        <div class="infinite-list-wrapper">
          <ul v-infinite-scroll="load" class="list" infinite-scroll-disabled="disabled">
            <li v-for="(i,index) in count" :key="index" class="infinite-list-item">
              <div style="display:flex;margin-top:10px;">
                <!-- 头像 -->
                <div class="postdata_left">
                  <div class="postdata_left_photo">
                    <img src alt>
                  </div>
                </div>
                <!-- 帖子右侧 -->
                <div class="postdata_right">
                  <div style="display:flex;">
                    <div style="width:90%;">
                      <div>
                        <span>张小三</span>
                        <el-button type="text">复制</el-button>
                      </div>

                      <div>
                        <span style="color:red;">节目名称&nbsp;</span>
                        <span style="color:#666;">12:20</span>
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
                  <div style="margin-top:10px;color:#666;font-size:14px;line-height: 20px;">
                    第三方士大夫水电费第三方多少范德萨范德萨发多少付水电费第三方，第三方士大夫水电费第三方多少范德萨范德萨发多少付水电费第三方，
                    第三方士大夫水电费第三方多少范德萨范德萨发多少付水电费第三方，第三方士大夫水电费第三方多少范德萨范德萨发多少付水电费第三方
                  </div>

                  <div style="color:red;margin-top:5px;">#我要上热门</div>

                  <div class="postdata_right_photo">
                    <img src alt>
                  </div>
                  <!-- 点赞，评论，收藏 -->
                  <div style="margin-top:10px;">
                    <el-tooltip class="item" effect="dark" content="点赞" placement="top">
                      <span class="iconfont icon-dianzan1">
                        <span style="color:#999;">10</span>
                      </span>
                    </el-tooltip>
                    <el-tooltip class="item comment" effect="dark" content="评论" placement="top">
                      <span class="iconfont icon-pinglun">
                        <span style="color:#999;">110</span>
                      </span>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="转发" placement="top">
                      <span class="iconfont icon-zhuanfa">
                        <span style="color:#999;">10</span>
                      </span>
                    </el-tooltip>
                  </div>
                </div>
              </div>
              <!-- 评论页面 -->
              <postComment />
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
export default {
  components: {
    postComment
  },
  data() {
    return {
      input3: '',
      select: '全部',
      // 异步加载
      count: 10,
      loading: false
    }
  },
  computed: {
    noMore() {
      return this.count >= 200
    },
    disabled() {
      return this.loading || this.noMore
    }
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
    }
  }
}
</script>
<style scoped>
ul,
li,
p {
  margin: 0;
  padding: 0;
}
.right_list_top {
  margin-top: 10px;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.list_top_select >>> .el-input__inner {
  padding-right: 50px;
}
.list_top_select {
  height: 30px;
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
</style>
