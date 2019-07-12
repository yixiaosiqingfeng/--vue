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

    <!--<div style="flex:1;">-->
    <!--<span>筛选:</span>-->

    <!--<el-dropdown :hide-on-click="false" style="margin-left:20px ">-->
    <!--<span class="el-dropdown-link">-->
    <!--全部-->
    <!--<i class="el-icon-arrow-down el-icon&#45;&#45;right" />-->
    <!--</span>-->
    <!--<el-dropdown-menu slot="dropdown">-->
    <!--<el-dropdown-item>黄金糕</el-dropdown-item>-->
    <!--<el-dropdown-item>狮子头</el-dropdown-item>-->
    <!--<el-dropdown-item>螺蛳粉</el-dropdown-item>-->
    <!--<el-dropdown-item disabled>双皮奶</el-dropdown-item>-->
    <!--<el-dropdown-item divided>蚵仔煎</el-dropdown-item>-->
    <!--</el-dropdown-menu>-->
    <!--</el-dropdown>-->

    <!--<el-dropdown :hide-on-click="false" style="margin-left:20px ">-->
    <!--<span class="el-dropdown-link">-->
    <!--排序方式-->
    <!--<i class="el-icon-arrow-down el-icon&#45;&#45;right" />-->
    <!--</span>-->
    <!--<el-dropdown-menu slot="dropdown">-->
    <!--<el-dropdown-item>按最新</el-dropdown-item>-->
    <!--<el-dropdown-item>按倒序</el-dropdown-item>-->
    <!--<el-dropdown-item>按话题数</el-dropdown-item>-->
    <!--</el-dropdown-menu>-->
    <!--</el-dropdown>-->
    <!--</div>-->
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
      this.$emit('searchFn')
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

