<template>
  <!-- 右上部分 -->
  <div class="content2">
    <span style="font-size: 16px;font-weight: 700;margin-left: 10px;">数据统计</span><span style="float: right;color: #606266;">更多</span>
    <el-row style="margin-top: 20px;">
      <el-col :span="12">
        <div class="census">
          <p>{{ interaction_Num }}</p>
          <p>今日互动总数</p>
          <p>
            环比昨日2%
            <i class="el-icon-top" />
          </p>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="census">
          <p>{{ user_Num }}</p>
          <p>今日互动人数</p>
          <p>
            环比昨日2%
            <i class="el-icon-top" />
          </p>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="census">
          <p>{{ post_Num }}</p>
          <p>今日新增贴子</p>
          <p>
            环比昨日2%
            <i class="el-icon-top" />
          </p>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="census">
          <p>{{ topic_Num }}</p>
          <p>今日新增话题</p>
          <p>
            环比昨日2%
            <i class="el-icon-top" />
          </p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  time_census_select, // 2602
  total_census_select, // 2603
  comment_census_select // 2604
} from '@/api/topic.js'

export default {
  name: 'TopicCensus',

  data() {
    return {
      // 今日互动总数
      interaction_Num: 0,
      // 今日互动人数
      user_Num: 0,
      // 今日新增贴子
      post_Num: 0,
      // 今日新增话题
      topic_Num: 0
    }
  },

  created() {
    this.selectTotalCensus()
    // this.selectCommentCensus()
    // this.selectTimeCensus()
  },

  methods: {
    // 查询汇总统计
    selectTotalCensus() {
      const requestSelect = {
        code: '2603',
        data: {}
      }
      total_census_select(requestSelect).then(res => {
        if (res.errorCode === 0 && res.success) {
          this.interaction_Num = res.data[0].forumCount + res.data[0].commentCount + res.data[0].goodClickCount + res.data[
            0].trunCount
          this.user_Num = res.data[0].activeUserCount
          this.post_Num = res.data[0].forumCount
          this.topic_Num = res.data[0].topicCount
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 查询互动统计
    selectCommentCensus() {
      const requestSelect = {
        code: '2604',
        data: {}
      }
      comment_census_select(requestSelect).then(res => {
        if (res.errorCode === 0 && res.success) {
          console.log(res)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 查询分时统计
    selectTimeCensus() {
      const requestSelect = {
        code: '2602',
        data: {}
      }
      time_census_select(requestSelect).then(res => {
        if (res.errorCode === 0 && res.success) {
          console.log(res)
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style scoped>
	.content2 {
		width: 315px;
		box-shadow: 0 0 10px #f0f0f0;
		padding: 20px;
	}

	.census {
		text-align: center;
	}

	.census p {
		padding: 5px;
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
</style>
