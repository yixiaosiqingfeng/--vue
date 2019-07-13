<template>
  <div class="topicHeat-container boxShadow">
    <div class="topHeat-con-title">
      <p class="ft18 fw">话题热度</p>
      <a>更多</a>
    </div>
    <ul v-if="heatToptic.length">
      <li v-for="item in heatToptic" :key="item.id">
        <p class="top-num"><span :class="item.icon" :style="{color:item.color,fontSize:item.fontS}" /></p>
        <p class="title">#{{ item.title }}</p>
        <p>
          <span class="iconfont icon-pinglun" />
          <a>{{ interactive(item) }}</a>
        </p>
        <p>
          <span class="iconfont icon-guanzhu" />
          <a>{{ item.follow }}</a>
        </p>
      </li>
    </ul>
    <ul v-else class="no-data">
      <span>无数据</span>
    </ul>
  </div>
</template>
<script>
import {
  hotTopic
} from '@/api/index'

export default {
  name: 'TopicHeat',
  data() {
    return {
      color: '#333',
      heatToptic: [],
      icon: ['iconfont icon-paihang1', 'iconfont icon-paihang', 'iconfont icon-paihang4', 'iconfont icon-paiming6', 'iconfont icon-paiming5'],
      colors: ['rgb(242,192,86)', 'rgb(233,233,216)', 'rgb(186,110,64)', 'rgb(102, 102, 102)', 'rgb(102, 102, 102)'],
      hotTopicParam: {
        code: '2607',
        data: {}
      }
    }
  },
  created() {
    this.getHotTopicData(this.hotTopicParam)
  },
  methods: {
    // 获取热门话题
    getHotTopicData(obj) {
      hotTopic(obj).then(res => {
        if (res.success && res.errorCode === 0) {
          this.heatToptic = res.data
          this.heatToptic.forEach((items, i) => {
            items.icon = this.icon[i]
            items.colors = this.colors[i]
          })
        }
      })
    },
    // 计算互动总数（如果某个值为null，防止NAN出现）
    interactive(obj) {
      obj.forumCount = obj.forumCount ? obj.forumCount : 0
      obj.commentCount = obj.commentCount ? obj.commentCount : 0
      obj.goodClickCount = obj.goodClickCount ? obj.goodClickCount : 0
      obj.trunCount = obj.trunCount ? obj.trunCount : 0
      // obj.clockCount=obj.clockCount?obj.clockCount:0 ;
      // obj.rewardCount=obj.rewardCount?obj.rewardCount:0 ;
      const interactiveTotal = parseInt(obj.forumCount + obj.commentCount + obj.goodClickCount + obj.trunCount)
      return interactiveTotal
    }
  }
}
</script>
<style scoped lang="scss">
  .icon-zan,.icon-pinglun{
    cursor: pointer;
  }
  .topicHeat-container{
    padding: 12px 20px 5px 12px;
    margin-bottom: 7px;
    height: 209px;
    box-sizing: border-box;
    .topHeat-con-title{
      display: flex;
      justify-content: space-between;
      a{
        font-size: 12px;
        color: rgb(102, 102, 102);
        cursor: pointer;
      }
    }
    ul{
      margin-top: 20px;
      li{
        display: flex;
        justify-content: space-around;
        margin: 11px 0;
        font-size: 12px;
        p{
          display: flex;
          align-items: center;
          justify-content: center;
          a{
            padding-left: 5px;
          }
          .icon-zan{
            color: rgb(109, 104, 104);
          }
        }
        .top-num{
          width: 29px;
          height: 20px;
          line-height: 20px;
          color: red;
          .top-num1{
            font-size: 22px;
          }
          .top-num2{
            font-size: 21px;
          }
          .top-num3{
            font-size: 19px;
          }
          .top-num4{
            font-size: 14px;
          }
        }
        .title{
          width: 100px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
    .no-data{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 50px;
      .el-icon-loading:before{
        font-size: 19px;
      }
      span{
        font-size: 14px;
        margin-top: 10px;
      }
    }
  }
</style>
