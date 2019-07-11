<template>
  <div style>
    <div>
      <div
        ref="biaoqingBox"
        class="edit-div"
        :contenteditable="canEdit"
        placeholder="分享点好东西"
        @focus="isLocked = true"
        @blur="isLocked = false"
        @input="changeText"
        v-html="innerText"
      />

      <div class="input_btn">
        <el-tag type="danger" size="mini">#{{ topicText }}</el-tag>
        <el-tag type="danger" size="mini">
          <i class="el-icon-location-information" /> 位置信息
        </el-tag>
      </div>

      <div class="right_header_end">
        <div style="width:82%;">
          <ul class="aliicon">
            <li @click.stop="biaoqnFn">
              <i class="iconfont icon-biaoqing1" />&nbsp;
              <span>表情</span>
            </li>
            <li @click="phsta()">
              <i class="iconfont icon-tupian" />&nbsp;
              <span>图片</span>
            </li>
            <li>
              <i class="iconfont icon-shipin-m" />&nbsp;
              <span>视频</span>
            </li>
            <li>
              <i class="iconfont icon-lianjie" />&nbsp;
              <span>链接</span>
            </li>
            <li @click="ptsta()">
              <i class="iconfont icon-huati" />
              <span>话题</span>
            </li>
          </ul>
        </div>
        <div style="width:18%;margin-bottom: 3px;">
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
          <el-button type="primary" size="mini" @click="submit">发布</el-button>
        </div>
      </div>
      <div style="position:relative;" @click.stop="biaoqing=1">
        <div class="biaoqin_box" :class="{open:biaoqing===1,hidden:biaoqing===2}">
          <ul class="oul" style="display:flex;flex-wrap:wrap;">
            <li
              v-for="(item,index) in biaoqingArr"
              :key="index"
              style="width:28px;height:28px;cursor:pointer;"
            >
              <img :src="item.src" alt width="100%" height="100%" @click="getSrc(item.src)">
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 控制图片 -->
    <el-collapse-transition>
      <div v-show="phFlag" class="post_ph">
        <postPhoto @changClose="changClose" />
      </div>
    </el-collapse-transition>
    <!-- 控制话题 -->
    <el-collapse-transition>
      <div v-show="ptFlag" class="post_pt">
        <posttopic @topic="topic" />
      </div>
    </el-collapse-transition>
  </div>
