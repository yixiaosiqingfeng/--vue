<template>
  <div>
    <div style="display:flex;">
      <div style="width:45%;border:1px solid #ddd;height:500px;overflow-y:scroll;">
        <div style="background-color:#eee;padding:6px 8px;">
          <el-checkbox v-model="rightFlag" :indeterminate="indeterminateRight">未选菜单</el-checkbox>
          <el-input placeholder="请输入内容" prefix-icon="el-icon-search" />
        </div>
        <div v-for="(item,index) in datar" :key="index" style="padding:6px 8px;">
          <el-checkbox
            v-model="item.select"
            @change="oneMenu(item)"
          >{{ item.menuName }} => {{ item.name }}</el-checkbox>
          <!-- <template v-if="item.children">
            <div
              v-for="(tim,index2) in item.children"
              :key="index2"
              style="padding:6px 8px 6px 16px;"
            >
              <el-checkbox v-model="tim.select" @change="twoMenu(item)">{{ tim.name }}</el-checkbox>
            </div>
          </template>-->
        </div>
      </div>
      <div style="width:10%;display:flex;align-items:center;justify-content:center;">
        <div>
          <div style="padding:5px;">
            <el-button
              :type="rightCheck?'info':'primary'"
              :disabled="rightCheck"
              icon="el-icon-arrow-right"
              circle
              @click="btnRightFn"
            />
          </div>
          <div style="padding:5px;">
            <el-button
              :type="leftCheck?'info':'primary'"
              :disabled="leftCheck"
              icon="el-icon-arrow-left"
              circle
              @click="btnLeftFn"
            />
          </div>
        </div>
      </div>
      <div style="width:45%;border:1px solid #ddd;height:500px;overflow-y:scroll;">
        <div style="background-color:#eee;padding:6px 8px;">
          <el-checkbox v-model="leftFlag" :indeterminate="indeterminateLeft">已选菜单</el-checkbox>
          <el-input placeholder="请输入内容" prefix-icon="el-icon-search" />
        </div>
        <div v-for="(item,index) in datal" :key="index" style="padding:6px 8px;">
          <el-checkbox
            v-model="item.select"
            @change="oneMenu(item)"
          >{{ item.menuName }} => {{ item.name }}</el-checkbox>
          <!-- <template v-if="item.children">
            <div
              v-for="(tim,index2) in item.children"
              :key="index2"
              style="padding:6px 8px 6px 16px;"
            >
              <el-checkbox v-model="tim.select" @change="twoMenu(item)">{{ tim.name }}</el-checkbox>
            </div>
          </template>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: {
    leftData: {
      type: Array,
      default() {
        return []
      }
    },
    rightData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      flag: true,
      leftFlag: '',
      rightFlag: '',
      leftCheck: true,
      rightCheck: true,
      indeterminateLeft: false,
      indeterminateRight: false,
      datal: [],
      datar: []
    }
  },
  watch: {
    leftFlag() {
      this.flagFn(this.datal, this.leftFlag)
    },
    rightFlag() {
      this.flagFn(this.datar, this.rightFlag)
    },
    leftData() {
      this.datal = this.leftData
    },
    rightData() {
      this.datar = this.rightData
    }
  },
  mounted() {
    this.datal = this.leftData
    this.datar = this.rightData
  },
  methods: {
    flagFn(arr, boo) {
      let count = 0
      if (boo) {
        arr.forEach(k => {
          k.select = boo
          if (k.children && k.children.length > 0) {
            k.children.forEach(j => {
              j.select = boo
            })
          }
        })
        this.indeterminateLeft = false
      } else {
        arr.forEach(k => {
          if (!k.select) {
            count++
          }
          if (k.children && k.children.length > 0) {
            k.children.forEach(j => {
              if (!j.select) {
                count++
              }
            })
          }
        })
        if (count === 0) {
          arr.forEach(k => {
            k.select = boo
            if (k.children && k.children.length > 0) {
              k.children.forEach(j => {
                j.select = boo
              })
            }
          })
        } else if (count === 1) {
          this.indeterminateLeft = true
        }
      }
      this.btnLeftCheck(this.datal)
      this.btnRightCheck(this.datar)
    },
    oneMenu(obj) {
      if (obj.children && obj.children.length > 0) {
        obj.children.forEach(tim => {
          tim.select = obj.select
        })
      }
      this.btnLeftCheck(this.datal)
      this.btnRightCheck(this.datar)
    },
    twoMenu(obj) {
      let count = 0
      if (obj.children && obj.children.length > 0) {
        obj.children.forEach(tim => {
          if (tim.select) {
            count++
          }
        })
      }
      if (count > 0) {
        obj.select = true
      } else {
        obj.select = false
      }
      this.btnLeftCheck(this.datal)
      this.btnRightCheck(this.datar)
    },
    btnLeftCheck(arr) {
      let count = 0
      let index = 0
      let total = 0
      arr.forEach(tim => {
        total++
        if (tim.select) {
          count++
        } else {
          index++
        }
        if (tim.children && tim.children.length > 0) {
          tim.children.forEach(tom => {
            total++
            if (!tom.select) {
              index++
            } else {
              count++
            }
          })
        }
      })
      if (count > 0) {
        this.leftCheck = false
      } else {
        this.leftCheck = true
      }
      if (index < total) {
        this.indeterminateLeft = true
      } else {
        this.indeterminateLeft = false
        this.leftFlag = false
      }
      if (count === total) {
        this.leftFlag = true
        this.indeterminateLeft = false
      }
    },
    btnRightCheck(arr) {
      let count = 0
      let index = 0
      let total = 0
      arr.forEach(tim => {
        total++
        if (tim.select) {
          count++
        } else {
          index++
        }
        if (tim.children && tim.children.length > 0) {
          tim.children.forEach(tom => {
            total++
            if (!tom.select) {
              index++
            } else {
              count++
            }
          })
        }
      })
      if (count > 0) {
        this.rightCheck = false
      } else {
        this.rightCheck = true
      }
      if (index < total) {
        this.indeterminateRight = true
      } else {
        this.indeterminateRight = false
        this.rightFlag = false
      }
      if (count === total) {
        this.rightFlag = true
        this.indeterminateRight = false
      }
    },
    btnLeftFn() {
      const arr = this.datal
      let newArr = null
      let obj = null
      let newArr1 = null
      let obj1 = null
      const data = []
      arr.forEach(tim => {
        newArr1 = []
        obj1 = {}
        newArr = []
        obj = {}
        if (tim.children && tim.children.length > 0) {
          tim.children.forEach(tom => {
            let count = 0
            if (tom.select) {
              this.datar.forEach(vet => {
                if (tim.id === vet.id) {
                  count++
                }
              })
              if (count > 0) {
                this.datar.forEach(bet => {
                  if (tim.id === bet.id) {
                    if (bet.children && bet.children.length > 0) {
                      tom.select = false
                      bet.children.push(tom)
                    }
                  }
                })
              } else {
                newArr.push(tom)
              }
            } else {
              newArr1.push(tom)
            }
          })
          if (newArr.length > 0) {
            for (const a in tim) {
              if (a !== 'children') {
                obj[a] = tim[a]
              }
            }
            obj.children = newArr
            obj.select = false
            obj.children.forEach(bb => {
              bb.select = false
            })
            this.datar.push(obj)
          }

          if (newArr1.length > 0) {
            for (const a in tim) {
              if (a !== 'children') {
                obj1[a] = tim[a]
              }
            }
            obj1.children = newArr1
            data.push(obj1)
          }
        } else {
          if (!tim.select) {
            data.push(tim)
          } else {
            tim.select = false
            this.datar.push(tim)
          }
        }
      })
      this.datal = data
      this.datal.forEach(res => {
        res.select = false
      })
      this.leftFlag = false
      this.indeterminateLeft = false
      this.leftCheck = true
      this.$emit('getData', this.datal, this.datar)
    },
    btnRightFn() {
      const arr = this.datar
      let newArr = null
      let obj = null
      let newArr1 = null
      let obj1 = null
      const data = []
      arr.forEach(tim => {
        newArr1 = []
        obj1 = {}
        newArr = []
        obj = {}
        if (tim.children && tim.children.length > 0) {
          tim.children.forEach(tom => {
            let count = 0
            if (tom.select) {
              this.datal.forEach(vet => {
                if (tim.id === vet.id) {
                  count++
                }
              })
              if (count > 0) {
                this.datal.forEach(bet => {
                  if (tim.id === bet.id) {
                    if (bet.children && bet.children.length > 0) {
                      tom.select = false
                      bet.children.push(tom)
                    }
                  }
                })
              } else {
                newArr.push(tom)
              }
            } else {
              newArr1.push(tom)
            }
          })
          if (newArr.length > 0) {
            for (const a in tim) {
              if (a !== 'children') {
                obj[a] = tim[a]
              }
            }
            obj.children = newArr
            obj.select = false
            obj.children.forEach(aa => {
              aa.select = false
            })
            this.datal.push(obj)
          }

          if (newArr1.length > 0) {
            for (const a in tim) {
              if (a !== 'children') {
                obj1[a] = tim[a]
              }
            }
            obj1.children = newArr1
            data.push(obj1)
          }
        } else {
          if (!tim.select) {
            data.push(tim)
          } else {
            tim.select = false
            this.datal.push(tim)
          }
        }
      })
      this.datar = data
      this.datar.forEach(res => {
        res.select = false
      })
      this.rightFlag = false
      this.indeterminateRight = false
      this.rightCheck = true
      this.$emit('getData', this.datal, this.datar)
    }
  }
}
</script>

<style scoped>
.el-dialog--center {
  width: 50% !important;
}
</style>
