<template>
  <div style="position:absolute;">
    <div class="bascon_staff">
      <!-- 头部搜索部分 -->
      <staffHeader @search="search" @resettop="resettop" />
      <!-- 表格部分 -->
      <div style="margin-left:5px;">
        <tableAss
          :table-config="tableConfig"
          :path="path"
          :query-data="queryData"
          :target="target"
          @popupFn="popupFn"
        >
          <template slot="footer" slot-scope="scope" class="table_btn">
            <div style="display:flex;">
              <el-button type="text" size="mini" @click="edit(scope.row)">修改</el-button>
              <el-button type="text" size="mini" @click="remomv(scope.$index,scope.row)">删除</el-button>
              <el-button
                v-show="scope.row.accountStatus===10"
                type="text"
                size="mini"
                @click="stashow(scope.row)"
              >禁用账号</el-button>
              <el-button
                v-show="scope.row.accountStatus===20"
                type="text"
                size="mini"
                @click="stashow(scope.row)"
              >激活账号</el-button>
            </div>
          </template>
          <template slot="header" slot-scope="scope" class="staff_create">
            <el-button type="success" size="mini" class="tabtop_btn" @click="addss(scope.scope)">创建新员工</el-button>
            <el-button type="danger" size="mini" class="staff_btnt" @click="remvs(scope.scope)">选中删除</el-button>
            <el-button type="primary" size="mini">
              下载Excel模板
              <i class="el-icon-download el-icon--right" />
            </el-button>
            <el-button type="primary" size="mini" @click="diaExcel=true">
              上传Excel
              <i class="el-icon-upload el-icon--right" />
            </el-button>
            <el-button type="success" size="mini" @click="diapos=true">设置默认密码</el-button>
            <el-button type="success" size="mini" @click="resetPassword(scope.scope)">重置密码</el-button>
          </template>
        </tableAss>
      </div>
      <!-- 新建员工页面 -->
      <el-dialog title="新建员工信息" center :visible.sync="dialogVisible" width="960px">
        <el-form
          ref="crearForm"
          label-width="100px"
          class="demo-ruleForm"
          :rules="rules"
          :model="fromdata"
        >
          <div style="display:flex;flex-wrap:wrap;">
            <div style="width:33%;" class="org">
              <el-form-item label="机构：" prop="organization">
                <el-cascader
                  v-model="fromdata.organization"
                  :options="options"
                  clearable
                />
              </el-form-item>
            </div>
            <div style="width:33%;">
              <el-form-item label="姓名：" prop="realName">
                <el-input v-model="fromdata.realName" placeholder="请输入" size="mini" />
              </el-form-item>
            </div>
            <div style="width:33%;">
              <el-form-item label="性别：" prop="gender">
                <el-radio v-model="fromdata.gender" label="男">男</el-radio>
                <el-radio v-model="fromdata.gender" label="女">女</el-radio>
              </el-form-item>
            </div>
            <div style="width:33%;">
              <el-form-item label="手机号码：" prop="contact_phone">
                <el-input v-model="fromdata.contact_phone" placeholder="请输入" size="mini" />
              </el-form-item>
            </div>
            <div style="width:33%;">
              <el-form-item label="邮箱：" prop="email">
                <el-input v-model="fromdata.email" placeholder="请输入" size="mini" />
              </el-form-item>
            </div>
            <div style="width:33%;">
              <el-form-item label="员工编号：" prop="code">
                <el-input v-model="fromdata.code" placeholder="请输入" size="mini" />
              </el-form-item>
            </div>
            <div style="width:33%;">
              <el-form-item label="员工账号：" prop="username">
                <el-input v-model="fromdata.username" placeholder="请输入" size="mini" />
              </el-form-item>
            </div>
            <div style="width:33%;">
              <el-form-item label="员工密码：" prop="password">
                <el-input v-model="fromdata.password" placeholder="请输入" size="mini" show-password />
              </el-form-item>
            </div>
            <div style="width:33%;">
              <el-form-item label="账号状态：" prop="status">
                <template>
                  <el-radio v-model="fromdata.status" label="10">可用</el-radio>
                  <el-radio v-model="fromdata.status" label="20">禁用</el-radio>
                </template>
              </el-form-item>
            </div>
            <div style="width:99%;" class="assignment">
              <el-form-item label="分配角色：" prop="roleId">
                <el-select v-model="fromdata.roleId" multiple placeholder="请选择">
                  <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </div>
            <div style="width:99%;">
              <el-form-item label="备注：" prop="note">
                <el-input v-model="fromdata.note" placeholder="请输入" size="mini" type="textarea" />
              </el-form-item>
            </div>
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="empty('crearForm')">重 置</el-button>
          <el-button type="primary" size="mini" @click="addempname('crearForm')">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 修改员工界面 -->
      <div>
        <el-dialog title="修改员工信息" :visible.sync="dia" width="960px" center>
          <el-form
            ref="crearForm1"
            :model="fromdata1"
            label-width="100px"
            class="demo-ruleForm"
            :rules="rules"
          >
            <div style="display:flex;flex-wrap:wrap;">
              <div style="width:33%;" class="org">
                <el-form-item label="机构：" prop="organization">
                  <el-cascader
                    v-model="fromdata1.organization"
                    :options="options"
                    clearable
                  />
                </el-form-item>
              </div>
              <div style="width:33%;">
                <el-form-item label="姓名：" prop="realName">
                  <el-input v-model="fromdata1.realName" placeholder="请输入" size="mini" />
                </el-form-item>
              </div>

              <div style="width:33%;">
                <el-form-item label="性别：" prop="gender">
                  <el-radio v-model="fromdata1.gender" label="男">男</el-radio>
                  <el-radio v-model="fromdata1.gender" label="女">女</el-radio>
                </el-form-item>
              </div>

              <div style="width:33%;">
                <el-form-item label="手机号码：" prop="contact_phone">
                  <el-input v-model="fromdata1.contact_phone" placeholder="请输入" size="mini" />
                </el-form-item>
              </div>

              <div style="width:33%;">
                <el-form-item label="邮箱：" prop="email">
                  <el-input v-model="fromdata1.email" placeholder="请输入" size="mini" />
                </el-form-item>
              </div>

              <div style="width:33%;">
                <el-form-item label="员工编号：" prop="code">
                  <el-input v-model="fromdata1.code" placeholder="请输入" size="mini" />
                </el-form-item>
              </div>

              <div style="width:33%;">
                <el-form-item label="员工账号：" prop="username">
                  <el-input v-model="fromdata1.username" placeholder="请输入" size="mini" />
                </el-form-item>
              </div>

              <div style="width:33%;">
                <el-form-item label="账号状态：" prop="status">
                  <template>
                    <el-radio v-model="fromdata1.status" label="10">可用</el-radio>
                    <el-radio v-model="fromdata1.status" label="20">禁用</el-radio>
                  </template>
                </el-form-item>
              </div>

              <div style="width:100%;" class="assignment">
                <el-form-item label="分配角色：" prop="roleId">
                  <el-select v-model="fromdata1.roleId" multiple placeholder="请选择">
                    <el-option
                      v-for="item in options2"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </div>

              <div style="width:99%;">
                <el-form-item label="备注：" prop="note">
                  <el-input v-model="fromdata1.note" placeholder="请输入" size="mini" type="textarea" />
                </el-form-item>
              </div>
            </div>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button v-show="false" size="mini" @click="empty1('crearForm1')">重 置</el-button>
            <el-button size="mini" @click="dia =false">取 消</el-button>
            <el-button type="primary" size="mini" @click="upempname('crearForm1')">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
    <!-- excel文件上传下载 -->
    <el-dialog :visible.sync="diaExcel" width="30%" title="上传Excel">
      <staffExcel />
    </el-dialog>
    <!-- 设置默认密码界面 -->
    <el-dialog title="设置默认密码" :visible.sync="diapos" width="380px">
      <staffSetPos @changdia="changdia" />
    </el-dialog>
    <!-- 重置密码界面 -->
    <el-dialog title="重置选中员工密码" :visible.sync="diareset" width="20%">
      <el-form
        ref="passfrom"
        :model="fromdata2"
        label-width="100px"
        class="demo-ruleForm"
        :rules="rules"
      >
        <div style="width:80%;">
          <el-form-item label="重置密码：" prop="newPassword">
            <el-input v-model="fromdata2.newPassword" placeholder="请输入" size="mini" show-password />
            <span class="reset_title">（注意：初始密码为123456）</span>
          </el-form-item>
        </div>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="diareset = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="resPass('passfrom')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import tableAss from '@/components/tableAss'
