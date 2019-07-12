<template>
  <div class="fica_header mt10">
    <div style="width:200px;" class="ml5">
      <div class="el-input">
        <el-input v-model="value" size="mini" placeholder="请输入内容" class="input-with-select">
          <el-select slot="prepend" v-model="select1" placeholder="请选择">
            <el-option label="全部" value="1" />
            <el-option label="订单号" value="2" />
            <el-option label="用户电话" value="3" />
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="submit" />
        </el-input>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: '',
      select1: '全部'
    }
  },
  methods: {
    submit() {
      this.$emit('searchFn', this.value)
    }
  }
}
</script>
<style>
  .fica_header{
    display:flex;
    align-items: center;
  }
.el-select .el-input {
  width: 80px;
}
.input-with-select{
  width:350px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>

