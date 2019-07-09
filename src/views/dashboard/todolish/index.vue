<template>
  <div class="todolish-container">
    <div class="todolish-con-title">
      <h5>节目统计</h5>
      <p>
        <span>更新时间：2019-06-15  12：00</span>
        <a>刷新</a>
      </p>
    </div>
    <ul class="todolish-con-list">
      <li v-for="item in todoList" :key="item.id">
        <p>报题审核</p>
        <p class="todo-name">报题名称报题名称报题名称报题名称报题名称</p>
        <p>申请人</p>
        <p>提审时间</p>
        <p>审核人：张一，张二</p>
        <p class="status">待审</p>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'Todolish',
  data() {
    return {
      todoList: [
        { id: 1, title: '报题审核', name: '', proposer: '申请人', time: '提审时间', reviewer: '张一，张二', status: '待审' },
        { id: 2, title: '报题审核', name: '', proposer: '申请人', time: '提审时间', reviewer: '张一，张二', status: '待审' },
        { id: 3, title: '报题审核', name: '', proposer: '申请人', time: '提审时间', reviewer: '张一，张二', status: '待审' },
        { id: 4, title: '报题审核', name: '', proposer: '申请人', time: '提审时间', reviewer: '张一，张二', status: '待审' },
        { id: 5, title: '报题审核', name: '', proposer: '申请人', time: '提审时间', reviewer: '张一，张二', status: '待审' }
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
  .todolish-container{
    margin: 15px 0;
    box-shadow: 2px 2px 2px 2px #ddd;
    padding: 15px 10px;
    .todolish-con-title{
      display: flex;
      justify-content: space-between;
      p{
        span{
          color: #999;
          font-size: 12px;
          padding-right: 20px;
        }
        a{
          font-size: 13px;
        }
      }
    }
    .todolish-con-list{
      margin: 30px 20px;
      font-size: 14px;
      li{
        display: flex;
        justify-content: space-between;
        margin: 16px 0;
        .todo-name{
          width: 100px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .status{
          color: red;
        }
      }

    }
  }
</style>
