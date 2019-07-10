<template>
  <div style="box-shadow:0 0 15px #eee;" class="ml5">
    <biaoqin v-model="value" @submit="submit" />
  </div>
</template>
<script>
import biaoqin from './biaoqing'
import axios from 'axios'
export default {
  components: { biaoqin },
  data() {
    return {
      value: ''
    }
  },
  watch: {
    value() {
      console.log(11)
    }
  },
  methods: {
    submit(topicData) {
      console.log(this.value, 222)
      console.log(this.$store.getters.userInFo, 3333)
      console.log(topicData)
      const p = {
        code: '1804',
        data: {
          subjectId: '1', // 话题id 必填
          appAccountId: this.$store.getters.userInFo.appAccountId, // app账号id 必填
          userInfoId: this.$store.getters.userInFo.id, // 用户信息id 必填
          create_name: '5065c133e64d4973a9ae504868aaa766', // 马甲名字
          content: this.value, // 内容
          img_url: '', // 图片路径 选填
          video_url: '', // 视频路径 选填
          link_url: '', // 外链地址 选填
          Type: 10, // 预览类型10纯文字；20图文；30小视频
          program_id: ''// 节目id 选填
        }
      }
      axios.post('http://192.168.0.18:8088/admin_auth/post_forum_v1', p).then(res => {
        console.log(res, 1111)
      })
    }
  }
}
</script>
<style scoped>
</style>
