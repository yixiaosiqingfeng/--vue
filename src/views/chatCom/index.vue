<template>
  <div style="display:flex;">
    <div style="width:860px;box-shadow: 0 0 10px #ddd;">
      <navbar path="/chatCom" />
    </div>
    <div style="flex:1;">
      <div style="margin-left: 15px;">
        <!-- 右上部分（统计） -->
        <topicCensus />
        <!-- 右下部分（我的） -->
        <topicMine />
      </div>
    </div>
  </div>
</template>
<script>
import topicCensus from './topic/components/topic_census.vue'
import topicMine from './topic/components/topic_mine.vue'

import navbar from '@/components/navbarTop'

export default {
  components: { navbar, topicCensus, topicMine }
}
</script>
