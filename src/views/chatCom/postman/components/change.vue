<template>
  <!-- 我我我 -->
  <div style="box-shadow:0 0 15px #eee;">
    <postc v-model="value" @changePost="changePost" />
  </div>
</template>
<script>
import postc from './post_change'
import axios from 'axios'
export default {
  components: { postc },
  props: {
    changeData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      value: ' ',
      ty: 10,
      img_url: []
    }
  },
  watch: {
    value() {
      console.log(11)
    },
    changeData: {
      handler(n,) {
        console.log(n, '我是接收方')
        this.value = n.content
      },
      deep: true
    }
  },
  methods: {
    changePost(topicData, photoData) {
      console.log(this.changeData, '传入数据')
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
              content: this.value, // 内容
              id: this.changeData.id
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
                this.$emit('changePost')
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
