<template>
  <div class="sta_header">
    <div>
      <span style="width:100px;">所属机构：</span>
      <div>
        <el-input v-model="searchData.orgName" size="mini" placeholder="请输入" @change="rmspace" />
      </div>
    </div>
    <div>
      <span style="width:100px;">员工编号：</span>
      <div>
        <el-input v-model="searchData.code" size="mini" placeholder="请输入" @change="rmspace" />
      </div>
    </div>
    <div>
      <span style="width:100px;">员工姓名：</span>
      <div>
        <el-input v-model="searchData.realName" size="mini" placeholder="请输入" @change="rmspace" />
      </div>
    </div>
    <div>
      <span style="width:100px;">创建时间：</span>
      <div>
        <el-date-picker
          v-model="searchData.createDate"
          size="mini"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
        />
      </div>
    </div>
    <div>
      <el-button size="mini" type="primary" @click="searchFn">搜 索</el-button>
      <el-button size="mini" type="info" @click="resetFn">重 置</el-button>
    </div>
  </div>
</template>
<script>
import { strTrim } from '../../../../utils/trim'

export default {
  name: 'StaHeader',
  data() {
    return {
      searchData: {
        realName: '', // 员工姓名
        code: '', // 员工编号
        orgName: '', // 部门id
        createDate: '' // 创建时间,要求数据格式为data
      }
    }
  },
  methods: {
    searchFn() {
      this.$emit('search', this.searchData, this.searchData1)
    },
    resetFn() {
      this.$emit('resettop')
      for (const a in this.searchData) {
        this.searchData[a] = ''
      }
    },
    rmspace() {
      this.searchData.orgName = strTrim(this.searchData.orgName)
      this.searchData.realName = strTrim(this.searchData.realName)
      this.searchData.code = strTrim(this.searchData.code)
    }
  }
}
</script>
<style scoped>
.sta_header {
  display: flex;
  margin: 20px;
}

.sta_header > div {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.sta_header span {
  width: 70px;
}
</style>

