<template>
  <div class="video_maxbox">
    <div style="display: flex;justify-content: space-between;margin:10px 5px;">
      <span>链接</span>
      <span
        class="el-icon-close"
        style=" font-size: 18px;font-weight: 800;color:#696E78"
        @click.stop="changClose"
      />
    </div>
    <hr>
    <div>
      <p style="color:#82848a;margin:8px 5px;">请选择需要上传的链接</p>
    </div>
    <!-- 本地上传 -->
    <div style="margin:8px 5px;">
      <el-input v-model="input1" placeholder="请输入" size="mini">
        <template slot="prepend">Http://</template>
      </el-input>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Postlink',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      fileList: [],
      input1: ''
    }
  },
  methods: {
    changClose() {},
    handleRemove(file) {
      console.log(file)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload(file) {
      console.log(file)
    },
    handleExceed() {
      this.$message.warning('只能上传一个视频！')
    }
  }
}
</script>
<style scoped>
.video_maxbox {
  width: 300px;
}
</style>
