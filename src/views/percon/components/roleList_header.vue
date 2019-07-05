<template>
  <div class="fun_header">
    <div>
      <span>角色名称：</span>
      <div>
        <el-input v-model="searchData.name" size="mini" placeholder="请输入" @keyup.enter.native="searchFn" />
      </div>
    </div>
    <!-- <div>
      <span>创建时间：</span>
      <div>
        <el-date-picker
          v-model="searchData.createDate"
          size="mini"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
        />
      </div>
    </div> -->
    <div>
      <el-button size="mini" type="primary" @click="searchFn">搜 索</el-button>
      <el-button size="mini" type="info" @click="resetFn">重 置</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FunclistHeader',
  data() {
    return {
      searchData: {
        name: '' // 角色名称
        // createDate: '' // 创建时间
      }
    }
  },
  methods: {
    searchFn() {
      this.$emit('search', this.searchData)
    },
    resetFn() {
      this.$emit('reset')
      for (const a in this.searchData) {
        this.searchData[a] = ''
      }
    }
  }
}
</script>
<style scoped>
  .fun_header {
    display: flex;
    margin: 20px;
  }

  .fun_header > div {
    display: flex;
    align-items: center;
    margin-right: 10px;
  }

  .fun_header span {
    width: 100px;
  }
</style>

