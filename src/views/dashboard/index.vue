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

export default {
  name: 'Dashboard',
  components: { Weather, DataStatistics, ShowStatistics, Todolish, TopicHeat, PostsRank },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  }
}
</script>
<style scoped lang="scss">
@import "../../styles/index.scss";
  .dashboard-container{
    overflow-y:scroll;
    height: 100%;
    display: flex;
    justify-content: space-between;
    height: calc(100vh - 51px);
    .con-left{
      width: 69%;
      display: flex;
      flex-direction: column;
    }
    .con-right{
      width: 30%;
      display: flex;
      flex-direction: column;
    }
  }
</style>
