<template>
  <div class="video_maxbox">
    <div style="display: flex;justify-content: space-between;margin:10px 5px;">
      <span>上传视频</span>
      <span
        class="el-icon-close"
        style=" font-size: 18px;font-weight: 800;color:#696E78"
        @click.stop="changClose"
      />
    </div>
    <hr>
    <div>
      <p style="color:#82848a;margin:8px 5px;">1 请选择视频链接或本地上传</p>
      <p style="color:#82848a;margin:8px 5px;">2 请上传200M以下的视频，请勿上传违法视频</p>
    </div>
    <!-- 外链上传 -->
    <div style="margin:8px 5px;">
      <span>视频链接：</span>
      <div style="margin:8px 5px;">
        <el-input v-model="input1" placeholder="请输入内容" size="mini">
          <template slot="prepend">Http://</template>
        </el-input>
      </div>
    </div>
    <!-- 本地上传 -->
    <div style="margin:8px 5px;">
      <el-upload
        class="upload-demo"
        :action="queryUrl"
        :on-remove="handleRemove"
        :limit="1"
        :data="resData"
        :on-exceed="handleExceed"
        :file-list="fileList"
        show-file-list
        :on-success="handleSuccess"
      >
        <span>本地上传：</span>
        <el-button size="mini" type="text">点击上传</el-button>
      </el-upload>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Postvideo',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      fileList: [],
      input1: '',
      resData: {
        type: 2
      }
    }
  },
  computed: {
    queryUrl() {
      return 'http://192.168.0.254:8084/common/upload_v1'
      // return process.env.VUE_APP_BASE_API+'/common/upload_v1'
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
    },
    handleSuccess(res) {
      if (res.success && res.errorCode === 0) {
        this.$message.success('上传成功')
      } else {
        this.$message.error(res.data.msg)
      }
    }
  }
}
</script>
<style scoped>
.video_maxbox {
  width: 300px;
}
</style>
