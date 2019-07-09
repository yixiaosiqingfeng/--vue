<template>
  <div class="dataStatistics-container">
    <div class="dataStatistics-con-title">
      <h5>数据统计</h5>
      <p>
        <a>更新时间：2019-06-15  12：00</a>
        <span class="iconfont icon-shuaxin" />
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
        <p> > </p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DataStatistics',
  data() {
    return {
      dataList: [
        { id: 1, title: '用户总数', num: 1200, score: '2%', icon: 'iconfont icon-up' }, { id: 2, title: '用户总数', num: 1200, score: '4%', icon: 'iconfont icon-down' },
        { id: 3, title: '用户总数', num: 1200, score: '2%', icon: 'iconfont icon-down' }, { id: 4, title: '用户总数', num: 1200, score: '11%', icon: 'iconfont icon-up' }
      ]
    }
  },
  method: {
  },
  created() {

  }
}
</script>
<style scoped lang="scss">
  .dataStatistics-container{
		margin: 15px 0;
		box-shadow: 2px 2px 2px 2px #ddd;
		padding: 15px 10px;
    .dataStatistics-con-title{
			display: flex;
      justify-content: space-between;
      p{
        a{
          color: #999;
          font-size: 12px;
          padding-right: 20px;
        }
        .icon-shuaxin{
          cursor: pointer;
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
        p{
            width: 22px;
            height: 22px;
            border: 1px solid #ccc;
            color: #888;
            border-radius: 50%;
            text-align: center;
            line-height: 22px;
            box-shadow: 3px 3px 3px 1px #ddd;
            cursor: pointer;
        }
      }
		}
  }
</style>
