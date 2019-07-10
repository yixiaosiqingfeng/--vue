<template>
  <div class="allList-container">
    <div class="show-con-date">
      <div class="times">
        <span>今日</span>
        <span class="border">本周</span>
        <span>本月</span>
      </div>
      <div class="date">
        <p>
          <span>6月17日</span>
        </p>
        <span> - </span>
        <p>
          <span>6月17日</span>
        </p>
      </div>
      <P class="search">搜索</P>
    </div>
    <div class="show-con-list">
      <div class="list-left">
        <ul v-for="item in allData" :key="item.id">
          <li>
            <h2>{{ item.userNum }}</h2>
            <a>{{ item.userName }}</a>
            <p>
              <a>环比昨日  {{ item.score }}</a>
              <span :class="item.icon" :style="{color:item.icon==='iconfont icon-up'?'green':'red'}" />
            </p>
          </li>
          <li>
            <h2>{{ item.playNum }}</h2>
            <a>{{ item.playName }}</a>
            <p>
              <a>环比昨日  {{ item.score }}</a>
              <span :class="item.icon" :style="{color:item.icon==='iconfont icon-up'?'green':'red'}" />
            </p>
          </li>
          <li>
            <h2>{{ item.upNum }}</h2>
            <a>{{ item.upNumName }}</a>
            <p>
              <a>环比昨日  {{ item.score }}</a>
              <span :class="item.icon" :style="{color:item.icon==='iconfont icon-up'?'green':'red'}" />
            </p>
          </li>
          <li>
            <h2>{{ item.watchNum }}</h2>
            <a>{{ item.watchName }}</a>
            <p>
              <a>环比昨日  {{ item.score }}</a>
              <span :class="item.icon" :style="{color:item.icon==='iconfont icon-up'?'green':'red'}" />
            </p>
          </li>
        </ul>
      </div>
      <div class="enter-icon">
        <span class="iconfont icon-right" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AllList',
  data() {
    return {
      allData: [
        { id: 0, userNum: 9200, userName: '用户总数', playNum: 1000, playName: '播放总数', upNum: 1400, upNumName: '上升总数', watchNum: 900, watchName: '观看总数', score: '23%', icon: 'iconfont icon-up' }
      ]
    }
  }
}
</script>
<style scoped lang="scss">
  .allList-container{
    .show-con-date{
      display: flex;
      align-items: center;
      margin: 15px 20px;
      font-size: 10px;
      .times{
        display: flex;
        border: 1px solid #ccc;
        cursor: pointer;
        span{
          padding: 3px 6px;
        }
        .border{
          border-left:1px solid #ccc;
          border-right:1px solid #ccc;
        }
      }
      .date{
        display: flex;
        margin: 0 25px;
        align-items: center;
        p{
          border: 1px solid #ccc;
          padding: 2px 4px;
        }
        span{
          margin: 0 5px;
          cursor: pointer;
        }
      }
      .search{
        background: skyblue;
        color: #fff;
        padding: 3px 10px;
        cursor: pointer;
      }
    }
    .show-con-list{
      display: flex;
      margin: 10px 15px;
      .list-left{
        width: 95%;
        padding: 10px 0;
        ul{
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
