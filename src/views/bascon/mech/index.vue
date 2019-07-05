<template>
  <div style="position:absolute;">
    <!-- 表格部分 -->
    <div style="margin:15px;">
      <el-button size="mini" type="success" @click="addMenuOne">新增</el-button>
      <el-button size="mini" type="success" @click="expandAll(1)">展开</el-button>
      <el-button size="mini" type="success" @click="expandAll(2)">收缩</el-button>
      <el-button size="mini" type="success" @click="reset">刷新</el-button>
    </div>
    <div class="table_h" style="width:100%;">
      <el-table ref="table" :data="tableData" style="width:100%;" row-key="id" border>
        <el-table-column prop="name" label="机构名称" width="220" />
        <el-table-column prop="address" label="地址" width="250" />
        <el-table-column prop="principal" label="负责人" width="120" />
        <el-table-column prop="contactTel" label="联系电话" width="150" />
        <el-table-column prop="note" label="备注" width="300" />
        <el-table-column prop="remark" label="操作">
          <template slot-scope="scope">
            <div>
              <el-button size="mini" type="text" @click="editFn(scope.row)">修改</el-button>
              <el-button size="mini" type="text" @click="deleteFn(scope.row)">删除</el-button>
              <el-button
                v-if="scope.row.parentId==='0'"
                size="mini"
                type="text"
                @click="twoDialog(scope.row)"
              >新增</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--新增机构弹框-->
    <el-dialog title="新增机构" :visible.sync="dialogVisible1" width="30%">
      <div>
        <el-form
          ref="ruleForm1"
          :model="formData1"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <div style="display:flex;flex-wrap:wrap;">
            <div style="width:50%;">
              <el-form-item label="机构名称：" prop="name">
                <el-input v-model="formData1.name" size="mini" />
              </el-form-item>
            </div>

            <div style="width:50%;">
              <el-form-item label="机构地址：" prop="address">
                <el-input v-model="formData1.address" size="mini" />
              </el-form-item>
            </div>

            <div style="width:50%;">
              <el-form-item label="负责人：" prop="principal">
                <el-input v-model="formData1.principal" size="mini" />
              </el-form-item>
            </div>

            <div style="width:50%;">
              <el-form-item label="联系方式：" prop="contactTel">
                <el-input v-model="formData1.contactTel" size="mini" />
              </el-form-item>
            </div>

            <div style="width:100%;">
              <el-form-item label="备注：" prop="note">
                <el-input v-model="formData1.note" type="textarea" size="mini" />
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible1 = false">取 消</el-button>
        <el-button size="mini" @click="resetForm('ruleForm1')">重 置</el-button>
        <el-button type="primary" size="mini" @click="submitForm('ruleForm1')">确 定</el-button>
      </div>
    </el-dialog>

    <!--增加部门-->
    <el-dialog title="新增部门" :visible.sync="dialogVisible2" width="30%">
      <div>
        <el-form
          ref="ruleForm2"
          :model="formData2"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <div style="display:flex;flex-wrap:wrap;">
            <div style="width:50%;">
              <el-form-item label="部门名称：" prop="name">
                <el-input v-model="formData2.name" size="mini" />
              </el-form-item>
            </div>
            <div style="width:50%;">
              <el-form-item label="负责人：" prop="principal">
                <el-input v-model="formData2.principal" size="mini" />
              </el-form-item>
            </div>

            <div style="width:50%;">
              <el-form-item label="住址：" prop="address">
                <el-input v-model="formData2.address" size="mini" />
              </el-form-item>
            </div>

            <div style="width:50%;">
              <el-form-item label="联系电话：" prop="contactTel">
                <el-input v-model="formData2.contactTel" size="mini" />
              </el-form-item>
            </div>

            <div style="width:100%;">
              <el-form-item label="备注：" prop="note">
                <el-input v-model="formData2.note" type="textarea" size="mini" />
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible2 = false">取 消</el-button>
        <el-button size="mini" @click="resetForm('ruleForm2')">重 置</el-button>
        <el-button type="primary" size="mini" @click="submitFormSon('ruleForm2')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改界面 -->
    <el-dialog title="修改" :visible.sync="dialogVisible3" width="30%">
      <div>
        <el-form
          ref="ruleForm3"
          :model="formData3"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <div style="display:flex;flex-wrap:wrap;">
            <div style="width:50%;">
              <el-form-item label="名称" prop="name">
                <el-input v-model="formData3.name" size="mini" />
              </el-form-item>
            </div>
            <div style="width:50%;">
              <el-form-item label="负责人" prop="principal">
                <el-input v-model="formData3.principal" size="mini" />
              </el-form-item>
            </div>

            <div style="width:50%;">
              <el-form-item label="地址" prop="address">
                <el-input v-model="formData3.address" size="mini" />
              </el-form-item>
            </div>

            <div style="width:50%;">
              <el-form-item label="电话" prop="contactTel">
                <el-input v-model="formData3.contactTel" size="mini" />
              </el-form-item>
            </div>

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
        <el-button type="primary" size="mini" @click="submitEdit('ruleForm3')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { isPhone } from '@/utils/validate'
