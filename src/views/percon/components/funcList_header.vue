<template>
  <div class="fun_header">
    <div>
      <span>菜单名称：</span>
      <div class="menuname">
        <el-cascader v-model="menuIdList" size="mini" placeholder="请选择菜单名称" :options="options1" clearable />
      </div>
    </div>
    <div>
      <span>功能名称：</span>
      <div>
        <el-input v-model="searchData.name" size="mini" placeholder="请输入" @keyup.enter.native="searchFn" />
      </div>
    </div>
    <div>
      <el-button size="mini" type="primary" @click="searchFn">搜 索</el-button>
      <el-button size="mini" type="info" @click="resetFn">重 置</el-button>
    </div>
  </div>
</template>
<script>
import { getAllPrivilege } from '@/api/rights'
export default {
  name: 'FunclistHeader',
  data() {
    return {
      searchData: {
        name: '', // 功能名称
        // code: '' // 功能编码
        menuId: ''

      },
      // 菜单id数组
      menuIdList: [],
      // 菜单联动数据
      options1: []

    }
  },
  mounted() {
    this.getMenuList() // 初始化获取菜单名称列表
  },
  methods: {
    searchFn() {
      this.judgeMenu()
      this.$emit('search', this.searchData)
    },
    resetFn() {
      this.$emit('reset')
      for (const a in this.searchData) {
        this.searchData[a] = ''
      }
    },
    // 菜单下拉框获取菜单列表
    getMenuList() {
      const b = {
        code: 2254,
        data: {},
        page: 1,
        limit: 15
      }
      getAllPrivilege(b).then(res => {
        if (res.errorCode === 0 && res.success === true) {
          // console.log(res.data);
          const list = res.data
          const list1 = JSON.parse(
            JSON.stringify(list).replace(/name/g, 'label')
          )
          const list2 = JSON.parse(JSON.stringify(list1).replace(/id/g, 'value'))
          this.options1 = list2

          // list2.forEach((item, index, list2) => {
          //   if (item.children && item.children.length > 0) {//如果有二级菜单就选二级不选一级菜单
          //     item.children.forEach(item1 => {
          //       //  console.log( typeof item1)

          //       // this.options1 = item1;
          //       this.options1.push(item1)
          //       // console.log(this.options1)
          //     });
          //   }else{//如果没有二级菜单就选一级菜单
          //       this.options1.push(item)
          //   }
          // });
        } else {
          this.$message.error('获取失败' + res.msg)
        }
      })
    },
    // 对菜单列表传参处理
    judgeMenu() {
      if (this.menuIdList === undefined) {
        return
      } else {
        const num = this.menuIdList.length
        this.searchData.menuId = this.menuIdList[num - 1]
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
.el-cascader{
  width: 200px !important;
  height: 28px;
  line-height: 28px;
}
</style>

