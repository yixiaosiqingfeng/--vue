<template>
  <div>
    <!-- 头部搜索部分 -->
    <search @search="search" @reset="reset" />
    <!-- 表格展示部分 -->
    <tableAss :table-config="tableConfig" :path="path" :query-data="queryData" :target="flag">
      <template slot="footer" slot-scope="scope">
        <div style="display:flex;">
          <el-button size="medium" type="text" @click="funconfig(scope.row)">功能配置</el-button>
          <el-button size="medium" type="text" @click="MenuConfig(scope.row)">菜单配置</el-button>
          <el-button size="medium" type="text" @click="modifyrole(scope.row)">修改</el-button>
          <el-button size="medium" type="text" @click="delrole(scope.row)">删除</el-button>
        </div>
      </template>
      <template slot="header">
        <div style="margin-left:20px;">
          <el-button size="mini" type="success" @click="dialogVisible=true">创建角色</el-button>
          <!-- <el-button size="mini" type="danger" @click="deleteRoleAll(scope.scope.scope)">选中删除</el-button> -->
        </div>
      </template>
    </tableAss>

    <!-- 创建角色弹框 -->
    <el-dialog title="创建角色" :visible.sync="dialogVisible" center width="50%">
      <!-- 弹框选项-->
      <div>
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <div style="display:flex;flex-wrap:wrap;">
            <div style="width:50%;">
              <el-form-item label="角色名称" prop="name">
                <el-input v-model="ruleForm.name" size="mini" />
              </el-form-item>
            </div>
            <!--
            <div style="width:50%;">
              <el-form-item label="创建者编号" prop="createId">
                <el-input v-model="ruleForm.createId" size="mini" />
              </el-form-item>
            </div>-->

            <div style="width:50%;">
              <el-form-item label="备注信息" prop="note">
                <el-input v-model="ruleForm.note" autosize type="textarea" placeholder="请输入备注信息" />
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" @click="resetForm('ruleForm')">重置</el-button>
        <el-button size="mini" type="primary" @click="addroleList('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改角色弹框 -->
    <el-dialog title="修改角色" :visible.sync="dialogVisible1" center width="50%">
      <!-- 弹框选项-->
      <div>
        <el-form
          ref="modForm"
          :model="modForm"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <div style="display:flex;flex-wrap:wrap;">
            <div style="width:50%;">
              <el-form-item label="角色名称" prop="name">
                <el-input v-model="modForm.name" size="mini" />
              </el-form-item>
            </div>

            <!-- <div style="width:50%;">
              <el-form-item label="创建者编号" prop="createId">
                <el-input v-model="modForm.createId" size="mini" />
              </el-form-item>
            </div>-->

            <div style="width:100%;">
              <el-form-item label="备注信息" prop="note">
                <el-input v-model="modForm.note" autosize type="textarea" placeholder="请输入备注信息" />
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible1 = false">取 消</el-button>
        <el-button size="mini" @click="resetForm('modForm')">重置</el-button>
        <el-button size="mini" type="primary" @click="modifyForm('modForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 功能配置 element-ui穿梭框 -->
    <el-dialog title="功能配置" :visible.sync="dialogVisible2" center width="30%">
      <div>
        <juris
          :left-data="arr5"
          :right-data="arr6"
          @getData="getData2"
        />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="submitfun()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 菜单配置 穿梭框 -->
    <el-dialog title="菜单配置" :visible.sync="dialogVisible3" width="30%">
      <div>
        <!-- <input type="text" v-model="searchId" placeholder="搜索"> -->
        <transfer
          :dialog-visible="dialogVisible3"
          :left-data="arr3"
          :right-data="arr4"
          @getData="getData"
        />
        <!-- @searchFn="searchleftFn" -->
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="submitroleMenu()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import tableAss from '@/components/tableAss'
// import tableAss from '@/components/tableAss/components/tableAss'
import search from '../components/roleList_header'
import transfer from '../components/selectData'
import juris from '../components/juris'
import {
  addRole,
  updateRole,
  deleteRole,
  getPrivilege,
  roleMenu,
  selectMenu,
  menuFunc
} from '@/api/role'
export default {
  components: {
    tableAss,
    search,
    transfer,
    juris
  },
  data() {
    return {
      // 表格的配置参数
      tableConfig: [
        // {
        //   width: 55,
        //   type: 'selection'
        // },
        {
          label: '序号',
          width: 55,
          type: 'index'
        },
        {
          width: 180,
          label: '角色名称',
          prop: 'name'
          // popup: true,
          // character: null //字符转义函数
        },
        // {
        //   width: 180,
        //   label: '创建者id',
        //   prop: 'id'
        //   // popup: true,
        //   // character: null //字符转义函数
        // },
        {
          width: 180,
          label: '创建时间',
          prop: 'createDate'
          // popup: true,
          // character: null //字符转义函数
        },
        {
          width: 400,
          label: '备注',
          prop: 'note'
        },
        {
          // width: 180,
          label: '操作',
          prop: 'name',
          type: 'btn'
        }
      ],
      // path: '/comm/role/list', // 列表请求的路径
      path: '/admin_auth/select_role_v1', // 列表请求的路径
      dialogVisible: false, // 创建角色弹框的控制开关
      dialogVisible1: false, // 修改角色弹框的控制开关

      dialogVisible2: false, // 修改功能配置穿梭框的控制开关
      // 配置穿梭框的数据 功能配置
      roleId2: '', // "String,角色id",
      funcIdList: [], // 功能id数组

      dialogVisible3: false, // 修改菜单配置穿梭框的控制开关
      // 配置穿梭框的数据 菜单配置
      arr3: [],
      arr4: [],
      arr5: [],
      arr6: [],
      roleId: '', // "String,角色id",
      menuIdList: [], // 菜单id数组
      // 分页列表请求参数
      queryData: {
        data: {},
        limit: 10,
        page: 1,
        code: '2071'
      },
      // 更新数据改变他的值就可以了
      flag: false,
      // 创建角色弹框数据
      ruleForm: {
        name: '', // String,角色名称（必填）
        note: '' // String,备注（选填）
        // createId: '' // String,创建者id(必填)
      },
      // 修改角色弹框数据
      modForm: {
        id: '', // string 角色编号（必填）
        name: '', // string 角色名（必填）
        note: '' // string 备注（选填）
      },
      // 表单的验证规则
      rules: {
        name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
        // createId: [
        //   { required: true, message: '请输入创建者id', trigger: 'blur' }
        // ]
      }
    }
  },
  // 计算属性实现搜索
  // computed: {
  //  newlist(){
  //     // console.log(this.searchId);
  //     // console.log(this.arr3);
  //     return this.arr3.filter(value => value.label.indexOf(this.searchId) !== -1);
  //   }
  // },
  methods: {
    // 点击确认按钮后创建角色
    addroleList(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm('确定创建该角色?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              const data = {
                data: this.ruleForm,
                code: '2070'
              }
              addRole(data).then(res => {
                if (res.errorCode === 0 && res.success === true) {
                  this.flag = !this.flag
                  this.dialogVisible = false
                  this.$message({
                    type: 'success',
                    message: '创建成功!'
                  })
                  this.resetForm('ruleForm')
                } else {
                  this.$message.error('创建失败' + res.msg)
                }
              })
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消创建'
              })
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    // 删除角色
    delrole(obj) {
      console.log(obj.id)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          const data = {
            code: 2077,
            data: {
              id: obj.id
            }
          }
          deleteRole(data).then(res => {
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
    },
    // 批量删除
    // deleteRoleAll(arr) {},
    // 点击修改按钮数据回显
    modifyrole(obj) {
      this.dialogVisible1 = true
      // console.log(obj);
      // 对象进行拷贝，通过for in 循环获取基本类型，赋值每一个基本类型
      for (const key in this.modForm) {
        this.modForm[key] = obj[key]
      }
    },
    // 点击修改弹框确认按钮修改数据
    modifyForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm('确定修改该角色?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              // const data = this.modForm;
              const obj = {
                code: 2076,
                data: this.modForm
              }
              updateRole(obj).then(res => {
                if (res.errorCode === 0 && res.success === true) {
                  this.flag = !this.flag
                  this.dialogVisible1 = false
                  this.$message({
                    type: 'success',
                    message: '修改成功!'
                  })
                } else {
                  this.$message.error('修改失败' + res.msg)
                }
              })
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消修改'
              })
            })
        } else {
          console.log('修改失败!!')
          return false
        }
      })
    },

    // 点击功能配置按钮显示功能配置穿梭框
    funconfig(row) {
      // console.log(666);
      this.dialogVisible2 = true
      this.roleId2 = row.id
      const id1 = row.id
      const obj2 = {
        //  data: {},
        code: 2277,
        data: { id: id1 }
      }
      selectMenu(obj2)
        .then(res => {
        // if (res.errorCode === 0 && res.success === true){
        //  console.log(res.data);
        //   //this.data2 = res.data.menuFuncList;
        //   this.arr5 = res.data.menuFuncList;
        //   this.arr6 = res.data.notMenuFuncList;
        // }

          if (res.errorCode === 0 && res.success === true) {
            const menuFuncList = res.data.menuFuncList
            menuFuncList.forEach((item, index, menuFuncList) => {
              item.select = false
              if (item.children && item.children.length > 0) {
                item.children.forEach(item1 => {
                  item1.select = false
                })
              }
            })

            const notMenuFuncList = res.data.notMenuFuncList
            notMenuFuncList.forEach((item, index, notMenuFuncList) => {
              item.select = false
              if (item.children && item.children.length > 0) {
                item.children.forEach(item1 => {
                  item1.select = false
                })
              }
            })
            // console.log("查询角色已有菜单:",menuList)
            // console.log("查询角色未拥有菜单:",notMenuList)
            this.arr5 = menuFuncList // 获取值赋给配置穿梭框的授权数据
            this.arr6 = notMenuFuncList
          } else {
            this.$message.error('查询失败' + res.msg)
          }
        })
        .catch(err => {
          if (err) {
            console.log(err)
          }
        })
    },
    // 点击功能菜单确认按钮
    submitfun() {
      const roleId = this.roleId2
      const funcIdList2 = this.funcIdList
      const obj = {
        data: {
          roleId: roleId,
          funcIdList: funcIdList2
        },
        code: 2276
      }
      // console.log(obj)
      this.$confirm('确定修改该功能配置?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          menuFunc(obj).then(res => {
            if (res.errorCode === 0 && res.success === true) {
              this.dialogVisible2 = false
              this.flag = !this.flag
              this.$message({
                type: 'success',
                message: '修改成功!'
              })
            } else {
              this.$message.error('修改失败' + res.msg)
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          })
        })
    },
    // 点击菜单配置按钮显示菜单配置穿梭框
    MenuConfig(row) {
      this.dialogVisible3 = true
      this.roleId = row.id
      const id = row.id
      // console.log(id)
      const obj2 = {
        //  data: {},
        code: '2025',
        data: { id: id }
      }
      getPrivilege(obj2)
        .then(res => {
          // console.log("查询角色已有菜单:",res.data.menuList)
          // console.log("查询角色未拥有菜单:",res.data.notMenuList)
          if (res.errorCode === 0 && res.success === true) {
            const menuList = res.data.menuList
            menuList.forEach((item, index, menuList) => {
              item.select = false
              if (item.children && item.children.length > 0) {
                item.children.forEach(item1 => {
                  item1.select = false
                })
              }
            })

            const notMenuList = res.data.notMenuList
            notMenuList.forEach((item, index, notMenuList) => {
              item.select = false
              if (item.children && item.children.length > 0) {
                item.children.forEach(item1 => {
                  item1.select = false
                })
              }
            })
            // console.log("查询角色已有菜单:",menuList)
            // console.log("查询角色未拥有菜单:",notMenuList)
            this.arr4 = menuList // 获取值赋给配置穿梭框的授权数据
            this.arr3 = notMenuList
          } else {
            this.$message.error('查询失败' + res.msg)
          }
        })
        .catch(err => {
          if (err) {
            console.log(err)
          }
        })
    },
    // 点击菜单配置确认按钮
    submitroleMenu() {
      const roleId = this.roleId
      const menuIdList = this.menuIdList
      //  console.log(roleId)
      const obj = {
        data: {
          roleId: roleId,
          menuIdList: menuIdList
        },
        code: 2072
      }
      // console.log(obj)
      this.$confirm('确定修改该菜单配置?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          roleMenu(obj).then(res => {
            if (res.errorCode === 0 && res.success === true) {
              this.dialogVisible3 = false
              this.flag = !this.flag
              this.$message({
                type: 'success',
                message: '修改成功!'
              })
            } else {
              this.$message.error('修改失败' + res.msg)
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          })
        })
    },
    search(obj) {
      if (!obj.name) {
        this.$message.error('请输入要搜索的内容')
        return
      }
      this.queryData.data = obj
      this.flag = !this.flag
    },
    // 表单重置清空
    resetForm(formName) {
      // console.log(formName)
      this.$refs[formName].resetFields()
    },
    // 重置功能
    reset() {
      this.queryData = {
        code: 2071,
        data: {},
        limit: 10,
        page: 1
      }
      this.flag = !this.flag
    },
    // 获取menuIdList菜单id数组
    getData(left, right) {
      // console.log(left, right, 777);
      // console.log(right)
      const arrValue = []
      right.forEach((item, index, right) => {
        // for (var i in item) {

        for (var j in item.children) {
          arrValue.push(item.children[j].id)
        }
        arrValue.push(item.id)
        return arrValue

        // }
      })
      // console.log(arrValue)
      this.menuIdList = arrValue

      // let array = left
      // this.Array = left;
      // console.log(array);
    },
    // 获取funcIdList功能id数组
    getData2(right, left) {
      const arrValue2 = []
      // console.log(right)
      // console.log(left)
      right.forEach((item, index, right) => {
        arrValue2.push(item.id)
        return arrValue2
      })
      this.funcIdList = arrValue2
    }

  }
}
</script>
<style scoped>
.el-transfer-panel {
  /* width: 200px; */
  width: 41%;
  height: 500px;
  overflow: auto;
}
.el-transfer__buttons {
  width: 18%;
}
.el-transfer-panel__list.is-filterable {
  height: 400px;
}
</style>

