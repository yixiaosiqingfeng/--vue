<template>
  <div class="showStatistics-container boxShadow">
    <div class="show-con-title">
      <p class="ft18 fw">节目统计</p>
      <p>
        <a>更新时间：2019-06-15  12：00</a>
        <span v-if="!isUpdate" class="iconfont icon-shuaxin updata-icon" @click="updataShowStetis" />
        <i v-if="isUpdate" class="el-icon-loading updata-icon" />
      </p>
    </div>
    <div class="show-con-progress">
      <h6 :class="activeShowName === 0 ?'actived-all':''" @click="activeShowName = 0">全部</h6>
      <span v-for="item in dataList" :key="item.id" :class="item.id === activeShowName?'actived':''" @click="handleShowName(item)">
        {{ item.name }}
      </span>
      <p>更多</p>
    </div>
    <transition name="fade-transform" mode="out-in">
      <component :is="activedIndex" :active-item="activedIndex !== 'AllList' ? '':activeItem" />
    </transition>
    <div class="show-con-new">
      <ul>
        <li v-for="item in hotToptic" :key="item.id">
          <span class="top-ranking">{{ item.top }}</span>
          <p class="showname">#{{ item.name }}</p>
          <p>
            <span :class="item.icon" :style="{color:item.icon==='iconfont icon-up'?'green':'red'}" />
            <a>热度值</a>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ShowStatList from './showLists/ShowStatList'
import AllList from './showLists/AllList'
import ShowList1 from './showLists/ShowList1'
import ShowList2 from './showLists/ShowList2'
import ShowList3 from './showLists/ShowList3'
import ShowList4 from './showLists/ShowList4'

export default {
  name: 'ShowStatistics',
  components: { ShowStatList, AllList },
  data() {
    return {
      activedIndex: AllList,
      hotToptic: [
        { id: 1, top: 'Top1', name: '节目名称', hotValue: 200, icon: 'iconfont icon-up' }, { id: 2, top: 'Top2', name: '节目名称', hotValue: 200, icon: 'iconfont icon-down' }, { id: 3, top: 'Top3', name: '节目名称', hotValue: 200, icon: 'iconfont icon-down' },
        { id: 4, top: 'Top4', name: '节目名称', hotValue: 200, icon: 'iconfont icon-up' }, { id: 5, top: 'Top5', name: '节目名称', hotValue: 200, icon: 'iconfont icon-down' }, { id: 6, top: 'Top6', name: '节目名称', hotValue: 200, icon: 'iconfont icon-down' }
      ],
      dataList: [
        { id: 1, path: ShowList1, name: '节目名称', userNum: 1200, userName: '用户总数', playNum: 1000, playName: '播放总数', upNum: 1400, upNumName: '上升总数', watchNum: 900, watchName: '观看总数', score: '23%', icon: 'iconfont icon-up' },
        { id: 2, path: ShowList2, name: '节目名称', userNum: 3200, userName: '用户总数', playNum: 800, playName: '播放总数', upNum: 1400, upNumName: '上升总数', watchNum: 900, watchName: '观看总数', score: '3%', icon: 'iconfont icon-down' },
        { id: 3, path: ShowList3, name: '节目名称', userNum: 4200, userName: '用户总数', playNum: 900, playName: '播放总数', upNum: 1400, upNumName: '上升总数', watchNum: 900, watchName: '观看总数', score: '10%', icon: 'iconfont icon-up' },
        { id: 4, path: ShowList4, name: '节目名称', userNum: 5000, userName: '用户总数', playNum: 1900, playName: '播放总数', upNum: 1400, upNumName: '上升总数', watchNum: 900, watchName: '观看总数', score: '11%', icon: 'iconfont icon-up' }
      ],
      activeShowName: 0,
      activeItem: '',
      isUpdate: false
    }
  },
  watch: {
    activeItem(newValue, oldValue) {
      this.activeItem = newValue
    },
    activeShowName(newValue, oldValue) {
      this.activeShowName = newValue
      if (this.activeShowName === 0) {
        this.activedIndex = AllList
      }
    }
  },
  methods: {
    handleShowName(item) {
      this.dataList.map((items) => {
        if (items.id === item.id) {
          this.activeShowName = item.id
          this.activeItem = item
          localStorage.setItem('activeItem', JSON.stringify(item))
          if (this.activeShowName === 0) {
            this.activedIndex = AllList
          } else if (item.path === items.path) {
            this.activedIndex = item.path
          }
        }
      })
    },
    // 刷新小图标
    updataShowStetis() {
      this.isUpdate = true
      setTimeout(() => {
        this.isUpdate = false
      }, 300)
    }
  }
}
</script>
<style scoped lang="scss">
  .showStatistics-container{
    padding: 15px 10px 5px;
    .show-con-title{
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
    .show-con-progress{
      margin: 25px 20px;
      display: flex;
      align-items: center;
      font-size: 13px;
      h6{
        color: #666;
        padding: 6px 22px 6px;
        border: 1px solid #ccc;
        cursor: pointer;
      }
      .actived-all{
        background: rgb(241, 116, 58);
        color: #fff;
        border: 1px solid rgb(241, 116, 58);
        cursor: pointer;
      }
      span{
        padding: 6px 46px;
        border: 1px solid #ccc;
        color: #666;
        cursor: pointer;
      }
      .actived{
        background: rgb(241, 116, 58);
        color: #fff;
        border: 1px solid rgb(241, 116, 58);
      }
      p{
        color: #888;
        padding: 6px 20px;
        border: 1px solid #ccc;
        cursor: pointer;
      }
    }
    .show-con-new{
      margin: 15px 20px;
      ul{
        display: flex;
        flex-wrap: wrap;
        li{
          width: 40%;
          display: flex;
          align-items: center;
          font-size: 10px;
          color: #333;
          margin: 10px 15px 10px 0;
          .top-ranking{
            background: rgb(247, 72, 72);
            color: #fff;
            border: 1px solid rgb(247, 72, 72);
            border-radius: 5px;
            padding: 1px 5px;
          }
          .showname{
            margin: 0 40px 0 10px;
          }
          p{
            display: flex;
            align-items: center;
            i{
              display: inline-block;
              width: 16px;
              height: 16px;
              border:1px solid #ddd;
            }
            a{
              padding: 2px 5px;
            }
          }
        }
      }
    }
  }
</style>
