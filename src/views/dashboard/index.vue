<template>
  <div class="dashboard-container">
    <div class="con-left">
      <Weather />
      <DataStatistics />
      <ShowStatistics />
      <Todolish />
    </div>
    <div class="con-right">
      <TopicHeat />
      <PostsRank />
      <!-- <PostsRank :today-pupular-data="todayPupularData" /> -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Weather from './weather'
import DataStatistics from './dataStatistics'
import ShowStatistics from './showStatistics'
import Todolish from './todolish'
import TopicHeat from './topicHeat'
import PostsRank from './postsRank'
// import {
//   todayPopular
// } from '@/api/index'

export default {
  name: 'Dashboard',
  components: { Weather, DataStatistics, ShowStatistics, Todolish, TopicHeat, PostsRank },
  data() {
    return {
      currentRole: 'adminDashboard'
      // todayPupularData: '' // 热门排行榜数据
    }
  },
  created() {
    this.getTodayPopularData(this.todayPupularParam)
  },
  methods: {
    // 今日热门数据
    getTodayPopularData(obj) {
      const todayPupularParam = {
        data: {},
        code: '1808'
      }
      axios
        .post('http://192.168.0.18:3366/community_auth/select_forum_top10_v1', todayPupularParam)
        .then(res => {
          if (res.data.success && res.data.errorCode === 0) {
            this.todayPupularData = res
            console.log('todayPupularParam', this.todayPupularData)
          } else {
            this.$message.error(res.data.msg)
          }
        })
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
      margin-left: 15px;
      height: 880px;
      display: flex;
      flex-direction: column;
    }
  }
</style>
