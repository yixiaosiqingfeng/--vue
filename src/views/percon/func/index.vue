<template>
  <div style="position:absolute; padding-left:5px;width:100%;padding-right:1px;">
    <!--//头部-->
    <search @search="search" @reset="reset" />
    <!--表格-->
    <tableAss :table-config="tableConfig" :path="path" :query-data="queryData" :target="flag">
      <template slot="footer" slot-scope="scope">
        <div style="display:flex;">
          <el-button size="medium" type="text" @click="modifyFn(scope.row)">修改</el-button>
          <el-button size="medium" type="text" @click="deleteFunc(scope.row)">删除</el-button>
        </div>
      </template>
      <template slot="header" slot-scope="scope">
        <div style="margin-left:20px;">
          <el-button size="mini" type="success" @click="dialogVisible=true">创建新功能</el-button>
          <el-button size="mini" type="danger" @click="deleteFuncAll(scope.scope.scope)">选中删除</el-button>
        </div>
      </template>
    </tableAss>
    <!--创建功能-->
    <el-dialog title="创建新功能" center :visible.sync="dialogVisible" width="50%">
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
              <el-form-item label="菜单名称" prop="organization">
                <el-cascader v-model="ruleForm.organization" :options="options1" />
              </el-form-item>
            </div>

            <div style="width:50%;">
              <el-form-item label="功能名称" prop="name">
                <el-input v-model="ruleForm.name" size="mini" />
              </el-form-item>
            </div>

            <div style="width:50%;">
              <el-form-item label="功能编码" prop="code">
                <el-input v-model="ruleForm.code" size="mini" />
              </el-form-item>
            </div>
            <div style="width:50%;">
              <el-form-item label="排序字段" prop="indexOrder">
                <el-input
                  v-model="ruleForm.indexOrder"
                  type="number"
                  min="0"
                  placeholder="请输入排序数字"
                  size="mini"
                />
              </el-form-item>
            </div>

            <div style="width:50%;">
              <el-form-item label="接口地址" prop="serviceUrl">
                <el-input v-model="ruleForm.serviceUrl" size="mini" />
              </el-form-item>
            </div>

            <div style="width:50%;">
              <el-form-item label="菜单路径" prop="menuUrl">
                <el-input v-model="ruleForm.menuUrl" size="mini" />
              </el-form-item>
            </div>

            <div style="width:100%;">
              <el-form-item label="备注" prop="note">
                <el-input v-model="ruleForm.note" type="textarea" />
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" @click="resetForm('ruleForm')">重 置</el-button>
        <el-button size="mini" type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改功能-->
    <el-dialog title="修改功能" center :visible.sync="dialogVisible1" width="50%">
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
              <el-form-item label="菜单名称" prop="organization">
                <el-cascader v-model="modForm.organization" :show-all-levels="false" :options="options1" />
              </el-form-item>
            </div>

            <div style="width:50%;">
              <el-form-item label="功能名称" prop="name">
                <el-input v-model="modForm.name" size="mini" />
              </el-form-item>
            </div>

            <div style="width:50%;">
              <el-form-item label="功能编码" prop="code">
                <el-input v-model="modForm.code" size="mini" />
              </el-form-item>
            </div>
            <div style="width:50%;">
              <el-form-item label="排序字段" prop="indexOrder">
                <el-input
                  v-model="modForm.indexOrder"
                  type="number"
                  min="0"
                  placeholder="请输入排序数字"
                  size="mini"
                />
              </el-form-item>
            </div>

            <div style="width:50%;">
              <el-form-item label="接口地址" prop="serviceUrl">
                <el-input v-model="modForm.serviceUrl" size="mini" />
              </el-form-item>
            </div>

            <div style="width:50%;">
              <el-form-item label="菜单路径" prop="menuUrl">
                <el-input v-model="modForm.menuUrl" size="mini" />
              </el-form-item>
            </div>

            <div style="width:100%;">
              <el-form-item label="备注" prop="note">
                <el-input v-model="modForm.note" type="textarea" />
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible1 = false">取 消</el-button>
        <!-- <el-button size="mini" @click="resetForm('modForm')">重置</el-button> -->
        <el-button size="mini" type="primary" @click="modifyForm('modForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import tableAss from '@/components/tableAss'
import search from '../components/funcList_header'
import {
  createFunc,
  updateFunc,
  removeFunc,
  deleteAllFun
} from '@/api/funclist'
import { getAllPrivilege } from '@/api/rights'

