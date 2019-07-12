<template>
  <div style="background-color: #f9f9f9;">
    <!-- 评论框区-->
    <div style="display:flex;flex-wrap:wrap;padding-left: 10%;" class="mt10">
      <!-- 左边头像 -->
      <div class="com_left">
        <div class="com_left_photo">
          <img src="http://pic29.nipic.com/20130507/8952533_183922555000_2.jpg">
        </div>
      </div>
      <!-- 右侧 -->
      <div class="com_right">
        <div>
          <div>
            <input type="text" class="div_input" placeholder="请输入">
          </div>
          <div class="mt5" style="display:flex;justify-content: space-between;align-items: center;">
            <div>
              <span>
                <i class="iconfont icon-biaoqing1" /> 表情
              </span>&nbsp;&nbsp;
              <span>
                <i class="iconfont icon-tupian" /> 图片
              </span>
            </div>
            <el-button type="info" size="mini">评论</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 评论列表 -->
    <div style="display:flex;flex-wrap:wrap;padding-left: 10%;" class="mt10">
      <!-- 左边头像 -->
      <div class="com_left">
        <div class="com_left_photo">
          <img src="http://pic29.nipic.com/20130507/8952533_183922555000_2.jpg">
        </div>
      </div>
      <!-- 右侧 -->
      <div class="com_right">
        <div>
          <!-- 评论 -->
          <div>
            <p class="div_input1">
              <span>张大大：</span>
              <span>评论信息，佛山交通委提醒您，道路千万条</span>
            </p>
          </div>
          <!-- 评论下方信息 -->
          <div class="mt5" style="display:flex;justify-content: space-between;align-items: center;">
            <div>
              <span>10分钟前</span>&nbsp;&nbsp;
            </div>
            <el-button type="text" size="mini" @click.stop="reply">回复</el-button>
          </div>
        </div>
      </div>

      <!-- 二级回复框-->
      <div style="display:flex;flex-wrap:wrap;padding-left: 10%;" class="mt10">
        <!-- 左边头像 -->
        <div class="com_left" />
        <!-- 右侧 -->
        <div class="com_right1">
          <div>
            <div>
              <input type="text" class="div_input2" placeholder="请输入">
            </div>
            <div
              class="mt5"
              style="display:flex;justify-content: space-between;align-items: center;"
            >
              <div>
                <span>
                  <i class="iconfont icon-biaoqing1" /> 表情
                </span>&nbsp;&nbsp;
                <span>
                  <i class="iconfont icon-tupian" /> 图片
                </span>
              </div>
              <el-button type="info" size="mini">回复</el-button>
            </div>
          </div>
        </div>
      </div>
      <!-- 回复 -->
      <div class="com_reply">
        <div>
          <p class="div_input1">
            <span>张晓雪：回复@张大大：</span>
            <span>安全最重要</span>
          </p>
        </div>
        <div class="mt5" style="display:flex;justify-content: space-between;align-items: center;">
          <div>
            <span>10分钟前</span>&nbsp;&nbsp;
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input2: '',
      hfFlag: false
    }
  },
  methods: {
    reply() {
      this.hfFlag = !this.hfFlag
    }
  }
}
</script>
<style scoped>
.com_left {
  width: 10%;
}
.com_left_photo {
  height: 40px;
  width: 40px;
  margin: 0 auto;
  border-radius: 50%;
}
.com_left_photo img {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 50%;
}
.div_input {
  width: 690px;
  height: 28px;
  margin-top: 5px;
  border: 1px solid #ccc;
  text-indent: 5px;
}
.div_input1 {
  width: 690px;
}
.com_reply {
  width: 600px;
  margin: 0 auto;
}
.com_right1 {
  margin: 15px;
}
.div_input2 {
  width: 600px;
  height: 28px;
}
</style>
