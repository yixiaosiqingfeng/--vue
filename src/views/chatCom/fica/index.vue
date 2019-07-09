<template>
  <div style="position: relative;">
    <!-- 头部搜索部分 -->
    <ficaHeader />
    <!-- 当前已筛选出来的数据统计 -->
    <div>
      <p>共找到22条数据</p>
    </div>
    <!-- 分类列表表格 -->
    <tableAss :table-config="tableConfig" :path="path" :query-data="queryData" :target="flag">
      <template slot="footer" slot-scope="scope">
        <div style="display:flex;">
          <el-button size="medium" type="text" @click="modifyFn(scope.row)">修改</el-button>
          <el-button size="medium" type="text" @click="deleteFunc(scope.row)">删除</el-button>
        </div>
      </template>
    </tableAss>
    <!-- 分类列表添加ul -->
    <!-- <div class="add">
      <transition name="slide">
        <table class="tb" v-if="isVisible">
          <tr>
            <th>分类图片</th>
            <th>名称</th>
            <th>备注</th>
            <th>操作</th>
          </tr>
          <tr>
            <td style="width: 200px"><el-button slot="reference">上传图片</el-button></td>
            <td style="width: 200px">
              <el-input placeholder="请输入名称" style="width: 100%"></el-input>
            </td>
            <td style="width: 700px">
              <el-input placeholder="请输入备注" style="width: 100%"></el-input>
            </td>
            <td>
              <el-button size="mini" type="primary" @click="submitCreatfica()">发布</el-button>
            </td>
          </tr>
        </table>
      </transition>
    </div> -->

  </div>
</template>

<script>
import ficaHeader from './compontents/fica_header'
import tableAss from '@/components/tableAss'
// import { getAllPrivilege } from '@/api/rights'
export default {
  components: { tableAss, ficaHeader },
  data() {
    return {
      // 表格的配置参数
      tableConfig: [
        // {
        //   width: 36,
        //   type: 'selection'
        // },
        {
          label: '序号',
          width: 50,
          type: 'index'
        },
        {
          width: 120,
          label: '分类图片' // （非必填）
          // prop: 'menuName',
          // character: null // 字符转义函数
        },
        {
          width: 120,
          label: '分类名称' // （必填）
          // prop: 'name',
          // character: null // 字符转义函数
        },

        {
          width: 160,
          label: '话题数',
          prop: 'createDate'
          // popup: true,
          // character: null //字符转义函数
        },
        {
          width: 160,
          label: '创建人',
          prop: 'createDate'
          // popup: true,
          // character: null //字符转义函数
        },
        {
          width: 160,
          label: '创建时间',
          prop: 'createDate'
          // popup: true,
          // character: null //字符转义函数
        },
        {
          width: 250,
          label: '备注' // （非必填）
          // prop: 'code'
          // character: null,      //字符转义函数
        },
        {
          label: '操作',
          prop: 'name',
          type: 'btn'
        }
      ],
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
      // 列表查询请求的路径
      path: '/admin_auth/select_menu_func_v1'
      // isVisible: false,
      // visible:false,

    }
  },
  methods: {
    // 新建分类

  }
}
</script>

<style scoped>
/* .tb {
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
} */
</style>
