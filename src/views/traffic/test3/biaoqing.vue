<template>
  <div>
    <div
      ref="biaoqingBox"
      class="edit-div"
      :contenteditable="canEdit"
      @focus="isLocked = true"
      @blur="isLocked = false"
      @input="changeText"
      v-html="innerText"
    />
    <div>
      <el-button size="mini" icon="el-icon-picture-outline-round" type="warning" circle @click.stop="biaoqnFn" />
      <el-button size="mini" type="success" @click="submit">发布</el-button>
    </div>
    <div style="position:relative;" @click.stop="biaoqing=1">
      <div class="biaoqin_box" :class="{open:biaoqing===1,hidden:biaoqing===2}">
        <ul class="oul" style="display:flex;flex-wrap:wrap;">
          <li v-for="(item,index) in biaoqingArr" :key="index" style="width:28px;height:28px;cursor:pointer;">
            <img :src="item.src" alt="" width="100%" height="100%" @click="getSrc(item.src)">
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'EditDiv',
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
      innerText: this.value,
      isLocked: false,
      biaoqing: false,
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
    'value'() {
      if (!this.isLocked || !this.innerText) {
        this.innerText = this.value
      }
    }
  },
  mounted() {
    const _this = this
    document.addEventListener('click', () => {
      if (_this.biaoqing) {
        _this.biaoqing = 2
      }
    }, false)
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
          this.$refs.biaoqingBox.innerHTML = newStr2 + '<img src="' + src + '">' + isDiv
        } else {
          this.$refs.biaoqingBox.innerHTML = newStr + '<img src="' + src + '">' + isDiv
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
      } else {
        this.biaoqing = 1
      }
    },
    submit() {
      this.$emit('submit')
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
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
    &[contenteditable=true] {
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
    width: 100%;
    height: 0;
    box-shadow: 0 0 10px #eee;
    overflow: hidden;
  }

  .oul {
    padding: 5px;
    border-radius: 5px;
    height: 108px;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .biaoqin_box ul, .biaoqin_box li {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .open {
    animation: strat 0.1s;
    animation-fill-mode: forwards;
  }

  .hidden {
    animation: end 0.1s;
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
</style>
