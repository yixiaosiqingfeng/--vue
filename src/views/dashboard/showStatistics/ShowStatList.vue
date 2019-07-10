<template>
  <div class="showStatList-container">

    <!-- <div class="appss">
  <div ref="msgDiv">{{msg}}</div>
  <div v-if="msg1">Message got outside $nextTick: {{msg1}}</div>
  <div v-if="msg2">Message got inside $nextTick: {{msg2}}</div>
  <div v-if="msg3">Message got outside $nextTick: {{msg3}}</div>
  <button @click="changeMsg">
    Change the Message
  </button>
</div> -->

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
  props: ['activeItem'],
  data() {
    return {
      getItem: ''
      // msg: 'Hello Vue.',
      // msg1: '',
      // msg2: '',
      // msg3: ''
    }
  },
  watch: {
    activeItem(newValue, oldValue) {
      this.getItem = newValue
    }
  },
  created() {
    this.getItem = this.activeItem
    console.log('getItem', this.getItem)
  },
  methods: {
    // changeMsg() {
    //   this.msg = "Hello world."
    //   this.msg1 = this.$refs.msgDiv.innerHTML
    //   this.$nextTick(() => {
    //     this.msg2 = this.$refs.msgDiv.innerHTML
    //   })
    //   this.msg3 = this.$refs.msgDiv.innerHTML
    // }
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
        // p{
        //   width: 22px;
        //   height: 22px;
        //   border: 1px solid #ccc;
        //   color: #888;
        //   border-radius: 50%;
        //   text-align: center;
        //   line-height: 22px;
        //   box-shadow: 3px 3px 3px 1px #ddd;
        //   cursor: pointer;
        // }
      }
    }
  }
</style>
