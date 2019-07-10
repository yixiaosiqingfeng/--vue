<template>
  <div style="position: relative;">
    <!-- 头部搜索部分 -->
    <ficaHeader />
    <!-- 当前已筛选出来的数据统计 -->
    <div>
      <p>共找到22条数据</p>
    </div>

    <!-- 分类列表表格显示 -->
    <div id="app">
      <el-row>
        <el-col>
          <div class="el-table-add-row" style="width: 100%;" @click="addMasterUser()">
            <span>+ 添加</span>
          </div>
        </el-col>
        <el-col>
          <el-table
            size="mini"
            :data="master_user.data"
            border
            style="width: 100%"
            highlight-current-row
          >
            <el-table-column type="index" />

            <el-table-column
              v-for="(v,i) in master_user.columns"
              :key="i"
              :prop="v.field"
              :label="v.title"
              :width="v.width"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.isSet">

                  <!-- <el-upload
                      class="upload-demo"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      multiple
                    > -->

                  <!-- <img
                        v-if="master_user.data[scope.$index].img"
                        :src="master_user.data[scope.index].img"
                        class="avatar avatar-uploader-icon"
                        @click="handleEdit(scope.$index,scope.row)"
                      /> -->

                  <!-- <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload> -->

                  <el-input v-model="master_user.sel[v.field]" size="mini" placeholder="请输入内容" />

                </span>
                <span v-else>{{ scope.row[v.field] }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <span
                  class="el-tag el-tag--info el-tag--mini"
                  style="cursor: pointer;"
                  @click="operatingFun(scope.row,scope.$index,true)"
                >{{ scope.row.isSet?'保存':"修改" }}</span>
                <span
                  v-if="!scope.row.isSet"
                  class="el-tag el-tag--danger el-tag--mini"
                  style="cursor: pointer;"
                  @click="delfica(scope.row)"
                >删除</span>
                <span
                  v-else
                  class="el-tag el-tag--mini"
                  style="cursor: pointer;"
                  @click="operatingFun(scope.row,scope.$index,false)"
                >取消</span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import ficaHeader from './compontents/fica_header'
import {
  addCategory,
  categoryList,
  delCategory,
  updateCategory
} from '@/api/fica'
export default {
  components: { ficaHeader },

  data() {
    // id生成工具 这个不用看 示例而已 模拟后台返回的id
    // var generateId = {
    //   _count: 1,
    //   get() {
    //     return +new Date() + "_" + this._count++;
    //   }
    // };
    return {
      master_user: {
        sel: null, // 选中行
        columns: [
          { field: 'imgPath', title: '分类图片', width: 120 },
          { field: 'name', title: '分类名称', width: 120 },
          { field: 'topicCount', title: '话题数', width: 120 },
          { field: 'createrId', title: '创建人', width: 120 },
          { field: 'createDate', title: '创建时间', width: 120 },
          { field: 'note', title: '备注' }
        ],
        data: []

      }
    }
  },
  mounted() {
    this.getficaList() // 初始化获取分类管理列表
  },
  methods: {

    // 表格数据获取列表
    getficaList() {
      const b = {
        code: 2286,
        data: {},
        page: 1,
        limit: 15
      }
      categoryList(b).then(res => {
        if (res.errorCode === 0 && res.success === true) {
          // console.log(res.data);
          const list = res.data
          this.master_user.data = list
        } else {
          this.$message.error('获取失败' + res.msg)
        }
      })
    },
    // 读取表格数据
    readMasterUser() {
      // 根据实际情况，自己改下啊
      this.master_user.data.map(i => {
        // i.id = generateId.get(); //模拟后台插入成功后有了id
        i.isSet = false // 给后台返回数据添加`isSet`标识
        return i
      })
    },
    // 添加分类
    addMasterUser() {
      for (const i of this.master_user.data) {
        if (i.isSet) return this.$message.warning('请先保存当前编辑项')
      }

      const j = {
        id: 0,
        topicCategoryPath: '',
        name: '',
        topicCount: '',
        createrId: '',
        createDate: '',
        note: '',
        isSet: true,
        _temporary: true
      }

      this.master_user.data.unshift(j)
      this.master_user.sel = JSON.parse(JSON.stringify(j))

      // this.isVisible =true;
    },
    // 修改
    operatingFun(row, index, cg) {
      // 点击修改 判断是否已经保存所有操作
      for (const i of this.master_user.data) {
        if (i.isSet && i.id !== row.id) {
          this.$message.warning('请先保存当前编辑项')
          return false
        }
      }
      // 是否是取消操作
      if (!cg) {
        if (!this.master_user.sel.id) this.master_user.data.splice(index, 1)
        return (row.isSet = !row.isSet)
      }
      // 新增提交数据
      if (row.isSet) {
        // 项目是模拟请求操作  自己修改下
        // (function() {
        //   let data = JSON.parse(JSON.stringify(this.master_user.sel));
        //   for (let k in data) row[k] = data[k];
        //   app.$message({
        //     type: "success",
        //     message: "保存成功!"
        //   });
        //   //然后这边重新读取表格数据
        //   app.readMasterUser();
        //   row.isSet = false;
        // })();
        //  console.log(row.id)
        //  console.log(666)
        const data1 = JSON.parse(JSON.stringify(this.master_user.sel))
        // for (let k in data) row[k] = data[k];
        const obj = {
          data: data1,
          code: 2289
        }
        addCategory(obj).then(res => {
          if (res.errorCode === 0 && res.success === true) {
            // this.flag = !this.flag
            // this.dialogVisible = false
            // console.log(res.data);
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
            // this.resetForm('ruleForm')
            // 然后这边重新读取表格数据
            this.getficaList()
            row.isSet = false
          } else {
            this.$message.error('修改失败' + res.msg)
          }
        })
      } else {
        this.master_user.sel = JSON.parse(JSON.stringify(row))
        row.isSet = true
      }

      // 修改提交数据
      if (row.id && row.id.length > 0) {
        // console.log(row.id)
        if (row.isSet === '保存') {
          const data2 = JSON.parse(JSON.stringify(this.master_user.sel))
          const obj = {
            data: data2,
            code: 2288
          }
          updateCategory(obj).then(res => {
            if (res.errorCode === 0 && res.success === true) {
              // this.flag = !this.flag
              // this.dialogVisible = false
              // console.log(res.data);
              this.$message({
                type: 'success',
                message: '创建成功!'
              })
              // this.resetForm('ruleForm')
              // 然后这边重新读取表格数据
              this.getficaList()
              row.isSet = false
            } else {
              this.$message.error('创建失败' + res.msg)
            }
          })
        }
      }
    },
    // 删除
    delfica(obj) {
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          const data1 = {
            code: 2287,
            data: {
              id: obj.id
            }
          }
          delCategory(data1).then(res => {
            if (res.errorCode === 0 && res.success === true) {
              // console.log(666)
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.flag = !this.flag
            } else {
              this.$message.error('删除失败' + res.msg)
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

  <style scoped>
  .el-table-add-row {
    margin-top: 10px;
    width: 100%;
    height: 34px;
    border: 1px dashed #c1c1cd;
    border-radius: 3px;
    cursor: pointer;
    justify-content: center;
    display: flex;
    line-height: 34px;
  }

  .tb {
    border-collapse: collapse;
    width: 100%;
    border: 1px solid #dfe6ec;
    background: #fff;
    position: absolute;
    top: 129px;
    left: 0;
  }

  .tb td,
  .tb th {
    padding: 5px;
    text-align: center;
    border: 1px solid #dfe6ec !important;
  }
  </style>
