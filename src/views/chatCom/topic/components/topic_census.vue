<template>
  <!-- 右上部分 -->
  <div class="content2">
    <span style="font-size: 16px;font-weight: 700;margin-left: 10px;">数据统计</span><span style="float: right;color: #606266;">更多</span>
    <el-row style="margin-top: 20px;">
      <el-col v-for="(item, index) in census" :key="index" :span="12">
        <div class="census">
          <p>{{ item.num }}</p>
          <p>{{ item.title }}</p>
          <p>
            环比昨日{{ item.ratio }}%
            <span v-show="item.ratio > 0" class="iconfont icon-up" style="color: green;" />
            <span v-show="item.ratio < 0" class="iconfont icon-down" style="color: red;" />
          </p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  total_census_select // 2603
} from '@/api/topic.js'

export default {
  name: 'TopicCensus',

  data() {
    return {
      // 统计数据
      census: [{
        title: '今日互动总数',
        num: 0,
        ratio: 0
      },
      {
        title: '今日互动人数',
        num: 0,
        ratio: 0
      },
      {
        title: '今日新增话题',
        num: 0,
        ratio: 0
      },
      {
        title: '今日新增贴子',
        num: 0,
        ratio: 0
      }
      ]
    }
  },

  created() {
    this.selectTotalCensus()
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
          console.log(res.data[0])
          this.census[0].num = res.data[0].commCount
          this.census[1].num = res.data[0].activeUserCount
          this.census[2].num = res.data[0].topicCount
          this.census[3].num = res.data[0].forumCount
          this.census[0].ratio = res.data[0].commCountRatio
          this.census[1].ratio = res.data[0].activeUserCountRatio
          this.census[2].ratio = res.data[0].topicCountRatio
          this.census[3].ratio = res.data[0].forumCountRatio
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
