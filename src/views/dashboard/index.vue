<template>
  <div class="dashboard-container">
    <div class="con-left">
      <Weather />
      <!-- <DataStatistics :timesharing-data="timeSharingData" @updataDataStetis="updateTimeShare" /> -->
      <DataStatistics />
      <ShowStatistics />
      <Todolish />
    </div>
    <div class="con-right">
      <TopicHeat />
      <PostsRank />
    </div>
  </div>
</template>

<script>
import Weather from './weather'
import DataStatistics from './dataStatistics'
import ShowStatistics from './showStatistics'
import Todolish from './todolish'
import TopicHeat from './topicHeat'
import PostsRank from './postsRank'
import {
  timeSharingStatistics
} from '@/api/index'

export default {
  name: 'Dashboard',
  components: { Weather, DataStatistics, ShowStatistics, Todolish, TopicHeat, PostsRank },
  data() {
    return {
      currentRole: 'adminDashboard',
      timeSharingParam: { // 分时统计参数
        data: {},
        code: '2602'
      }
      // timeSharingData:'',
    }
  },
  created() {
    this.getTimeShareData(this.timeSharingParam)
  },
  methods: {
    // 获取分时数据
    getTimeShareData(obj) {
      timeSharingStatistics(obj).then(res => {
        if (res.success && res.errorCode === 0) {
          this.timeSharingData = res.data
        }
      })
    },
    updateTimeShare() {
      // this.getTimeShareData(this.timeSharingParam);
    }
  }
}
</script>
<style scoped lang="scss">
@import "../../styles/index.scss";
  .dashboard-container{
    display: flex;
    justify-content: space-between;
    height: calc(100vh - 53px);
    overflow-y: scroll;
    .con-left{
      width: 70%;
      display: flex;
      flex-direction: column;
    }
    .con-right{
      width: 29%;
      margin-left: 15px;
      height: 880px;
      display: flex;
      flex-direction: column;
    }
  }
</style>
