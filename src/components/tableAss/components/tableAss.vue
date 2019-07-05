<template>
  <div style="margin-bottom:20px;">
    <div style="margin-bottom:20px;">
      <slot name="header" :scope="multipleSelection" />
    </div>
    <el-table
      ref="multipleTable"
      v-loading="loading"
      :data="tableData"
      :header-cell-style="{background:'#597aff',color:'#fff'}"
      stripe
      border
      style="width: 100%"
      @cell-click="clickRow"
      @cell-mouse-enter="mouseRow"
      @selection-change="handleSelectionChange"
    >
      <template v-if="tableConfig[0].type==='selection'">
        <el-table-column :type="tableConfig[0].type" :width="tableConfig[0].width" />
        <template v-for="(item,index) in tableConfig">
          <el-table-column
            v-if="index!==0"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
          >
            <template slot-scope="scope">
              <div v-if="item.type==='btn'">
                <slot name="footer" :row="scope.row" :$index="scope.$index" />
              </div>
              <div v-else>
                <span
                  v-if="item.character"
                  :style="{color:item.color,textDecoration:item.decoration,cursor:item.cursor}"
                  @click="popupFn(item,scope.row)"
                >{{ scope.row[item.prop] | item.character }}</span>
                <span v-else>
                  <span
                    v-if="item.type==='index'"
                    :style="{color:item.color,textDecoration:item.decoration,cursor:item.cursor}"
                  >{{ scope.$index +1 }}</span>
                  <span
                    v-else
                    :style="{color:item.color,textDecoration:item.decoration,cursor:item.cursor}"
                    @click="popupFn(item,scope.row)"
                  >{{ scope.row[item.prop] }}</span>
                </span>
              </div>
            </template>
          </el-table-column>
        </template>
      </template>
      <template v-else>
        <el-table-column
          v-for="(item,index) in tableConfig"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        >
          <template slot-scope="scope">
            <div v-if="item.type==='btn'">
              <slot name="footer" :row="scope.row" :$index="scope.$index" />
            </div>
            <div v-else>
              <span
                v-if="item.character"
                :style="{color:item.color,textDecoration:item.decoration,cursor:item.cursor}"
                @click="popupFn(item,scope.row)"
              >{{ scope.row[item.prop] | item.character }}</span>
              <span v-else>
                <span
                  v-if="item.type==='index'"
                  :style="{color:item.color,textDecoration:item.decoration,cursor:item.cursor}"
                >{{ scope.$index +1 }}</span>
                <span
                  v-else
                  :style="{color:item.color,textDecoration:item.decoration,cursor:item.cursor}"
                  @click="popupFn(item,scope.row)"
                >{{ scope.row[item.prop] }}</span>
              </span>
            </div>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'TableAss',
  props: {
    tableData: {
      type: Array,
      default() {
        return []
      }
    },
    tableConfig: {
      type: Array,
      default() {
        return []
      }
    },
    loading: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      multipleSelection: []
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    clickRow(row, column) {
      if (column.type === 'selection') {
        this.$refs.multipleTable.toggleRowSelection(row)
      }
    },
    mouseRow(row, column, cell) {
      if (column.type === 'selection') {
        cell.style.cursor = 'pointer'
      }
    },
    popupFn(obj, scope) {
      console.log()
      if (obj.popup) {
        this.$emit('popupFn', true)
      } else if (obj.route) {
        this.$router.push({
          name: obj.route.name,
          params: { id: scope[obj.route.id] }
        })
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>
</style>
