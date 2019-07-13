<template>
  <div class="dataStatistics-container boxShadow">
    <div class="dataStatistics-con-title">
      <p class="ft18 fw">数据统计</p>
      <p>
        <a>更新时间：2019-06-15  12：00</a>
        <span v-if="!isUpdate" class="iconfont icon-shuaxin updata-icon" @click="updataDataStetis" />
        <i v-if="isUpdate" class="el-icon-loading updata-icon" />
      </p>
    </div>
    <div class="dataStatistics-con-list">
      <ul v-for="item in dataList" :key="item.id">
        <li>
          <h2>{{ item.userTotal }}</h2>
          <a>总用户</a>
          <p>
            <a>环比昨日  {{ item.userTotalRatio }}%</a>
            <span :class="item.userTotalRatio>0?'iconfont icon-up':'iconfont icon-down'" :style="{color:item.userTotalRatio>0?'green':'red'}" />
          </p>
        </li>
        <li>
          <h2>{{ item.userCount }}</h2>
          <a>新增用户</a>
          <p>
            <a>环比昨日  {{ item.userCountRatio }}%</a>
            <span :class="item.userCountRatio>0?'iconfont icon-up':'iconfont icon-down'" :style="{color:item.userTotalRatio>0?'green':'red'}" />
          </p>
        </li>
        <li>
          <h2>{{ interactive(item) }}</h2>
          <a>互动总数</a>
          <p>
            <a>环比昨日  {{ interactiveScore(item) }}%</a>
            <span :class="interactiveScore(item)>0?'iconfont icon-up':'iconfont icon-down'" :style="{color:item.userTotalRatio>0?'green':'red'}" />
          </p>
        </li>
        <li>
          <h2>{{ item.activeUserCount }}</h2>
          <a>日活跃用户</a>
          <p>
            <a>环比昨日  {{ item.activeUserCountRatio }}%</a>
            <span :class="item.activeUserCountRatio>0?'iconfont icon-up':'iconfont icon-down'" :style="{color:item.userTotalRatio>0?'green':'red'}" />
          </p>
        </li>
      </ul>
      <div class="enter-icon">
        <span class="iconfont icon-right" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  allStatistics
} from '@/api/index'

export default {
  name: 'DataStatistics',
  // props: {
  //   timesharingData: {
  //     type: Object,
  //     default() {
  //       return {}
  //     }
  //   }
  // },
  // props: ['timesharingData'],
  data() {
    return {
      dataList: [],
      isUpdate: false,
      // 请求参数
      queryData: {
        data: {},
        code: '2603'
      },
      timeSharingData: ''
    }
  },
  watch: {
    // timesharingData(newValue, oldValue) {
    //   this.dataList = Object.assign({}, this.dataList, newValue) // 新数组替换旧数组
    // }
    // dataList(newValue, oldValue) {
    //   this.dataList = Object.assign({}, this.dataList, newValue); //新数组替换旧数组
    // },
  },
  created() {
    this.getData(this.queryData)
  },
  methods: {
    // 请求总数据
    getData(obj) {
      allStatistics(obj).then(res => {
        if (res.success && res.errorCode === 0) {
          const data = res.data
          this.dataList = data
        }
      })
    },
    // 计算互动总数（如果某个值为null，防止NAN出现）
    interactive(obj) {
      obj.forumCount = obj.forumCount ? obj.forumCount : 0
      obj.commentCount = obj.commentCount ? obj.commentCount : 0
      obj.goodClick_count = obj.goodClick_count ? obj.goodClick_count : 0
      obj.trunCount = obj.trunCount ? obj.trunCount : 0
      obj.clockCount = obj.clockCount ? obj.clockCount : 0
      obj.rewardCount = obj.rewardCount ? obj.rewardCount : 0
      const interactiveTotal = parseInt(obj.forumCount + obj.commentCount + obj.goodClick_count + obj.trunCount + obj.clockCount + obj.rewardCount)
      return interactiveTotal
    },
    // 计算互动环比数
    interactiveScore(obj) {
      obj.forumCountRatio = obj.forumCountRatio ? obj.forumCountRatio : 0
      obj.commentCountRatio = obj.commCountRatio ? obj.commCountRatio : 0
      obj.goodClickCountRatio = obj.commentCountRatio ? obj.commentCountRatio : 0
      obj.trunCountRatio = obj.trunCountRatio ? obj.trunCountRatio : 0
      obj.clockCountRatio = obj.clockCountRatio ? obj.clockCountRatio : 0
      obj.rewardCountRatio = obj.rewardCountRatio ? obj.rewardCountRatio : 0
      const scoreTotal = parseInt(obj.forumCountRatio + obj.commentCountRatio + obj.goodClickCountRatio + obj.trunCountRatio + obj.clockCountRatio + obj.rewardCountRatio)
      return scoreTotal
    },
    // 刷新总数据
    updataDataStetis() {
      this.isUpdate = true
      this.getData(this.queryData)
      // this.$emit("updataDataStetis");
      setTimeout(() => {
        this.isUpdate = false
      }, 300)
    }
  }
}
</script>
<style scoped lang="scss">
  .dataStatistics-container{
    height: 156px;
		margin: 12px 0;
		padding: 15px 10px;
    box-sizing: border-box;
    .dataStatistics-con-title{
			display: flex;
      justify-content: space-between;
      p{
        padding-right: 20px;
        position: relative;
        a{
          color: #999;
          font-size: 12px;
          padding-right: 20px;
        }
        .icon-shuaxin{
          cursor: pointer;
        }
        .updata-icon{
          position: absolute;
          right: 0;
          top: -2px;
        }
      }
		}
		.dataStatistics-con-list{
			display: flex;
      margin: 10px 15px;
      ul{
        width: 95%;
        padding: 10px 0;
        display: flex;
        li{
          width: 25%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 12px;
          color: #666;
          line-height: 22px;
          h2{
            color: #222;
          }
          p{
            display: flex;
            span{
              display: inline-block;
            }
          }
        }
      }
      .enter-icon{
        width: 5%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
		}
  }
</style>
