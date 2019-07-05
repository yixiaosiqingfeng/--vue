<template>
  <div>
    <div>
      <div style="margin:15px;">
        <el-button size="mini" type="success" @click="addMenuOne">新增</el-button>
        <el-button size="mini" type="success" @click="expandAll(1)">展开</el-button>
        <el-button size="mini" type="success" @click="expandAll(2)">收缩</el-button>
      </div>

      <el-table ref="table" :data="tableData" style="width: 100%" row-key="id" border>
        <el-table-column prop="name" label="菜单名" width="220" />
        <el-table-column prop="code" label="授权码" width="180" />
        <el-table-column prop="indexOrder" label="排序" width="180" />
        <el-table-column prop="note" label="备注" width="300" />
        <el-table-column prop="remark" label="操作" width="300">
          <template slot-scope="scope">
            <div>
              <el-button size="medium" type="text" @click="editFn(scope.row)">编辑</el-button>
              <el-button size="medium" type="text" @click="deleteFn(scope.row)">删除</el-button>
              <el-button
                v-if="scope.row.parentId==='0'"
                size="medium"
                type="text"
                @click="twoDialog(scope.row)"
              >新增</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--新增菜单-->
    <el-dialog title="新增菜单" :visible.sync="dialogVisible1" width="50%">
      <div>
        <el-form
          ref="ruleForm1"
          :model="formData"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <div style="display:flex;flex-wrap:wrap;">
            <!-- <div style="width:50%;">
              <el-form-item label="路径" prop="path">
                <el-input v-model="formData.path" size="mini"/>
              </el-form-item>
            </div>-->

            <!-- <div style="width:35%;">
              <el-form-item label="菜单路径" prop="url">
                <el-input v-model="formData.url" size="mini"/>
              </el-form-item>
            </div>-->
            <div style="width:33.3%;">
              <el-form-item label="菜单名" prop="name">
                <el-input v-model="formData.name" size="mini" />
              </el-form-item>
            </div>

            <div style="width:33.3%;">
              <el-form-item label="授权码" prop="code">
                <el-input v-model="formData.code" size="mini" />
              </el-form-item>
            </div>

            <div style="width:33.3%;">
              <el-form-item label="排序字段" prop="indexOrder">
                <!-- <el-select v-model="formData.indexOrder"  placeholder="请选择排序">
                  <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>-->
                <el-input
                  v-model="formData.indexOrder"
                  type="number"
                  min="0"
                  placeholder="请输入排序数字"
                  size="mini"
                />
              </el-form-item>
            </div>

            <div style="width:100%;">
              <el-form-item label="备注" prop="note">
                <el-input v-model="formData.note" type="textarea" size="mini" />
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible1 = false">取 消</el-button>
        <el-button size="mini" @click="resetForm('ruleForm1')">重 置</el-button>
        <el-button size="mini" type="primary" @click="addMenu('ruleForm1')">确 定</el-button>
      </div>
    </el-dialog>

    <!--新增子菜单1-->
    <el-dialog title="新增子菜单" :visible.sync="dialogVisible2" width="50%">
      <div>
        <el-form
          ref="ruleForm2"
          :model="formData2"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <div style="display:flex;flex-wrap:wrap;">
            <div style="width:33.3%;">
              <el-form-item label="菜单名" prop="name">
                <el-input v-model="formData2.name" size="mini" />
              </el-form-item>
            </div>

            <div style="width:33.3%;">
              <el-form-item label="授权码" prop="code">
                <el-input v-model="formData2.code" size="mini" />
              </el-form-item>
            </div>

            <div style="width:33.3%;">
              <el-form-item label="排序字段" prop="indexOrder">
                <!-- <el-select v-model="formData2.indexOrder" placeholder="请选择排序">
                  <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>-->
                <el-input
                  v-model="formData2.indexOrder"
                  type="number"
                  min="0"
                  placeholder="请输入排序数字"
                  size="mini"
                />
              </el-form-item>
            </div>

            <div style="width:100%;">
              <el-form-item label="备注" prop="note">
                <el-input v-model="formData2.note" type="textarea" size="mini" />
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible2 = false">取 消</el-button>
        <el-button size="mini" @click="resetForm('ruleForm2')">重 置</el-button>
        <el-button size="mini" type="primary" @click="addMenu('ruleForm2','1')">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改菜单-->
    <el-dialog title="修改菜单" :visible.sync="dialogVisible3" width="50%">
      <div>
        <el-form
          ref="ruleForm3"
          :model="formData3"
          :rules="rules2"
          label-width="100px"
          class="demo-ruleForm"
        >
          <div style="display:flex;flex-wrap:wrap;">
            <div style="width:33.3%;">
              <el-form-item label="菜单名" prop="name">
                <el-input v-model="formData3.name" size="mini" />
              </el-form-item>
            </div>

            <div style="width:33.3%;">
              <el-form-item label="授权码" prop="code">
                <el-input v-model="formData3.code" size="mini" />
              </el-form-item>
            </div>

            <div style="width:33.3%;">
              <el-form-item label="排序字段" prop="indexOrder">
                <!-- <el-select v-model="formData3.indexOrder" value-key="label"   placeholder="请选择">
                  <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>-->
                <el-input v-model="formData3.indexOrder" placeholder="请输入排序数字" size="mini" />
              </el-form-item>
            </div>

            <!-- <div style="width:50%;">
              <el-form-item label="菜单标识" prop="id">
                <el-input v-model="formData3.id" size="mini"/>
              </el-form-item>
            </div>-->

            <div style="width:100%;">
              <el-form-item label="备注" prop="note">
                <el-input v-model="formData3.note" type="textarea" size="mini" />
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible3 = false">取 消</el-button>
        <!-- <el-button size="mini" @click="resetForm('ruleForm3')">重 置</el-button> -->
        <el-button size="mini" type="primary" @click="modifyMenu('ruleForm3')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getAllPrivilege,
  createMenu,
  deleteMenu,
  updateMenu
} from '@/api/rights'

