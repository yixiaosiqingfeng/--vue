<template>
  <div v-loading="loading" class="content3">
    <el-row class="tab">
      <el-col :span="6"><span :class="{tabBar: true, active: tabIndex == 0}" @click="tabIndex = 0">我的帖子</span></el-col>
      <el-col :span="6"><span :class="{tabBar: true, active: tabIndex == 1}" @click="tabIndex = 1">我的收藏</span></el-col>
      <el-col :span="6"><span :class="{tabBar: true, active: tabIndex == 2}" @click="tabIndex = 2">我的评论</span></el-col>
      <el-col :span="6"><span :class="{tabBar: true, active: tabIndex == 3}" @click="tabIndex = 3">我的点赞</span></el-col>
    </el-row>
    <div ref="mine" class="mine">
      <div v-for="(item, index) in mineList" :key="index" class="itemBox">
        <div class="firstLine">
          <el-avatar size="small" :src="item.userPhoto || defaultAvatar" />
          <p>{{ item.createName }}</p>
          <p style="color: #e4393c;">{{ item.programName }}</p>
          <p style="color: #808080;font-size: 12px;">{{ item.createDate }}</p>
        </div>
        <p class="content smallSize" v-html="item.content" />
        <p style="color: #e4393c;">#{{ item.title }}</p>
        <p>
          <span class="smallSize">[点赞{{ item.showGoodClickCount }}]</span>
          <span class="smallSize">[评论{{ item.showCommentCount }}]</span>
          <span class="smallSize">[转发{{ item.showTrunCount }}]</span>
        </p>
      </div>
      <el-pagination
        :total="total"
        :current-page="requestSelect.page"
        :page-size="requestSelect.limit"
        layout="prev, pager, next"
        small
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import {
  mine_select
} from '@/api/topic.js'

export default {
  name: 'TopicMine',

  data() {
    return {
      // 右下部分标签页下标
      tabIndex: 0,
      // 加载
      loading: false,
      // 请求code
      queryCode: [
        '1804', // 我的帖子
        '', // 我的收藏（暂无接口）
        '1802', // 我的评论
        '1800' // 我的点赞
      ],
      // 假数据
      mineList: [],
      // 总数
      total: 0,
      // 默认头像
      defaultAvatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
  },

  computed: {
    // 请求参数
    requestSelect() {
      return {
        code: '2362',
        data: {
          createId: this.$store.getters.userInFo.id,
          code: this.queryCode[this.tabIndex]
        },
        limit: 10,
        page: 1
      }
    }
  },

  watch: {
    tabIndex(newValue, oldValue) {
      this.selectMine()
    }
  },

  created() {
    this.selectMine()
  },

  methods: {
    // 查询我的
    selectMine() {
      this.loading = true
      if (this.$refs.mine) {
        this.$refs.mine.scrollTop = 0
      }
      // for (var i = 0; i < this.requestSelect.limit; i++) {
      //   this.mineList.push({
      //     createName: 'userzxcxzcxzczxc',
      //     programName: '节目名',
      //     createDate: '2019-07-13',
      //     content: '内容内容内容内容内容内容内容内容',
      //     title: '我要上热门',
      //     showGoodClickCount: 0,
      //     showCommentCount: 0,
      //     showTrunCount: 0
      //   })
      // }
      // this.total = this.mineList.length + 10
      // this.loading = false
      // =====================
      this.requestSelect.limit += 10
      mine_select(this.requestSelect).then(res => {
        if (res.errorCode === 0 && res.success) {
          this.total = res.data.total
          console.log(res)
          this.mineList = res.data.list
          this.loading = false
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 分页
    handleCurrentChange(val) {
      this.requestSelect.page = val
      this.selectMine()
    }
  }
}
</script>

<style scoped>
  .content3 {
    width: 315px;
    height: calc(100vh - 298px);
    box-shadow: 0 0 10px #f0f0f0;
    margin-top: 15px;
    padding: 20px;
  }

  .el-pagination {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .tab .el-col-6 {
    text-align: center;
  }

  .tabBar {
    font-size: 12px;
    font-weight: 500;
    text-align: center;
    transition: all .3s;
    cursor: pointer;
  }

  .active {
    font-size: 14px;
    font-weight: 700;
  }

  .mine {
    height: calc(100% - 10px);
    overflow-y: scroll;
    margin-top: 10px;
  }

  .mine::-webkit-scrollbar {
    display: none
  }

  .itemBox {
    padding: 0;
    border-bottom: 1px solid #f0f0f0;
  }

  .firstLine {
    display: flex;
    align-items: center;
  }

  .firstLine p {
    max-width: 25%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .itemBox div,
  .itemBox p,
  .itemBox span {
    margin: 10px 5px;
  }

  .smallSize {
    font-size: 12px;
  }

  .content {
    line-height: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
</style>
