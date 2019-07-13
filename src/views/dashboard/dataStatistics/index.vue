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
      <ul>
        <li v-for="item in dataList" :key="item.id">
          <h2>{{ item.num }}</h2>
          <a>{{ item.title }}</a>
          <p>
            <a>环比昨日  {{ item.score }}</a>
            <span :class="item.icon" :style="{color:item.icon==='iconfont icon-up'?'green':'red'}" />
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
  data() {
    return {
      dataList: [
        { id: 1, title: '用户总数', num: 1200, score: '2%', icon: 'iconfont icon-up' }, { id: 2, title: '用户总数', num: 1200, score: '4%', icon: 'iconfont icon-down' },
        { id: 3, title: '用户总数', num: 1200, score: '2%', icon: 'iconfont icon-down' }, { id: 4, title: '用户总数', num: 1200, score: '11%', icon: 'iconfont icon-up' }
      ],
      isUpdate: false,
      // 请求参数
      queryData: {
        data: {},
        code: '2602'
      }
    }
  },
  created() {
    this.getData(this.queryData)
  },
  methods: {
    getData(obj) {
      allStatistics(obj).then(res => {
        if (res.success && res.errorCode === 0) {
          console.log('res', res)
        }
      })
    },
    updataDataStetis() {
      this.isUpdate = true
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
