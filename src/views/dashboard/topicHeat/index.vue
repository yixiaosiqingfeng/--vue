<template>
  <div class="topicHeat-container">
    <h5>话题热度</h5>
    <ul>
      <li v-for="item in heatToptic" :key="item.id">
        <p class="top-num" :style="{background:item.color}">{{ item.topicNum }}</p>
        <p>#{{ item.topicName }}</p>
        <p>
          <i />
          <span>21100</span>
        </p>
        <p>
          <i />
          <span>21100</span>
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
  .topicHeat-container{
    box-shadow: 2px 2px 2px 2px #ddd;
    padding: 15px;
    margin-bottom: 13px;
    ul{
      margin-top: 20px;
      li{
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
        font-size: 12px;
        p{
          display: flex;
          align-items: center;
          justify-content: center;
          i{
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 1px solid #ccc;
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