import staffHeader from '../staff/compontents/staff_haeder'
import staffExcel from '../staff/compontents/staff_excel'
import staffSetPos from '../staff/compontents/staff_setpos'
import { encryption } from '../../../utils/crypto'
import {
  addStaff,
  removeStaff,
  upStaff,
  rmStaffs,
  addorg,
  addrole,
  resPassword,
  changeStatus
} from '@/api/staff'

import { isPhone, isEmail } from '@/utils/validate'

export default {
  components: { tableAss, staffHeader, staffExcel, staffSetPos },
  data() {
    const testPhone = function(rule, value, callback) {
      if (isPhone(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的手机号码'))
      }
    }
    const testEmail = function(rule, value, callback) {
      if (isEmail(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的邮箱'))
      }
    }
    const testPos = function(rule, value, callback) {
      if (value !== '') {
        callback()
      } else {
        callback(new Error('请输入密码'))
      }
    }
    return {
      // 表格配置
      tableConfig: [
        {
          width: 50,
          type: 'selection'
        },
        {
          label: '序号',
          width: 50,
          type: 'index'
        },
        {
          width: 80,
          label: '姓名',
          prop: 'realName'
        },
        {
          width: 50,
          label: '性别',
          prop: 'gender'
        },
        {
          width: 160,
          label: '机构',
          popup: true,
          prop: 'orgName'
        },
        {
          width: 90,
          label: '编号',
          popup: true,
          prop: 'code'
        },
        {
          width: 110,
          label: '手机号码',
          prop: 'contactPhone'
        },
        {
          width: 170,
          label: '邮箱',
          prop: 'email'
        },
        {
          width: 55,
          label: '状态',
          prop: 'accountStatus'
        },
        {
          width: 180,
          label: '最后操作时间',
          prop: 'createDate'
        },
        // {
        //   width: 55,
        //   label: "备注",
        //   prop: "note"
        // },
        {
          label: '操作',
          prop: 'name',
          type: 'btn'
        }
      ],
      // 请求路径
      path: '/admin_auth/select_emp_list_by_name_v1',
      // 请求参数
      queryData: {
        code: '2024',
        data: {},
        limit: 10,
        page: 1
      },
      // 事件监听
      target: false,
      // 新建员工页面
      dialogVisible: false,
      // 修改员工页面
      dia: false,
      // 上传表格页面
      diaExcel: false,
      // 设置默认密码界面
      diapos: false,
      // 重置界面
      diareset: false,
      // 重置密码
      fromdata2: {
        newPassword: '123456',
        newPassword2: ''
      },
      // 存储当前被删除角色的ID
      num: '',
      // 存储当前员工的账号ID
      num3: '',
      // 存储当前被编辑对象的ID
      num2: '',
      // 存储勾选员工的账号ID
      accstaffsid: [],
      // 存储勾选员工的员工ID
      empstaffsid: [],
      // 账号状态控制
      staId: '',
      statusss: '',
      // 新建员工信息
      crearForm: {
        employee: {
          note: '', // 备注
          creater_id: '', // 创建人ID
          create_date: '', // 创建时间
          operater_id: '', // 操作人ID
          code: '', // 员工编号
          contact_phone: '', // 手机号码
          email: '', // 邮箱
          organization_id: '', // 机构ID
          realName: '', // 员工姓名
          gender: '' // 员工性别
        },
        account: {
          username: '', // 员工账号
          password: '', // 员工密码
          status: '' // 账号状态 10可用，20不可用
        },
        roleId: '' // 分配的角色ID,可以是多个
      },
      // 修改员工信息
      crearForm1: {
        employee: {
          note: '', // 备注
          creater_id: '', // 创建人ID
          create_date: '', // 创建时间
          operater_id: '', // 操作人ID
          code: '', // 员工编号
          contact_phone: '', // 手机号码
          email: '', // 邮箱
          organization_id: '', // 机构ID
          realName: '', // 员工姓名
          gender: '', // 员工性别
          id: '' // 员工ID
        },
        account: {
          username: '', // 员工账号
          password: '', // 员工密码
          status: '', // 账号状态 10可用，20不可用
          id: '' // 员工账号id
        },
        roleId: '' // 分配的角色ID,可以是多个
      },
      // 表单验证对象
      fromdata: {
        note: '', // 备注
        creater_id: '', // 创建人ID
        create_date: '', // 创建时间
        operater_id: '', // 操作人ID
        code: '', // 员工编号
        contact_phone: '', // 手机号码
        email: '', // 邮箱
        organization_id: '', // 机构ID
        realName: '', // 员工姓名
        gender: '男', // 员工性别
        username: '', // 员工账号
        password: '', // 员工密码
        status: '10', // 账号状态 10可用，20不可用
        roleId: '', // 分配的角色ID,可以是多个
        organization: []
      },
      fromdata1: {
        note: '', // 备注
        creater_id: '', // 创建人ID
        create_date: '', // 创建时间
        operater_id: '', // 操作人ID
        code: '', // 员工编号
        contact_phone: '', // 手机号码
        email: '', // 邮箱
        organization_id: '', // 机构ID
        realName: '', // 员工姓名
        gender: '', // 员工性别
        username: '', // 员工账号
        status: '', // 账号状态 10可用，20不可用
        roleId: '', // 分配的角色ID,可以是多个
        organization: []
      },
      // 验证规则
      rules: {
        organization: [
          { required: true, trigger: 'change', message: '请选择机构' }
        ],
        realName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        contact_phone: [
          { required: true, trigger: 'blur', validator: testPhone }
        ],
        email: [{ required: true, trigger: 'blur', validator: testEmail }],
        code: [{ required: true, message: '请输入员工编号', trigger: 'blur' }],
        username: [
          { required: true, message: '请输入员工账号', trigger: 'blur' }
        ],
        password: [{ required: true, trigger: 'blur', validator: testPos }],
        roleId: [
          { required: true, message: '请选择需要分配的角色', trigger: 'blur' }
        ],
        status: [{ required: true, message: '请选择状态', trigger: 'change' }],
        newPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      // 机构联动
      options: [],
      // 角色选择
      options2: []
    }
  },
  mounted() {
    this.toOrg()
  },

  methods: {
    // 删除员工
    remomv(a, b) {
      this.num = b.id
      this.num3 = b.accountId
      this.$confirm('请问是否删除该员工?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const i = {
            code: '2023',
            data: {
              employee: {
                id: this.num
              },
              account: {
                id: this.num3
              }
            },
            page: 1,
            limit: 1
          }
          removeStaff(i).then(res => {
            if (res.success && res.errorCode === 0) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.target = !this.target
            } else {
              this.$message.error('删除失败，' + res.msg)
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

    // 修改按钮功能
    edit(obj) {
      this.toRole()
      for (const a in this.fromdata1) {
        this.fromdata1[a] = obj[a]
      }
      this.options.forEach(tim => {
        if (tim.children && tim.children.length > 0) {
          tim.children.forEach(tom => {
            if (tom.value === obj.organizationId) {
              this.fromdata1.organization = [tim.value, obj.organizationId]
            }
          })
        }
      })
      this.crearForm1.employee.id = obj.id
      this.crearForm1.account.id = obj.accountId
      this.fromdata1.contact_phone = obj.contactPhone
      this.fromdata1.gender = obj.gender
      this.fromdata1.status = obj.accountStatus.toString()
      this.dia = true
    },
    // 修改员工页面确定按钮功能
    upempname(from) {
      // 对机构进行处理
      this.judgeOrg_up()
      // 表单处理部分
      this.changedata()
      this.$refs[from].validate(valid => {
        if (valid) {
          this.$confirm('请问是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              const a = {
                code: 2022,
                data: this.crearForm1
              }
              upStaff(a).then(res => {
                if (res.success && res.errorCode === 0) {
                  this.$message({
                    type: 'success',
                    message: '修改成功!'
                  })
                  this.dia = false
                  this.empty1(from)
                  this.target = !this.target
                } else {
                  this.$message.error('修改员工信息失败，' + res.msg)
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
    // 删除多个员工
    remvs(c) {
      if (c.scope.length === 0) {
        this.$message.error('当前没有选中的员工')
      } else {
        const d = c.scope
        console.log(d, '我是点击多选的信息')
        for (let i = 0; i < d.length; i++) {
          const element = d[i]
          this.accstaffsid.push(element.accountId) // 账号ID
          this.empstaffsid.push(element.id) // 员工id
        }
        this.open6()
      }
    },
    // 删除多个员工
    open6() {
      this.$confirm('请问是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const ids = {
            code: '2029',
            data: {
              employee: {
                ids: this.empstaffsid
              },
              account: {
                ids: this.accstaffsid
              }
            }
          }
          rmStaffs(ids).then(res => {
            if (res.success && res.errorCode === 0) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.target = !this.target
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
    // 创建新员工按钮
    addss(arr) {
      this.dialogVisible = true
      this.toRole()
    },
    popupFn(boo) {
      this.dialogVisible888 = boo
    },
    // 查询功能
    search(searchData) {
      if (
        !searchData.realName &&
        !searchData.orgName &&
        !searchData.createDate &&
        !searchData.code
      ) {
        this.$message.error('请输入要搜索的内容')
      } else {
        this.queryData.data = searchData
        this.target = !this.target
      }
    },
    // 重置按钮
    resettop() {
      this.queryData.data = {}
      this.queryData.limit = 10
      this.queryData.page = 1
      this.target = !this.target
    },

    // 添加员工
    addempname(from) {
      // 对机构进行处理
      this.judgeOrg()
      // 表单处理
      this.subdata()
      // 密码加密
      if (this.crearForm.account.password !== '') {
        const addpas = encryption(this.crearForm.account.password)
        this.crearForm.account.password = addpas
      }
      this.$refs[from].validate(valid => {
        if (valid) {
          this.$confirm('请问是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              const a = {
                code: '2021',
                data: this.crearForm,
                limit: 10,
                page: 1
              }
              addStaff(a).then(res => {
                if (res.success && res.errorCode === 0) {
                  this.$message({
                    type: 'success',
                    message: '创建成功!'
                  })
                  this.dialogVisible = false
                  this.empty(from)
                  this.target = !this.target
                } else {
                  this.$message.error(res.msg)
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

    // 员工信息重置
    empty(staFrom) {
      if (this.$refs[staFrom] !== undefined) {
        this.$refs[staFrom].resetFields()
      }
    },
    empty1(staFrom) {
      if (this.$refs[staFrom] !== undefined) {
        this.$refs[staFrom].resetFields()
      }
    },
    // 获取机构列表
    toOrg() {
      const r = {
        code: 2014,
        data: {},
        page: 1,
        limit: 1000
      }
      addorg(r).then(res => {
        if (res.success && res.errorCode === 0) {
          const orglist = res.data
          const orglist1 = JSON.parse(
            JSON.stringify(orglist).replace(/name/g, 'label')
          )
          const orglist2 = JSON.parse(
            JSON.stringify(orglist1).replace(/id/g, 'value')
          )
          const newArr = orglist2.filter((item, index, arr) => item.children.length !== 0)
          this.options = newArr
        } else {
          this.$message.error('获取机构信息失败' + res.msg)
        }
      })
    },
    // 获取角色列表
    toRole() {
      const e = {
        code: 2071,
        data: {},
        page: 1,
        limit: 1000
      }
      addrole(e).then(res => {
        if (res.success && res.errorCode === 0) {
          const roleList = res.data
          const roleList1 = JSON.parse(
            JSON.stringify(roleList).replace(/name/g, 'label')
          )
          const roleList2 = JSON.parse(
            JSON.stringify(roleList1).replace(/id/g, 'value')
          )
          this.options2 = roleList2
        } else {
          this.$message.error('获取角色信息失败' + res.msg)
        }
      })
    },
    // 判断创建员工选择的机构
    judgeOrg() {
      if (this.fromdata.organization === undefined) {
        return
      } else {
        const num = this.fromdata.organization.length
        this.crearForm.employee.organization_id = this.fromdata.organization[
          num - 1
        ]
      }
    },
    // 判断修改员工选择的机构
    judgeOrg_up() {
      if (this.fromdata1.organization === undefined) {
        return
      } else {
        const num = this.fromdata1.organization.length
        this.crearForm1.employee.organization_id = this.fromdata1.organization[
          num - 1
        ]
      }
    },
    // 提交数据提交处理方法
    subdata() {
      this.crearForm.employee.realName = this.fromdata.realName
      this.crearForm.employee.note = this.fromdata.note
      this.crearForm.employee.code = this.fromdata.code
      this.crearForm.employee.contact_phone = this.fromdata.contact_phone
      this.crearForm.employee.gender = this.fromdata.gender
      this.crearForm.employee.email = this.fromdata.email
      this.crearForm.account.username = this.fromdata.username
      this.crearForm.account.password = this.fromdata.password
      this.crearForm.account.status = this.fromdata.status
      this.crearForm.roleId = this.fromdata.roleId
    },
    // 更改数据提交处理方法
    changedata() {
      this.crearForm1.employee.realName = this.fromdata1.realName
      this.crearForm1.employee.note = this.fromdata1.note
      this.crearForm1.employee.code = this.fromdata1.code
      this.crearForm1.employee.contact_phone = this.fromdata1.contact_phone
      this.crearForm1.employee.gender = this.fromdata1.gender
      this.crearForm1.employee.email = this.fromdata1.email
      this.crearForm1.account.username = this.fromdata1.username
      this.crearForm1.account.password = this.fromdata1.password
      this.crearForm1.account.status = this.fromdata1.status
      this.crearForm1.roleId = this.fromdata1.roleId
    },
    // 重置密码功能
    resetPassword(c) {
      if (c.scope.length === 0) {
        this.$message.error('请勾选需要重置密码的员工')
      } else {
        const d = c.scope
        for (let i = 0; i < d.length; i++) {
          const element = d[i]
          this.accstaffsid.push(element.accountId)
        }
        this.diareset = true
      }
    },
    resPass(from) {
      // 密码加密
      if (this.fromdata2.newPassword !== '') {
        const addpas = encryption(this.fromdata2.newPassword)
        this.fromdata2.newPassword2 = addpas
      }
      this.$refs[from].validate(valid => {
        if (valid) {
          this.$confirm('请问是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              const p = {
                code: '2360',
                data: {
                  ids: this.accstaffsid, // 必填，账号id数组
                  newPassword: this.fromdata2.newPassword2 // 必填，重置的新密码
                }
              }
              resPassword(p).then(res => {
                if (res.success && res.errorCode === 0) {
                  this.$message({
                    type: 'success',
                    message: '重置成功!'
                  })
                  this.diareset = false
                  this.fromdata2.newPassword = '123456'
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
    // 账号控制函数
    stashow(s) {
      this.staId = s.accountId
      if (s.accountStatus === 10) {
        this.statusss = Number(20)
      } else if (s.accountStatus === 20) {
        this.statusss = Number(10)
      }
      this.$confirm('此操作将改变账号状态, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const t = {
            code: '2088',
            data: {
              id: this.staId,
              status: this.statusss
            }
          }
          changeStatus(t).then(res => {
            if (res.success && res.errorCode === 0) {
              this.$message({
                type: 'success',
                message: '更改成功!'
              })
              this.target = !this.target
            } else {
              this.$message.error(res.msg)
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消更改'
          })
        })
    },
    changdia() {
      this.diapos = false
    }
  }
}
</script>
<style scoped>
.bascon_staff >>> .el-table th {
  text-align: center;
}

.bascon_staff >>> .el-table td {
  text-align: center;
}

.bascon_staff >>> .tabtop_btn {
  margin-left: 20px;
}

.org /deep/ .el-input__inner {
  height: 28px;
  line-height: 28px;
}

.assignment >>> .el-input__inner {
  display: flex;
  width: 799px;
}
.reset_title {
  font-size: 12px;

}
</style>

