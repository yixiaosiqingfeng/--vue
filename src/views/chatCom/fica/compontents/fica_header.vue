<template>
  <div class="fica_header">
    <div style="width:100px;">
      <el-dropdown :hide-on-click="false">
        <span class="el-dropdown-link">
          全部
          <i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <div style="width:100px;">
      <div class="el-input">
        <el-input size="mini" placeholder="请输入关键字" suffix-icon="el-icon-search" />
      </div>
    </div>

    <div style="width:300px; margin-left:300px !important">
      <span>筛选:</span>

      <el-dropdown :hide-on-click="false" style="margin-left:20px ">
        <span class="el-dropdown-link">
          全部
          <i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item disabled>双皮奶</el-dropdown-item>
          <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-dropdown :hide-on-click="false" style="margin-left:20px ">
        <span class="el-dropdown-link">
          排序方式
          <i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>按最新</el-dropdown-item>
          <el-dropdown-item>按倒序</el-dropdown-item>
          <el-dropdown-item>按话题数</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!-- 分类列表Popover 弹出框 -->
    <div style="width:500px; float:right; display:flex;flex-wrap:wrap;">
      <el-popover v-model="visible" placement="bottom" width="700" popper-class="animate">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
          :limit="3"
          :on-success="handleAvatarSuccess"
        >
          <el-button size="small" type="primary">点击上传图片</el-button>
        </el-upload>

        <div style="width:100%;">
          <el-input v-model="createData.name" placeholder="请输入名称" style="margin-top:20px" size="mini" />
        </div>

        <div style="width:100%;">
          <el-input v-model="createData.desc" placeholder="请输入备注" style="margin-top:20px" type="textarea" />
        </div>

        <div style="text-align: right; margin-top:10px">
          <el-button size="mini" type="text" @click="visible = false">取消</el-button>
          <el-button type="primary" size="mini" @click="handleCreatRow">确定</el-button>
        </div>

        <el-button slot="reference">+新建</el-button>
      </el-popover>

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchData: {
        // name: '', // 功能名称
        // code: '', // 功能编码
        // menuId: '',
        // visible: false,
      },
      imageUrl: '',
      visible: false,
      createData: {
        name: '',
        desc: ''
      }
    }
  },
  methods: {
    handleCreatRow() {
      this.visible = false
      const id = 10
      const rowData = {
        id: id + 1,
        isEdit: false,
        imageUrl: this.imageUrl,
        ...this.createData
      }
      this.$emit('rowData', rowData)
      this.imageUrl = ''
      this.createData.name = ''
      this.createData.desc = ''
    },
    // 上传的文件路径
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    }
  }
}
</script>
<style scoped>
.el-dropdown-link {
  cursor: pointer;
  /* color: #409EFF; */
}
.el-icon-arrow-down {
  font-size: 12px;
}
.fica_header {
  display: flex;
  margin: 20px;
}
.fica_header > div {
  display: flex;
  align-items: center;
  margin-right: 10px;
}
.el-input {
  width: 200px !important;
  height: 28px;
  line-height: 28px;
}
/* .slide-enter-active {
  transition: all 4s;
}
.slide-leave-active {
  transition: all 4s;
} */

/* .animate{
    width: 50px;
    transition: all 2s;
} */
</style>