export default {
  data() {
    return {
      tableData: [],
      //  新增弹框数据
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,

      // 新增菜单数据
      formData: {
        // parentId: "0", // String,父级id(默认为0)",
        // path: "", // String,路径",
        note: '', // String,备注（选填）",
        // url: "", // "String,菜单路径",
        name: '', // "String系统名",
        indexOrder: '', // "int,排序字段（选填）"
        code: '' // String,授权码
      },
      // 新增子菜单数据
      formData2: {
        parentId: '', // String,父级id(默认为0)",
        // path: "", // String,路径",
        note: '', // String,备注（选填）",
        // url: "", // "String,菜单路径",
        name: '', // "String系统名",
        indexOrder: '', // "int,排序字段（选填）"
        code: '' // String,授权码
      },
      // 修改菜单数据
      formData3: {
        note: '', // String,备注
        name: '', // String系统名
        indexOrder: '', // int,排序字段
        code: '', // String,授权码
        id: '' // String,菜单标识（必填）
      },

      rules: {
        name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入菜单授权码', trigger: 'blur' }]
      },
      rules2: {
        name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入菜单授权码', trigger: 'blur' }]
      },
      formIndex: '',
      // 存储被修改对象的ID
      id: ''
    }
  },
  mounted() {
    const b = {
      code: '2254',
      data: {}
      // page: 1,
      // limit: 15
    }
    getAllPrivilege(b).then(res => {
      if (res.errorCode === 0 && res.success === true) {
        // console.log(res, 11111);
        this.tableData = res.data
        setTimeout(() => {
          this.expandAll()
        }, 100)
      } else {
        this.$message.error('获取失败' + res.msg)
      }
    })
  },
  methods: {
    // 获取菜单列表
    menuListFn() {
      const b = {
        code: '2254',
        data: {}
        // page: 1,
        // limit: 15
      }
      getAllPrivilege(b).then(res => {
        if (res.errorCode === 0 && res.success === true) {
          // console.log(res, 11111);
          this.tableData = res.data
          // setTimeout(() => {
          //   this.expandAll();
          // }, 100);
        } else {
          this.$message.error('获取失败' + res.msg)
        }
      })
    },
    twoDialog(obj) {
      this.formIndex = 'ruleForm2'
      // this.formData.parentId = obj.id;
      this.formData2.parentId = obj.id
      this.dialogVisible2 = true
    },
    // 点击创建新菜单确认按钮
    addMenu(formName, su) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var obj = null
          if (su) {
            obj = {
              code: 2251,
              data: this.formData2
            }
          } else {
            obj = {
              code: 2251,
              data: this.formData
            }
          }
          this.$confirm('确定创建吗', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              createMenu(obj).then(res => {
                if (res.errorCode === 0 && res.success === true) {
                  this.dialogVisible1 = false
                  this.dialogVisible2 = false
                  this.dialogVisible3 = false
                  this.menuListFn()
                  setTimeout(() => {
                    this.resetForm(this.formIndex)
                  }, 500)
                  this.$message({
                    type: 'success',
                    message: '创建成功!'
                  })
                } else {
                  this.$message.error('创建失败' + res.msg)
                }
              })
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              })
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 删除菜单
    deleteFn(obj) {
      this.$confirm('确定删除吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // console.log(1111);
          const data = {
            code: 2253,
            data: {
              id: obj.id,
              parentId: obj.parentId
            }
          }
          // console.log(2222);
          deleteMenu(data).then(res => {
            if (res.errorCode === 0 && res.success === true) {
              // console.log(3333);
              this.menuListFn()
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
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
    addMenuOne() {
      this.formIndex = 'ruleForm1'
      // this.formData.parentId = "0";
      this.dialogVisible1 = true
    },
    // 点击修改菜单数据回显
    editFn(data) {
      // console.log(data, "我是编辑按钮得到的信息");
      this.formIndex = 'ruleForm3'
      this.formData3.id = data.id
      const o = this.formData3
      for (const a in o) {
        o[a] = data[a]
      }
      // console.log(o)
      this.dialogVisible3 = true
    },
    // 修改菜单确认按钮
    modifyMenu(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const obj = {
            code: 2252,
            data: this.formData3
          }
          this.$confirm('确定修改吗', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              updateMenu(obj).then(res => {
                if (res.errorCode === 0 && res.success === true) {
                  this.dialogVisible3 = false
                  this.menuListFn()
                  setTimeout(() => {
                    this.resetForm(this.formIndex)
                  }, 500)
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
                message: '已取消'
              })
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    expandAll(flag) {
      const table = this.$refs.table.$el
      const els = table.getElementsByClassName('el-table__expand-icon')
      const str = 'el-table__expand-icon--expanded'
      for (let i = 0; i < els.length; i++) {
        if (flag === 1) {
          if (els[i].className.indexOf(str) === -1) {
            els[i].click()
          }
        } else if (flag === 2) {
          if (els[i].className.indexOf(str) !== -1) {
            els[i].click()
          }
        } else {
          els[i].click()
        }
      }
    }
  }
}
</script>
