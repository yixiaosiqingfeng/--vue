<template>
  <div class="setpos">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <div style="display:flex;flex-wrap:wrap;">
        <div style="width:94%;">
          <el-form-item label="设置人：" prop="name">
            <el-input v-model="ruleForm.name" size="mini" />
          </el-form-item>
        </div>
        <div style="width:100%;">
          <el-form-item label="设置时间：" prop="time">
            <el-date-picker v-model="ruleForm.time" type="date" placeholder="选择日期" size="mini" />
          </el-form-item>
        </div>
        <div style="width:94%;">
          <el-form-item label="联系方式：" prop="phone">
            <el-input v-model="ruleForm.phone" size="mini" />
          </el-form-item>
        </div>
        <div style="width:94%;">
          <el-form-item label="默认密码：" prop="pass">
            <el-input v-model="ruleForm.pass" size="mini" show-password />
          </el-form-item>
        </div>
        <div style="width:94%;">
          <el-form-item label="确认密码：" prop="passYes">
            <el-input v-model="ruleForm.passYes" size="mini" show-password />
          </el-form-item>
        </div>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="closeDisalog">取 消</el-button>
      <el-button type="primary" size="mini" @click="resetpass('ruleForm')">确 定</el-button>
    </span>
  </div>
</template>
<script>
import { isPhone } from '@/utils/validate'
// import { encryption } from "@/utils/crypto";
export default {
  name: 'StaffSetPos',
  data() {
    const testPhone = function(rule, value, callback) {
      if (isPhone(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的手机号码'))
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        name: '',
        time: '',
        phone: '',
        pass: '',
        passYes: ''
      },
      rules: {
        name: [{ required: true, message: '请输入', trigger: 'blur' }],
        time: [{ required: true, message: '请输入', trigger: 'blur' }],
        phone: [{ required: true, trigger: 'blur', validator: testPhone }],
        pass: [{ required: true, trigger: 'blur', validator: validatePass }],
        passYes: [{ required: true, trigger: 'blur', validator: validatePass2 }]
      }
    }
  },
  methods: {
    resetpass(from) {
      // 记得做密码加密处理
    },
    closeDisalog() {
      this.$emit('changdia')
    }
  }
}
</script>
<style scoped>
.dialog-footer {
  display: block;
  margin: 0 103px;
}
</style>
