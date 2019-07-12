<template>
  <div style="box-shadow:0 0 15px #eee;">
    <postChange v-model="value" @submit="submit" />
  </div>
</template>
<script>
import postChange from './post_change'
import axios from 'axios'
export default {
  components: { postChange },
  data() {
    return {
      value: ' ',
      ty: 10,
      img_url: [],
      changeData: {}
    }
  },
  watch: {
    value() {
      console.log(11)
    }
  },
  methods: {
    submit(topicData, photoData, changeData) {
      console.log(222222222222)
      // if (this.value === '') {
      //   this.$message.warning('请输入文本内容')
      //   return
      // }
      console.log(222222222222)
      // 说明存在图片
      // if (photoData.length !== 0) {
      //   this.ty = 20
      //   for (const a in photoData) {
      //     console.log(photoData[a].realPath + photoData[a].fileName, 99999999)
      //     this.img_url.push(photoData[a].realPath + photoData[a].fileName)
      //   }
      // }
      this.$confirm('是否修改?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          const p = {
            code: '1805',
            data: {
              // subjectId: topicData.id, // 话题id 必填
              // appAccountId: this.$store.getters.userInFo.appAccountId, // app账号id 必填
              // userInfoId: '5065c133e64d4973a9ae504868aaa766', // 用户信息id 必填
              // create_name: '张小三', // 马甲名字
              // img_url: this.img_url.join(','), // 图片路径 选填
              // video_url: '', // 视频路径 选填
              // link_url: '', // 外链地址 选填
              // Type: this.ty, // 预览类型10纯文字；20图文；30小视频
              // program_id: '' // 节目id 选填
              content: this.value, // 内容
              id: changeData.id
            }
          }
          axios
            .post('http://192.168.0.18:3366/community_auth/update_forum_v1', p)
            .then(res => {
              if (res.data.success && res.data.errorCode === 0) {
                this.$message({
                  type: 'success',
                  message: '修改成功!'
                })
                this.value = ''
                this.$emit('addPost')
              } else {
                this.$message.error(res.data.msg)
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
