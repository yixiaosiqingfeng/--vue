<template>
  <div class="photo_maxbox">
    <!-- 我我我 -->
    <div style="display: flex;justify-content: space-between;margin:10px 5px;">
      <span>上传图片</span>
      <span
        class="el-icon-close"
        style=" font-size: 18px;font-weight: 800;color:#696E78"
        @click.stop="changClose"
      />
    </div>
    <hr>
    <div>
      <p style="color:#82848a;margin:8px 5px;">最多可选择9张图片进行上传</p>
    </div>
    <div class="maxbox_up">
      <el-upload
        :action="queryUrl"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :limit="9"
        :data="resData"
        :on-success="handleSuccess"
        :on-error="hansleError"
        :multiple="true"
      >
        <i class="el-icon-plus" />
      </el-upload>
      <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
        <img width="100%" :src="dialogImageUrl" alt>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// import getToken from '../../../../utils/auth'
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      // headers:{
      //   token:getToken()
      // },
      resData: {
        type: 1
      },
      photoList: []
    }
  },
  computed: {
    queryUrl() {
      return 'http://192.168.0.18:8084/common/upload_v1'
      // return process.env.VUE_APP_BASE_API+'/common/upload_v1'
    }
  },
  methods: {
    // 删除图片
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    changClose() {
      this.$emit('changClose')
    },
    // 上传成功
    handleSuccess(res) {
      console.log(res, '我是上传成功的函数')
      if (res.success && res.errorCode === 0) {
        this.$message({
          type: 'success',
          message: '上传成功!'
        })
        this.photoList.push(res.data)
        this.$emit('upSuccess', this.photoList)
      } else {
        this.$message.error(res.msg)
      }
    },
    // 上传失败
    hansleError() {
      this.$message.error('上传失败')
    }
  }
}
</script>
<style scoped>
.photo_maxbox {
  width: 300px;
  background-color: #fff;
  box-shadow: 0 0 15px #eee;
  max-height: 322px;
  overflow: hidden;
}
.maxbox_up /deep/ .el-upload--picture-card {
  width: 80px;
  height: 80px;
  line-height: 80px;
  margin: 3px 10px;
}
.maxbox_up /deep/ .el-upload-list--picture-card .el-upload-list__item-actions {
  width: 80px;
  height: 80px;
  line-height: 80px;

}
.maxbox_up /deep/.el-upload-list--picture-card .el-upload-list__item-thumbnail {
  width: 80px;
  height: 80px;
  line-height: 80px;
}
.maxbox_up /deep/.el-upload-list--picture-card .el-upload-list__item {
  width: 80px;
  height: 80px;
  margin: 3px 10px;
}
</style>
