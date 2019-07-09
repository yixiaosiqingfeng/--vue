<template>
  <div>
    <!-- 顶部发布区域 -->
    <div class="right_header">
      <el-input
        v-model="textarea"
        type="textarea"
        placeholder="分享点好东西"
        :autosize="{ minRows: 3, maxRows: 55}"
      />
      <div class="input_btn">
        <el-tag type="danger" size="mini">#今天吃什么</el-tag>
        <el-tag type="danger" size="mini">
          <i class="el-icon-location-information" /> 位置信息
        </el-tag>
      </div>
      <div class="right_header_end">
        <div style="width:82%;">
          <ul class="aliicon">
            <li>
              <i class="iconfont icon-biaoqing1" />&nbsp;表情
            </li>
            <li>
              <i class="iconfont icon-tupian" />&nbsp;图片
            </li>
            <li>
              <i class="iconfont icon-shipin-m" />&nbsp;视频
            </li>
            <li>
              <i class="iconfont icon-lianjie" />&nbsp;链接
            </li>
          </ul>
        </div>
        <div style="width:18%;">
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="el-icon-edit" />
              发布昵称
              <i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>昵称一</el-dropdown-item>
              <el-dropdown-item>昵称二</el-dropdown-item>
              <el-dropdown-item>昵称三</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button type="primary" size="mini">发布</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      textarea: ''
    }
  }
}
</script>
<style scoped>
.right_header {
  margin: 5px;
}
.input_btn {
  position: relative;
  top: -33px;
  left: 13px;
}
ul,
li {
  margin: 0;
  padding: 0;
}
.aliicon > li {
  list-style: none;
  display: inline-block;
  margin-left: 5px;
  cursor: pointer;
}
.el-dropdown-link {
  cursor: pointer;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.right_header_end {
  display: flex;
  justify-content: space-between;
  margin-top: -10px;
}
.right_header /deep/ .el-textarea__inner{
  padding: 0 15px 35px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>
