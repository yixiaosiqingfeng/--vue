<template>
  <div class="photo_maxbox">
    <div style="display: flex;justify-content: space-between;margin-bottom: 10px;">
      <span>本地上传</span>
      <span class="el-icon-close" />
    </div>
    <div style="margin-bottom: 10px;">
      <p>最多可选择9张图片进行上传</p>
    </div>
    <div class="maxbox_up">
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :limit="9"
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
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>
<style scoped>
.photo_maxbox{
  width: 286px;
  background-color: #fff;
  box-shadow: 5px 5px 2px #ccc;
  max-height: 322px;
  overflow: hidden;
}
.maxbox_up /deep/ .el-upload--picture-card{
  width: 80px;
  height: 80px;
  line-height:80px;
  margin-bottom: 10px;
}
.maxbox_up /deep/ .el-upload-list--picture-card .el-upload-list__item-actions{
  width: 80px;
  height: 80px;
  line-height:80px;
}
.maxbox_up /deep/.el-upload-list--picture-card .el-upload-list__item-thumbnail{
  width: 80px;
  height: 80px;
  line-height:80px;
}
.maxbox_up /deep/.el-upload-list--picture-card .el-upload-list__item{
  width: 80px;
  height: 80px;
}
</style>