export default {
  components: { tableAss, search },
  data() {
    return {
      // 表格的配置参数
      tableConfig: [
        {
          width: 36,
          type: 'selection'
        },
        {
          label: '序号',
          width: 50,
          type: 'index'
        },
        {
          width: 120,
          label: '菜单名称',
          prop: 'menuName',
          character: null // 字符转义函数
        },
        {
          width: 120,
          label: '功能名称',
          prop: 'name',
          character: null // 字符转义函数
        },
        {
          width: 80,
          label: '功能编码',
          prop: 'code'
          // character: null,      //字符转义函数
        },
        {
          width: 160,
          label: '创建时间',
          prop: 'createDate'
          // popup: true,
          // character: null //字符转义函数
        },
        {
          width: 150,
          label: '接口地址',
          popup: true,
          prop: 'serviceUrl'
        },
        {
          width: 150,
          label: '菜单路径',
          popup: true,
          prop: 'menuUrl'
        },
        {
          width: 50,
          label: '排序',
          prop: 'indexOrder'
        },
        {
          width: 150,
          label: '备注信息',
          prop: 'note'
        },
        {
          label: '操作',
          prop: 'name',
          type: 'btn'
        }
      ],
      // 菜单联动数据
      options1: [],
      // 列表查询请求的路径
      path: '/admin_auth/select_menu_func_v1',
      // 创建功能弹框的控制开关
      dialogVisible: false,
      // 修改功能弹框的控制开关
      dialogVisible1: false,
      // 列表请求参数
      queryData: {
        data: {
          // depNo: '',
          // createTime: '',
          // depName: '',
          // depAdmin: '',
          // sort: '',
          // orgId: ''
        },
        limit: 10,
        page: 1,
        code: 2274
      },
      // 更新数据改变他的值就可以了
      flag: false,
      // 创建表单的数据
      ruleForm: {
        note: '', // String,备注（选填）
        name: '', // String,功能名
        serviceUrl: '', // String,接口地址http://www.gdyunst.com/jqzy/xxxx
        code: '', // String,功能编码
        menuId: '', // String,菜单id
        menuUrl: '', // String,菜单路径
        indexOrder: '', // int,排序字段（选填）
        organization: []
      },
      // 提交后台创建表单的数据
      crearForm: {
        note: '', // String,备注（选填）
        name: '', // String,功能名
        serviceUrl: '', // String,接口地址http://www.gdyunst.com/jqzy/xxxx
        code: '', // String,功能编码
        menuId: '', // String,菜单id
        menuUrl: '', // String,菜单路径
        indexOrder: '', // int,排序字段（选填）
        organization: []
      },
      // 修改表单的数据
      modForm: {
        note: '', // String,备注（选填）
        name: '', // String,功能名
        serviceUrl: '', // String,接口地址http://www.gdyunst.com/jqzy/xxxx
        code: '', // String,功能编码
        menuId: '', // String,菜单id
        menuUrl: '', // String,菜单路径
        indexOrder: '', // int,排序字段（选填）
        id: '', // String,功能id(必填)
        organization: []
      },
      // 修改提交后台创建表单的数据

      // 表单的验证方法
      rules: {
        organization: [
          { required: true, message: '请选择菜单名称', trigger: 'blur' }
        ],
        name: [{ required: true, message: '请输入功能名称', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.getMenuList() // 初始化获取菜单名称列表
  },
  methods: {
    // 修改功能数据回显
    modifyFn(obj) {
      for (const a in this.modForm) {
        if (a !== 'organization') {
          this.modForm[a] = obj[a]
        }
      }
      console.log(obj)
      this.modForm.organization = [obj.menuId]
      this.dialogVisible1 = true
    },
    // 删除功能
    deleteFunc(obj) {
      this.$confirm('此操作将永久删除该功能, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const data = {
            code: 2273,
            data: {
              id: obj.id
            }
          }
          removeFunc(data).then(res => {
            if (res.errorCode === 0 && res.success === true) {
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
    // 多选删除
    deleteFuncAll(arr) {
      if (arr.length === 0) {
        this.$message.error('没有要删除的信息')
        return
      }
      const data1 = {
        ids: []
      }
      arr.forEach(tim => {
        data1.ids.push(tim.id)
      })
      const obj = {
        code: 2275,
        data: data1
      }
      this.$confirm('确定删除选中的信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteAllFun(obj).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.flag = !this.flag
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 搜索按钮
    search(obj) {
      if (!obj.name && !obj.menuId) {
        this.$message.error('请输入要搜索的内容')
        return
      }
      this.queryData.data = obj
      this.flag = !this.flag
    },
    // 重置按钮
    reset() {
      this.queryData.data = {}
      this.queryData.limit = 10
      this.queryData.page = 1
      this.flag = !this.flag
    },
    // 创建功能
    submitForm(formName) {
      // 对菜单进行处理
      this.judgeMenu()
      // console.log(this.crearForm,'我是上传信息')
      // 表单处理
      this.subdata()
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm('确定创建该功能?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              const obj = {
                code: 2271,
                data: this.crearForm
              }
              createFunc(obj).then(res => {
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
    // 修改功能
    modifyForm(formName) {
      console.log(this.modForm)
      this.judgeMenu_up()
      // console.log(this.crearForm,'我是上传信息')
      // 表单处理
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm('确定修改该功能?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              // const data = this.modForm;
              const obj = {
                code: 2272,
                data: this.modForm
              }
              updateFunc(obj).then(res => {
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
          console.log('error submit!!')
          return false
        }
      })
    },
    // 表单重置
    resetForm(formName) {
      this.$refs[formName].resetFields()
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
        } else {
          this.$message.error('获取失败' + res.msg)
        }
      })
    },
    // 判断创建功能选择的菜单处理
    judgeMenu() {
      if (this.ruleForm.organization === undefined) {
        return
      } else {
        const num = this.ruleForm.organization.length
        this.crearForm.menuId = this.ruleForm.organization[num - 1]
      }
    },
    // 判断修改功能选择的菜单处理
    judgeMenu_up() {
      if (this.modForm.organization === undefined) {
        return
      }
    },
    // 提交数据提交处理方法
    subdata() {
      this.crearForm.name = this.ruleForm.name
      this.crearForm.note = this.ruleForm.note
      this.crearForm.serviceUrl = this.ruleForm.serviceUrl
      this.crearForm.code = this.ruleForm.code
      this.crearForm.menuUrl = this.ruleForm.menuUrl
      this.crearForm.indexOrder = this.ruleForm.indexOrder
    }
    // 更改数据提交处理方法

  }
}
</script>
