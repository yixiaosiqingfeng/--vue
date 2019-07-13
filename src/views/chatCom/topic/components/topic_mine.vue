<template>
  <div v-loading="loading" class="content3">
    <el-row class="tab">
      <el-col :span="6"><span :class="{tabBar: true, active: tabIndex == 0}" @click="tabIndex = 0">我的帖子</span></el-col>
      <el-col :span="6"><span :class="{tabBar: true, active: tabIndex == 1}" @click="tabIndex = 1">我的收藏</span></el-col>
      <el-col :span="6"><span :class="{tabBar: true, active: tabIndex == 2}" @click="tabIndex = 2">我的评论</span></el-col>
      <el-col :span="6"><span :class="{tabBar: true, active: tabIndex == 3}" @click="tabIndex = 3">我的点赞</span></el-col>
    </el-row>
    <div ref="mine" v-infinite-scroll="loadMore" class="mine">
      <div v-for="(item, index) in mineList" :key="index" class="itemBox">
        <el-row>
          <el-col :span="6">
            <el-avatar size="small" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
          </el-col>
          <el-col :span="6">
            <div>{{ item.createName }}</div>
          </el-col>
          <el-col :span="6">
            <div style="color: #e4393c;">{{ item.programName }}</div>
          </el-col>
          <el-col :span="6">
            <div style="color: #808080;">{{ item.createDate }}</div>
          </el-col>
          <el-col :span="24">
            <div class="content smallSize">{{ item.content }}</div>
          </el-col>
          <el-col :span="24">
            <div style="color: #e4393c;">#{{ item.title }}</div>
          </el-col>
          <el-col :span="6">
            <div class="smallSize">[点赞{{ item.showGoodClickCount }}]</div>
          </el-col>
          <el-col :span="6">
            <div class="smallSize">[评论{{ item.showCommentCount }}]</div>
          </el-col>
          <el-col :span="6">
            <div class="smallSize">[转发{{ item.showTrunCount }}]</div>
          </el-col>
        </el-row>
      </div>
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
      // 请求参数
      queryCode: [
        '1804', // 我的帖子
        '', // 我的收藏（暂无接口）
        '1802', // 我的评论
        '1800' // 我的点赞
      ],
      // 假数据
      mineList: [],
      // 贴子条数
      limit: 10
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
      // if(this.$refs.mine){
      // 	this.$refs.mine.scrollTop = 0
      // }
      // this.loading = true
      // for (var i = 0; i < this.limit; i++) {
      // 	this.mineList.push({
      // 		createName: 'user',
      // 		programName: '节目名',
      // 		createDate: '00:00',
      // 		content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
      // 		title: '我要上热门',
      // 		showGoodClickCount: 123,
      // 		showCommentCount: 456,
      // 		showTrunCount: 789
      // 	})
      // }
      // this.loading = false
      // =====================
      if (this.$refs.mine) {
        this.$refs.mine.scrollTop = 0
      }
      this.loading = true
      this.limit += 10
      const requestSelect = {
        code: '2362',
        data: {
          createId: this.$store.getters.userInFo.id,
          code: this.queryCode[this.tabIndex]
        },
        limit: this.limit,
        page: 1
      }
      mine_select(requestSelect).then(res => {
        if (res.errorCode === 0 && res.success) {
          console.log(res.data.list)
          this.mineList = res.data.list
          this.loading = false
          console.log('加了10条')
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 滚动加载更多
    loadMore() {
      this.selectMine()
    }
  }
}
</script>

<style scoped>
	.content3 {
		width: 315px;
		height: calc(100vh - 288px);
		box-shadow: 0 0 10px #f0f0f0;
		margin-top: 15px;
		padding: 20px;
	}

	.el-col-6 {
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
		padding: 10px 0;
		border-bottom: 1px solid #f0f0f0;
	}

	.itemBox .el-col {
		padding: 5px;
	}

	.smallSize {
		font-size: 12px;
	}

	.content {
		text-indent: 2em;
		line-height: 16px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
</style>
