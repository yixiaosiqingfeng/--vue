<template>
  <div>
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
        <!-- <el-popover placement="right" width="400" trigger="click">
          <el-button type="text" slot="reference">#{{ topicText }}</el-button>
          <el-tag type="danger" size="mini">#{{ topicText }}</el-tag>
        </el-popover> -->
        <el-tag type="danger" size="mini">#{{ topicText }}</el-tag>
        <el-tag type="danger" size="mini">
          <i class="el-icon-location-information" /> 位置信息
        </el-tag>
      </div>

      <div class="right_header_end">
        <div style="flex-grow: 1;">
          <ul class="aliicon">
            <li @click.stop="biaoqnFn">
              <i class="iconfont icon-biaoqing1" />&nbsp;
              <span>表情</span>
            </li>
            <li @click="phsta()">
              <i class="iconfont icon-tupian" />&nbsp;
              <span>图片</span>
            </li>

            <li @click="pvsta">
              <i class="iconfont icon-shipin-m" />&nbsp;
              <span>视频</span>
            </li>
            <li @click="plsta">
              <i class="iconfont icon-lianjie" />&nbsp;
              <span>链接</span>
            </li>
            <li @click="ptsta()">
              <i class="iconfont icon-huati" />
              <span>话题</span>
            </li>
          </ul>
        </div>
        <div style="margin-bottom: 3px;">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <i class="el-icon-edit" />
              <span>{{ vest.name }}</span>
              <i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="i in vests"
                :key="i.id"
                :command="{n:i.nickname,i:i.id}"
              >{{ i.nickname }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button type="primary" size="mini" @click="submit">发布</el-button>
        </div>
      </div>
      <!-- 存放表情界面 -->
      <div style="position:relative;" @click.stop="biaoqing=1">
        <div class="biaoqin_box" :class="{open:biaoqing===1,hidden:biaoqing===2}">
          <ul class="oul" style="display:flex;flex-wrap:wrap; padding:10px;">
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
    <!-- 上传图片 -->
    <el-collapse-transition>
      <div v-show="phFlag" class="post_ph">
        <postPhoto @changClose="changClose" @upSuccess="upSuccess" />
      </div>
    </el-collapse-transition>
    <!-- 选择话题 -->
    <el-collapse-transition>
      <div v-show="ptFlag" class="post_pt">
        <posttopic :go-topic="goTopic" @topic="topic" />
      </div>
    </el-collapse-transition>
    <!-- 上传视频 -->
    <el-collapse-transition>
      <div v-show="pvFlag" class="post_pv">
        <postvideo />
      </div>
    </el-collapse-transition>
    <!-- 上传链接 -->
    <el-collapse-transition>
      <div v-show="plFlag" class="post_pv">
        <postlink />
      </div>
    </el-collapse-transition>
  </div>
</template>
<script>
import postPhoto from './post_photo'
import posttopic from './post_topic'
import postvideo from './post_video'
import postlink from './post_link'
import axios from 'axios'
export default {
  name: 'EditDiv',
  components: { postPhoto, posttopic, postvideo, postlink },
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
      // 马甲号
      vests: [],
      vest: {
        name: '',
        id: ''
      },
      // 获取话题控制
      goTopic: 1,
      // 添加图片控制
      phFlag: false,
      // 选择话题控制
      ptFlag: false,
      // 上传视频控制
      pvFlag: false,
      // 上传链接控制
      plFlag: false,
      // 输入框内容
      innerText: this.value,
      // 光标
      isLocked: false,
      // 控制表情
      biaoqing: false,
      // 话题标签
      topicText: '我要上热门',
      // 话题
      topicData: {},
      // 上传的图片
      photoData: {},
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
    },
    vests: {
      handler(n) {
        // console.log(n, '我是新值')
        this.vest.name = n[1].nickname
      },
      deep: true
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
    this.getVests()
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
    // 表情页面控制
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
    // 发布
    submit() {
      this.$emit('submit', this.topicData, this.photoData, this.vest)
    },
    // 上传图片界面控制
    phsta() {
      if (this.biaoqing === 1) {
        this.biaoqing = 2
      }
      this.ptFlag = false
      this.pvFlag = false
      this.plFlag = false
      this.phFlag = !this.phFlag
    },
    // 选择话题界面控制
    ptsta() {
      if (this.biaoqing === 1) {
        this.biaoqing = 2
      }
      this.phFlag = false
      this.pvFlag = false
      this.plFlag = false
      this.ptFlag = !this.ptFlag
      this.goTopic++
    },
    // 话题标签
    topic(topicData) {
      this.topicText = topicData.title
      this.topicData = topicData
      this.ptFlag = !this.ptFlag
    },
    // 关闭上传图片
    changClose() {
      this.phFlag = false
    },
    // 上传图片成功后
    upSuccess(photoData) {
      this.photoData = photoData
    },
    // 上传视频
    pvsta() {
      if (this.biaoqing === 1) {
        this.biaoqing = 2
      }
      this.phFlag = false
      this.ptFlag = false
      this.plFlag = false
      this.pvFlag = !this.pvFlag
    },
    // 上传链接
    plsta() {
      if (this.biaoqing === 1) {
        this.biaoqing = 2
      }
      this.phFlag = false
      this.ptFlag = false
      this.pvFlag = false
      this.plFlag = !this.plFlag
    },
    // 获取马甲
    getVests() {
      // console.log(this.$store.getters.userInFo,9999)
      const v = {
        code: '1810',
        data: {
          appAccountId: this.$store.getters.userInFo.appAccountId // app账号id 必填
        }
      }
      axios
        .post(
          'http://192.168.0.18:3366/community_auth/select_user_info_by_account_v1',
          v
        )
        .then(res => {
          if (res.data.success && res.data.errorCode === 0) {
            const d = res.data
            this.vests = d.data
          } else {
            this.$message.error(res.data.msg)
          }
        })
    },
    handleCommand(name) {
      console.log(name, '111111111')
      this.vest = name
      this.vest.name = name.n
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
  width: 300px;
  height: 0;
  box-shadow: 0 0 15px #eee;
  overflow: hidden;
  z-index: 9;
  background-color: #fff;
}

.oul {
  padding: 10px;
  border-radius: 5px;
  height: 108px;
  overflow-y: scroll;
  overflow-x: hidden;
  align-content: flex-start;
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
  // align-items: center;
  margin-top: -10px;
}
.post_ph {
  position: absolute;
  background-color: #fff;
  z-index: 9;
}
.post_pt {
  position: absolute;

  background-color: #fff;
  z-index: 9;
}
.post_pv {
  position: absolute;
  background-color: #fff;
  z-index: 9;
  box-shadow: 0 0 15px #eee;
}
</style>
