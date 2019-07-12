<template>
  <div class="topicHeat-container boxShadow">
    <div class="topHeat-con-title">
      <p class="ft18 fw">话题热度</p>
      <a>更多</a>
    </div>
    <ul>
      <li v-for="item in heatToptic" :key="item.id">
        <p class="top-num"><span :class="item.icon" :style="{color:item.color,fontSize:item.fontS}" /></p>
        <p>#{{ item.topicName }}</p>
        <p>
          <span class="iconfont icon-zan" />
          <a>21100</a>
        </p>
        <p>
          <span class="iconfont icon-pinglun" />
          <a>21100</a>
        </p>
      </li>
    </ul>
  </div>
</template>
<script>

export default {
  name: 'TopicHeat',
  data() {
    return {
      color: '#333',
      heatToptic: [
        { id: 1, topicName: '话题名称话题名称话题名称', fontS: '30', icon: 'iconfont icon-paihang1 top-num1', postsNum: 21110, reduNum: 2100, color: 'rgb(242,192,86)' },
        { id: 2, topicName: '话题名称话题名称话题名称', fontS: '19', icon: 'iconfont icon-paihang top-num2', postsNum: 21110, reduNum: 2100, color: 'rgb(233,233,216)' },
        { id: 3, topicName: '话题名称话题名称话题名称', fontS: '18', icon: 'iconfont icon-paihang4 top-num3', postsNum: 21110, reduNum: 2100, color: 'rgb(186,110,64)' },
        { id: 4, topicName: '话题名称话题名称话题名称', fontS: '16', icon: 'iconfont icon-paiming6 top-num4', postsNum: 21110, reduNum: 2100, color: 'rgb(102, 102, 102)' },
        { id: 5, topicName: '话题名称话题名称话题名称', fontS: '16', icon: 'iconfont icon-paiming5 top-num4', postsNum: 21110, reduNum: 2100, color: 'rgb(102, 102, 102)' }
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
  .icon-zan,.icon-pinglun{
    cursor: pointer;
  }
  .topicHeat-container{
    padding: 12px 12px 5px 12px;
    margin-bottom: 7px;
    height: 209px;
    box-sizing: border-box;
    .topHeat-con-title{
      display: flex;
      justify-content: space-between;
      a{
        font-size: 12px;
        color: rgb(102, 102, 102);
      }
    }
    ul{
      margin-top: 20px;
      li{
        display: flex;
        justify-content: space-between;
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

      }
    }
  }
</style>
