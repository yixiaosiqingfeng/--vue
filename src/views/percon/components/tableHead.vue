<template>
  <div>
    <div class="mechan_header">
      <span>功能编码：</span>
      <el-input v-model="input" placeholder="请输入" class="mechan_header_input" />
      <span>功能名称：</span>
      <el-input v-model="input" placeholder="请输入" class="mechan_header_input" />
      <el-button type="primary" @click="sousoFn">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </div>
    <div class="mechan_btn">
      <el-button type="primary" @click="addNew">新建</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DepartmHeader',
  data() {
    return {
      input: ''
    }
  },
  methods: {
    sousoFn() {
      this.$emit('search', this.input)
    },
    reset() {
      this.$emit('reset')
    },
    addNew() {
      this.$emit('addNew')
    }
  }
}
</script>
<style scoped>
.mechan_header{
    height: 82px;
    line-height: 82px;
    padding: 0 60px 0 30px;
}
.mechan_header_input{
    width: 175px;
}
.mechan_btn{
    padding: 0 30px;
}
</style>

