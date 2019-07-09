<template>
  <div class="mt20">
    <div v-show="videoUploadPercent!==0">
      <el-progress
        v-show="!videoFlag"
        :width="50"
        type="circle"
        :percentage="videoUploadPercent"
      />
      <video
        v-if="imageUrl"
        v-show="videoFlag"
        :src="imageUrl"
        style="width:50px;height:50px;"
        @click="abc(imageUrl)"
      />
    </div>
    <el-upload
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :limit="1"
      :on-exceed="handleExceed"
      :on-progress="uploadVideoProcess"
      :before-upload="beforeAvatarUpload"
    >
      <el-button type="text">点击上传</el-button>
    </el-upload>
    <div>
      <el-dialog
        title=""
        :visible.sync="dialogVisible"
        width="50%"
      >
        <div>
          <video :src="imageUrl" controls="controls" />
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imageUrl: '',
      videoUploadPercent: 0,
      dialogVisible: false,
      videoFlag: false
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.videoFlag = true
    },
    beforeAvatarUpload(file) {
      const typeArr = ['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb']
      const isType = typeArr.includes(file.type)
      const isSize = file.size / 1024 / 1024 < 200
      if (!isType) {
        this.$message.error('请选择视频上传')
      }
      if (!isSize) {
        this.$message.error('视频大小不能超出200M')
      }
      return isType && isSize
    },
    uploadVideoProcess(event, file) {
      this.videoUploadPercent = parseInt(file.percentage)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    abc() {
      this.dialogVisible = true
    }
  }
}
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
