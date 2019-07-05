<template>
  <div style="margin:20px 0;">
    <!--<el-row>-->
    <!--<el-col :span="">-->
    <div style="display:flex;align-items:center;padding:0 15px;">
      <div style="width:50px;"><span>搜索:</span></div>
      <div style="width:250px;">
        <el-input v-model="input" />
      </div>
      <div style="margin-left:10px;">
        <el-button type="primary" @click="sousoFn">搜索</el-button>
      </div>
      <div style="margin-left:10px;">
        <el-button type="info" @click="reset">重置</el-button>
      </div>
    </div>
    <!--</el-col>-->
    <!--</el-row>-->
  </div>
</template>

<script>
export default {
  name: 'Search',
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
    }
  }
}
</script>

<style scoped>

</style>
