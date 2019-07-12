<template>
  <div>
    <biaoqin v-model="value" @submit="submit" />
    <div class="mt30">
      <el-upload
        class="upload-demo"
        action="http://192.168.0.18:8084/common/upload_v1"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :headers="headers"
        :limit="3"
        :data="resData"
        :on-exceed="handleExceed"
        :file-list="fileList"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
  </div>
</template>

<script>
import biaoqin from './biaoqing'

export default {
  name: 'Index',
  components: { biaoqin },
  data() {
    return {
      value: ' ',
      headers: {
        token: 'e32511ea75533f35ea948c42566a9dc0encryptKey'
      },
      resData: {
        type: 1
      },
      fileList: [
        {
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        },
        {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ]
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
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}
</script>

<style scoped>

</style>