</template>
<script>
import postPhoto from './post_photo'
import posttopic from './post_topic'
export default {
  name: 'EditDiv',
  components: { postPhoto, posttopic },
  props: {
    value: {
      type: String,
      default: ''
    },
    canEdit: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      // 添加图片控制
      phFlag: false,
      // 选择话题控制
      ptFlag: false,
      // 输入框内容
      innerText: this.value,
      // 光标
      isLocked: false,
      // 控制表情
      biaoqing: false,
      // 话题标签
      topicText: '',
      // 话题
      topicData: {},
      // 表情
      biaoqingArr: [
        {
          title: '色色',
          src: require('@/assets/biaoqing/sese.png')
        },
        {
          title: '瘪嘴',
          src: require('@/assets/biaoqing/biezui.png')
        },
        {
          title: '闭嘴',
          src: require('@/assets/biaoqing/bizui.png')
        },
        {
          title: '得意',
          src: require('@/assets/biaoqing/deyi.png')
        },
        {
          title: '发呆',
          src: require('@/assets/biaoqing/fadai.png')
        },
        {
          title: '尴尬',
          src: require('@/assets/biaoqing/ganga.png')
        },
        {
          title: '害羞',
          src: require('@/assets/biaoqing/haixiu.png')
        },
        {
          title: '困',
          src: require('@/assets/biaoqing/kun.png')
        },
        {
          title: '流泪',
          src: require('@/assets/biaoqing/liulei.png')
        },
        {
          title: '怒火',
          src: require('@/assets/biaoqing/luhuo.png')
        },
        {
          title: '微笑',
          src: require('@/assets/biaoqing/weixiao.png')
        }
      ]
    }
  },
  watch: {
    value() {
      if (!this.isLocked || !this.innerText) {
        this.innerText = this.value
      }
    }
  },
  mounted() {
    const _this = this
    document.addEventListener(
      'click',
      () => {
        if (_this.biaoqing) {
          _this.biaoqing = 2
        }
      },
      false
    )
  },
  methods: {
    changeText() {
      this.$emit('input', this.$refs.biaoqingBox.innerHTML)
    },
    getSrc(src) {
      const str = this.$refs.biaoqingBox.innerHTML
      const isDiv = str.slice(str.length - 6, str.length)
      const newStr = str.substring(0, str.length - 6)
      const isBr = newStr.slice(newStr.length - 4, newStr.length)
      const newStr2 = newStr.substring(0, newStr.length - 4)
      if (isDiv === '</div>') {
        if (isBr === '<br>') {
          this.$refs.biaoqingBox.innerHTML =
            newStr2 + '<img src="' + src + '">' + isDiv
        } else {
          this.$refs.biaoqingBox.innerHTML =
            newStr + '<img src="' + src + '">' + isDiv
        }
      } else {
        this.$refs.biaoqingBox.innerHTML += '<img src="' + src + '">'
      }
      this.$emit('input', this.$refs.biaoqingBox.innerHTML)
    },
    biaoqnFn() {
      if (this.biaoqing === 1) {
        this.biaoqing = 2
      } else if (this.biaoqing === 2) {
        this.biaoqing = 1
        this.phFlag = false
        this.ptFlag = false
      } else {
        this.biaoqing = 1
      }
    },
    submit() {
      this.$emit('submit', this.topicData)
    },
    phsta() {
      if (this.biaoqing === 1) {
        this.biaoqing = 2
      }
      this.ptFlag = false
      this.phFlag = !this.phFlag
    },
    ptsta() {
      if (this.biaoqing === 1) {
        this.biaoqing = 2
      }
      this.phFlag = false
      this.ptFlag = !this.ptFlag
    },
    //
    topic(topicData) {
      this.topicText = topicData.title
      this.topicData = topicData
      this.ptFlag = !this.ptFlag
    },
    changClose() {
      this.phFlag = false
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.input_btn {
  position: relative;
  top: -33px;
  left: 13px;
}
.edit-div {
  width: 100%;
  height: 100px;
  overflow: auto;
  word-break: break-all;
  outline: none;
  user-select: text;
  white-space: pre-wrap;
  text-align: left;
  border: 1px solid #eee;
  padding: 5px;
  margin-top: 5px;
  text-indent: 2px;
  &[contenteditable="true"] {
    user-modify: read-write-plaintext-only;
    &:empty:before {
      content: attr(placeholder);
      display: block;
      color: #ccc;
    }
  }
}

.biaoqin_box {
  position: absolute;
  width: 36%;
  height: 0;
  box-shadow: 0 0 15px #eee;
  overflow: hidden;
  z-index: 9;
  background-color: #fff;
}

.oul {
  padding: 5px;
  border-radius: 5px;
  height: 108px;
  overflow-y: scroll;
  overflow-x: hidden;
}

.biaoqin_box ul,
.biaoqin_box li {
  list-style: none;
  padding: 0;
  margin: 0;
}

.open {
  animation: strat 0.3s;
  animation-fill-mode: forwards;
}

.hidden {
  animation: end 0.3s;
  animation-fill-mode: forwards;
}
@keyframes strat {
  0% {
    height: 0;
  }
  100% {
    height: 120px;
  }
}
@keyframes end {
  0% {
    height: 120px;
  }
  100% {
    height: 0;
  }
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
.post_ph {
  position: absolute;
  background-color: #fff;
  z-index: 9;
}
.post_pt {
  position: absolute;
  top: 144px;
  left: 162px;
  background-color: #fff;
  z-index: 9;
}
</style>
