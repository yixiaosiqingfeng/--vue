<template>
  <div class="topicHeat-container">
    <div class="topHeat-con-title">
      <p class="ft18 fw">话题热度</p>
      <a>更多</a>
    </div>
    <ul>
      <li v-for="item in heatToptic" :key="item.id">
        <p class="top-num" :style="{background:item.color}">{{ item.topicNum }}</p>
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
        { id: 1, topicName: '话题名称话题名称话题名称', topicNum: 'Top1', postsNum: 21110, reduNum: 2100, color: 'red' },
        { id: 2, topicName: '话题名称话题名称话题名称', topicNum: 'Top2', postsNum: 21110, reduNum: 2100, color: 'orange' },
        { id: 3, topicName: '话题名称话题名称话题名称', topicNum: 'Top3', postsNum: 21110, reduNum: 2100, color: 'orange' },
        { id: 4, topicName: '话题名称话题名称话题名称', topicNum: '4', postsNum: 21110, reduNum: 2100, color: '#ccc' },
        { id: 5, topicName: '话题名称话题名称话题名称', topicNum: '5', postsNum: 21110, reduNum: 2100, color: '#ccc' }
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
    box-shadow: 2px 2px 2px 2px #ddd;
    padding: 12px;
    margin-bottom: 13px;
    height: 211px;
    box-sizing: border-box;
    .topHeat-con-title{
      display: flex;
      justify-content: space-between;
      a{
        font-size: 12px;
        color: #666;
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
          width: 33px;
          color: #fff;
          border: 1px solid #ccc;
          border-radius: 8px;
          padding:2px;
        }
      }
    }
  }
</style>