import {
  getMechanlist,
  addMechan,
  removeMechan,
  upMechan
} from '@/api/mechanism'

export default {
  data() {
    const testPhone = function(rule, value, callback) {
      if (isPhone(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的手机号码'))
      }
    }
    return {
      tableData: [],
      //  新增弹框数据
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      formData1: {
        parentId: '0',
        note: '', // String,备注",
        createrId: '', // "String,创建人id",
        operaterId: '', // "String,最后修改人id",
        name: '', // "String名称",
        indexOrder: '', // "int,排序字段"
        code: '',
        address: '', // 地址
        principal: '', // 负责人
        contactTel: '' // 电话
      },
      formData2: {
        parentId: '',
        note: '', // String,备注",
        createrId: '', // "String,创建人id",
        operaterId: '', // "String,最后修改人id",
        name: '', // "String名称",
        indexOrder: '', // "int,排序字段"
        code: '',
        address: '', // 地址
        principal: '', // 负责人
        contactTel: '', // 电话
        id: ''
      },
      formData3: {
        parentId: '',
        note: '', // String,备注",
        createrId: '', // "String,创建人id",
        operaterId: '', // "String,最后修改人id",
        name: '', // "String名称",
        indexOrder: '', // "int,排序字段"
        code: '',
        address: '', // 地址
        principal: '', // 负责人
        contactTel: '', // 电话
        id: ''
      },
      rules: {
        name: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
        principal: [
          { required: true, message: '请输入负责人', trigger: 'blur' }
        ],
        contactTel: [{ required: true, trigger: 'blur', validator: testPhone }]
      },
      formIndex: ''
    }
  },
  mounted() {
    this.menuListFn()
  },
  methods: {
    // 刷新功能
    reset() {
      this.menuListFn()
    },
    // 获取机构列表
    menuListFn() {
      const b = {
        code: '2014',
        data: {},
        page: 1,
        limit: 999
      }
      getMechanlist(b).then(res => {
        if (res.success && res.errorCode === 0) {
          this.tableData = res.data
          setTimeout(() => {
            this.expandAll(1)
          }, 100)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    twoDialog(obj) {
      this.formIndex = 'ruleForm2'
      this.formData2.parentId = obj.id
      this.dialogVisible2 = true
    },
    // 创建新机构
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm('确定创建吗', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              const obj = {
                code: 2011,
                data: this.formData1,
                page: 1,
                limit: 1
              }
              addMechan(obj).then(res => {
                if (res.success && res.errorCode === 0) {
                  this.dialogVisible1 = false
                  this.menuListFn()
                  setTimeout(() => {
                    this.resetForm(this.formIndex)
                  }, 500)
                  this.$message({
                    type: 'success',
                    message: '创建成功!'
                  })
                } else {
                  this.$message.error(res.msg)
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
    // 创建部门
    submitFormSon(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const obj = {
            code: 2011,
            data: this.formData2,
            page: 1,
            limit: 1
          }
          addMechan(obj).then(res => {
            if (res.success && res.errorCode === 0) {
              this.dialogVisible2 = false
              this.menuListFn()
              setTimeout(() => {
                this.resetForm(this.formIndex)
              }, 500)
              this.$message({
                message: '新增部门成功',
                type: 'success'
              })
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    // 重置功能
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 删除功能
    deleteFn(obj) {
      this.$confirm('确定删除吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const data = {
            code: 2013,
            data: {
              id: obj.id,
              parentId: obj.parentId
            }
          }
          removeMechan(data).then(res => {
            if (res.success && res.errorCode === 0) {
              this.menuListFn()
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            } else {
              this.$message.error(res.msg)
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
      this.dialogVisible1 = true
    },
    // 修改界面信息
    editFn(obj) {
      this.formIndex = 'ruleForm3'
      this.formData3.id = obj.id
      for (const a in this.formData3) {
        this.formData3[a] = obj[a]
      }
      this.dialogVisible3 = true
    },
    // 修改功能
    submitEdit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm('确定修改吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              const a = {
                code: 2012,
                data: this.formData3,
                page: 1,
                limit: 1
              }
              upMechan(a).then(res => {
                if (res.success && res.errorCode === 0) {
                  this.$message({
                    type: 'success',
                    message: '修改成功!'
                  })
                  this.dialogVisible3 = false
                  this.menuListFn()
                } else {
                  this.$message.error('修改失败,' + res.msg)
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
<style scoped>
.table_h /deep/ .el-table__header{
  width: 100%;
}
</style>
