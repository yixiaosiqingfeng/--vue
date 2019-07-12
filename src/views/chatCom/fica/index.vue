<template>
  <div style="position: relative;" class="classifi">
    <!-- 头部搜索部分 -->
    <ficaHeader @rowData="rowData" />
    <!-- 当前已筛选出来的数据统计 -->
    <div>
      <p>共找到22条数据</p>
    </div>
    <!-- 分类列表表格 -->
    <el-table
      :data="tableConfig.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      style="width: 100%"
      class="table-list"
      :header-cell-style="{
        'background-color': '	#EAEAEA',
      }"
    >
      <el-table-column
        prop="id"
        label="序号"
        width="100"
      />
      <el-table-column
        prop="img"
        label="分类图片"
        width="120"
      >
        <template slot-scope="scope">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <span :style="{display:scope.row.isEdit && imageUrl !== '' ? 'block':'none'}" class="iconfont icon-close-small" title="删除图片？" />
          </el-upload>
        </template>
      </el-table-column>
      <el-table-column
        label="分类名称"
        width="120"
      >
        <template scope="scope">
          <el-input v-if="scope.row.isEdit" v-model="scope.row.name" size="mini" />
          <p v-if="!scope.row.isEdit">{{ scope.row.name || '' }}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="topicsNum"
        label="话题数"
        width="120"
      />
      <el-table-column
        prop="creater"
        label="创建人"
        width="120"
      />
      <el-table-column
        prop="createTime"
        label="创建时间"
      />
      <el-table-column
        label="备注"
      >
        <template scope="scope">
          <el-input v-if="scope.row.isEdit" v-model="scope.row.desc" size="mini" />
          <p v-if="!scope.row.isEdit">{{ scope.row.desc || '' }}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            v-if="!scope.row.isEdit"
            size="mini"
            @click="handleEdit(scope.row,status=1)"
          >编辑</el-button>
          <el-button
            v-if="scope.row.isEdit"
            size="mini"
            type="success"
            @click="handleEdit(scope.row,status=2)"
          >保存</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :total="total"
      :page-size="pagesize"
      layout="prev, pager, next"
      @current-change="current_change"
    />
  </div>
</template>

<script>
import ficaHeader from './compontents/fica_header'
// import tableAss from '@/components/tableAss'
// import { getAllPrivilege } from '@/api/rights'
export default {
  components: { ficaHeader },
  data() {
    return {
      imageUrl: '',
      total: '',
      pagesize: 10,
      currentPage: 1,
      // 表格的配置参数
      tableConfig: [
        {
          id: 1,
          name: '名称1',
          topicsNum: 110,
          creater: '一林',
          createTime: '2018-7-9 12:22',
          desc: 'aaaaa',
          isEdit: false
        },
        {
          id: 2,
          name: '名称2',
          topicsNum: 110,
          creater: '一林',
          createTime: '2018-7-9 12:22',
          desc: 'bbbb',
          isEdit: false
        },
        {
          id: 3,
          name: '名称3',
          topicsNum: 110,
          creater: '一林',
          createTime: '2018-7-9 12:22',
          desc: 'cccc',
          isEdit: false
        },

        {
          id: 4,
          name: '名称4',
          topicsNum: 110,
          creater: '一林',
          createTime: '2018-7-9 12:22',
          desc: 'dddd',
          isEdit: false
        },
        {
          id: 5,
          name: '名称5',
          topicsNum: 110,
          creater: '一林',
          createTime: '2018-7-9 12:22',
          desc: 'eeeee',
          isEdit: false
        },
        {
          id: 6,
          name: '名称6',
          topicsNum: 110,
          creater: '一林',
          createTime: '2018-7-9 12:22',
          desc: 'ffff',
          isEdit: false
        },
        {
          id: 7,
          name: '名称7',
          topicsNum: 110,
          creater: '一林',
          createTime: '2018-7-9 12:22',
          desc: 'ggggg',
          isEdit: false
        },
        {
          id: 8,
          name: '名称8',
          desc: 'hhhhhh',
          isEdit: false
        },
        {
          id: 9,
          name: '名称6',
          topicsNum: 110,
          creater: '一林',
          createTime: '2018-7-9 12:22',
          desc: 'ffff',
          isEdit: false
        },
        {
          id: 10,
          name: '名称7',
          topicsNum: 110,
          creater: '一林',
          createTime: '2018-7-9 12:22',
          desc: 'ggggg',
          isEdit: false
        },
        {
          id: 11,
          name: '名称8',
          desc: 'hhhhhh',
          isEdit: false
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
  created() {
    this.total = this.tableConfig.length
  },
  methods: {
    // 上传头像
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    // 上传头像之前做处理
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 编辑
    handleEdit(row, status) {
      const tableData = this.tableConfig
      tableData.forEach(function(item, i) {
        if (item.id === row.id) {
          if (status === 1) {
            item.isEdit = true
            return
          } else if (status === 2) {
            item.isEdit = false
            return
          }
        }
      })
    },
    // 删除
    handleDelete(row) {
      const tableData = this.tableConfig
      this.$confirm('是否删除该条数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        tableData.forEach(function(item, i) {
          if (item.id === row.id) {
            tableData.splice(i, 1)
            return
          }
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
      })
    },
    // 获取从父组件传过来的新建数据
    rowData(rowData) {
      const tableData = this.tableConfig
      tableData.unshift(rowData)
    },
    // 分页
    current_change(currentPage) {
      this.currentPage = currentPage
    }
  }
}
</script>

<style scoped lang='scss'>
//上传头像
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    color: #8c939d;
    text-align: center;
  }
  .avatar {
    width: 22px;
    height: 21px;
    border-radius: 50%;
  }
  .icon-close-small{
    position: absolute;
    left: 40px;
    top: 10px;
    font-size: 22px;
  }
.classifi{
  padding: 0 20px;
  .table-list{
    margin-top: 20px;
  }
}

</style>
