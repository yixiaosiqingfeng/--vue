<template>
  <div class="allList-container">
    <div class="show-con-date">
      <div class="times">
        <span v-for="item in date" :key="item.id" :class="activeDate === item.id ? 'actived':''" @click="checkDate(item)">{{ item.title }}</span>
      </div>
      <div class="date">
        <el-date-picker
          v-model="value1"
          type="date"
          size="mini"
          placeholder="选择日期"
        />
        <span> - </span>
        <el-date-picker
          v-model="value2"
          type="date"
          size="mini"
          placeholder="选择日期"
        />
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
      ],
      value1: '',
      value2: '',
      date: [{ id: 1, title: '今日' }, { id: 2, title: '本周' }, { id: 3, title: '本月' }],
      activeDate: 1
    }
  },
  methods: {
    checkDate(item) {
      this.date.map((items) => {
        if (items.id === item.id) {
          this.activeDate = item.id
        }
      })
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
        border-right: none;
        cursor: pointer;
        span{
          padding: 5px 9px;
          border-right: 1px solid #ccc;
        }
        .actived{
          background: #eeecec;
          border: 1px solid #eeecec;
        }
      }
      .date{
        display: flex;
        margin: 0 25px;
        align-items: center;
        span{
          padding: 0 8px;
        }
      }
      .search{
        background: skyblue;
        color: #fff;
        padding: 5px 10px;
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
