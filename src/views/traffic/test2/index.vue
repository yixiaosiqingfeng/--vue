<template>
  <div class="mt20">
    <!--<div>https://api.ly522.com/ico/favicon.php?url=https://www.baidu.com</div>-->
    <!--<div>https://www.weibo.com/favicon.ico</div>-->
    <el-popover
      v-model="check"
      placement="top"
      width="430"
      trigger="click"
    >
      <div>
        <div class="select_box">
          <ul>
            <li
              v-for="(item,index) in select1"
              :key="index"
              :class="{active:item.select}"
              @click="select1Fn(select1,item)"
            >
              {{ item.label }}
            </li>
          </ul>
          <ul>
            <li
              v-for="(item,index) in select2"
              :key="index"
              :class="{active:item.select}"
              @click="select2Fn(select2,item)"
            >
              {{ item.label }}
            </li>
          </ul>
          <ul>
            <li
              v-for="(item,index) in select3"
              :key="index"
              :class="{active:item.select}"
              @click="select3Fn(select3,item)"
            >
              {{ item.label }}
            </li>
          </ul>
          <div>
            <br>
            <div style="color:#aaa;">开始时间</div>
            <div style="width:130px">
              <el-date-picker
                v-model="value1"
                type="date"
                size="mini"
                value-format="yyyy-MM-dd"
                :clearable="false"
                placeholder="选择日期"
              />
            </div>
            <div style="color:#aaa;">结束时间</div>
            <div style="width:130px">
              <el-date-picker
                v-model="value2"
                :clearable="false"
                type="date"
                value-format="yyyy-MM-dd"
                size="mini"
                placeholder="选择日期"
              />
            </div>
            <div class="mt5" style="text-align:right;">
              <el-button size="mini" type="primary" @click="submit">确认</el-button>
            </div>
          </div>
        </div>

      </div>
      <el-button slot="reference" type="text">{{ intValue }}<i class="el-icon-arrow-down el-icon--right" /></el-button>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      select1: [
        {
          label: '全部',
          value: '1',
          select: true
        },
        {
          label: '制定',
          value: '1',
          select: false
        }, {
          label: '是大覆盖',
          value: '1',
          select: false
        }, {
          label: '违法',
          value: '1',
          select: false
        }, {
          label: '分工表',
          value: '1',
          select: false
        }, {
          label: '让他个人',
          value: '1',
          select: false
        }, {
          label: '刹车',
          value: '1',
          select: false
        }
      ],
      select2: [
        {
          label: '全部',
          value: '1',
          select: true
        },
        {
          label: '与就没有',
          value: '1',
          select: false
        }, {
          label: '地方',
          value: '1',
          select: false
        }, {
          label: '与就',
          value: '1',
          select: false
        }, {
          label: '分工额外',
          value: '1',
          select: false
        }, {
          label: '刹车',
          value: '1',
          select: false
        }, {
          label: '和糖尿病',
          value: '1',
          select: false
        }
      ],
      select3: [
        {
          label: '全部',
          value: '1',
          select: true
        },
        {
          label: '千万',
          value: '1',
          select: false
        }, {
          label: '搜索',
          value: '1',
          select: false
        }, {
          label: '而',
          value: '1',
          select: false
        }, {
          label: '让他',
          value: '1',
          select: false
        }, {
          label: '那就好',
          value: '1',
          select: false
        }, {
          label: '按时',
          value: '1',
          select: false
        }
      ],
      value1: '',
      value2: '',
      seObj: {
        seVal1: '全部',
        seVal2: '全部',
        seVal3: '全部'
      },
      intValue: '全部',
      check: false
    }
  },
  mounted() {
  },
  methods: {
    select1Fn(arr, obj) {
      this.changeArrFn(arr)
      obj.select = true
      this.seObj.seVal1 = obj.label
    },
    select2Fn(arr, obj) {
      this.changeArrFn(arr)
      obj.select = true
      this.seObj.seVal2 = obj.label
    },
    select3Fn(arr, obj) {
      this.changeArrFn(arr)
      obj.select = true
      this.seObj.seVal3 = obj.label
    },
    changeArrFn(arr) {
      if (typeof arr === 'object' && arr.length > 0) {
        arr.forEach(res => {
          res.select = false
        })
      }
    },
    submit() {
      let init = ''
      const a = this.seObj.seVal1
      const b = this.seObj.seVal2
      const c = this.seObj.seVal3
      if (a === '全部' && b === '全部' && c === '全部') {
        init = '全部'
      } else {
        for (const a in this.seObj) {
          if (this.seObj[a] !== '全部') {
            init += this.seObj[a] + '/'
          }
        }
      }
      if (init !== '全部') {
        init = init.substring(0, init.length - 1)
      }
      if (this.value1 && this.value2) {
        init += this.value1 + ' - ' + this.value2
      } else if (this.value1) {
        init += this.value1
      } else if (this.value2) {
        init += this.value2
      }
      this.intValue = init
      this.check = false
      // +value1+'-'+value2
      console.log(init)
    }
  }
}
</script>

<style scoped>
  .select_box ul {
    height: 150px;
    overflow-y: scroll;
    margin: 5px;
    width: 80px;
    line-height: 24px;
  }

  .select_box {
    width: 400px;
    height: 150px;
    display: flex;
  }

  .select_box li:hover {
    background-color: #eee;
  }

  .select_box li {
    padding: 0 10px;
    cursor: pointer;
    color: #aaa;
  }

  .select_box .active {
    color: #409eff;
  }

</style>
<style>
  .el-input__inner {
    width: 130px;
  }
</style>
