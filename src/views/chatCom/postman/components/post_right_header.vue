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
      this.$confirm('是否发布?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          const p = {
            code: '1804',
            data: {
              subjectId: topicData.id, // 话题id 必填
              appAccountId: this.$store.getters.userInFo.appAccountId, // app账号id 必填
              userInfoId: '5065c133e64d4973a9ae504868aaa766', // 用户信息id 必填
              create_name: '张小三', // 马甲名字
              content: this.value, // 内容
              img_url: '', // 图片路径 选填
              video_url: '', // 视频路径 选填
              link_url: '', // 外链地址 选填
              Type: 10, // 预览类型10纯文字；20图文；30小视频
              program_id: '' // 节目id 选填
            }
          }
          axios
            .post('http://192.168.0.18:8088/app_auth/post_forum_v1', p)
            .then(res => {
              if (res.success && res.code === 0) {
                console.log(res, 1111)
                this.$message({
                  type: 'success',
                  message: '发布成功!'
                })
              } else {
                this.$message.error(res.msg)
              }
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    }
  }
}
</script>
<style scoped>
</style>
