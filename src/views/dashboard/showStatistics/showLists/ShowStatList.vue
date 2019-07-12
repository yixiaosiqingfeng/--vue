<template>
  <div class="showStatList-container">
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
        <ul>
          <li>
            <h2>{{ getItem.userNum }}</h2>
            <a>{{ getItem.userName }}</a>
            <p>
              <a>环比昨日  {{ getItem.score }}</a>
              <span :class="getItem.icon" :style="{color:getItem.icon==='iconfont icon-up'?'green':'red'}" />
            </p>
          </li>
          <li>
            <h2>{{ getItem.playNum }}</h2>
            <a>{{ getItem.playName }}</a>
            <p>
              <a>环比昨日  {{ getItem.score }}</a>
              <span :class="getItem.icon" :style="{color:getItem.icon==='iconfont icon-up'?'green':'red'}" />
            </p>
          </li>
          <li>
            <h2>{{ getItem.upNum }}</h2>
            <a>{{ getItem.upNumName }}</a>
            <p>
              <a>环比昨日  {{ getItem.score }}</a>
              <span :class="getItem.icon" :style="{color:getItem.icon==='iconfont icon-up'?'green':'red'}" />
            </p>
          </li>
          <li>
            <h2>{{ getItem.watchNum }}</h2>
            <a>{{ getItem.watchName }}</a>
            <p>
              <a>环比昨日  {{ getItem.score }}</a>
              <span :class="getItem.icon" :style="{color:getItem.icon==='iconfont icon-up'?'green':'red'}" />
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
  name: 'ShowStatList',
  props: {
    activeItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      getItem: '', // 接收从父组件传过来的当条数值
      value1: '', // 日期框
      value2: '',
      times: [''],
      date: [{ id: 1, title: '今日' }, { id: 2, title: '本周' }, { id: 3, title: '本月' }],
      activeDate: 1
    }
  },
  watch: {
    activeItem(newValue, oldValue) {
      this.getItem = newValue
    }
  },
  created() {
    const activeItem = JSON.parse(localStorage.getItem('activeItem'))
    this.getItem = activeItem
  },
  methods: {

  }
}
</script>
<style scoped lang="scss">
  .showStatList-container{
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
        padding: 5px 11px;
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
      }
    }
  }
</style>
