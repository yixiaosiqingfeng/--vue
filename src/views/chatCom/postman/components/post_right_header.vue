<template>
  <div style="box-shadow: 2px 2px 2px 2px #eee;">
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
    submit() {
      console.log(this.value, 222)
      const p = {
        code: '1804',
        data: {
          subjectId: '1', // 话题id 必填
          appAccountId: '13750565011', // app账号id 必填
          userInfoId: '10', // 用户信息id 必填
          create_name: '',
          content: this.value,
          img_url: '',
          video_url: '',
          link_url: '',
          Type: '10', // 预览类型10纯文字；20图文；30小视频
          program_id: ''
        }
      }
      console.log(axios)
      axios.post('http://192.168.0.18:8088/admin_auth/post_forum_v1', p).then(res => {
        console.log(res, 1111)
      })
    }
  }
}
</script>
<style scoped>
</style>
