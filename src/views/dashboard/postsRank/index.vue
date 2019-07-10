<template>
  <div class="postsRank-container">
    <p class="ft18 fw">帖子排名</p>
    <div class="infinite-list-wrapper">
      <ul>
        <li v-for="item in postRank" :key="item.id" class="infinite-list-item">
          <h4>{{ item.top }}</h4>
          <div class="list-content">
            <p class="list-content-head">
              <img src="" alt="">
              <span>{{ item.name }}</span>
              <a>{{ item.title }}</a>
              <span class="time">{{ item.time }}</span>
            </p>
            <p class="list-content-text">
              <span>{{ item.con }}</span>
              <img src="" alt="">
            </p>
            <p class="go-hot">#我要上热门</p>
            <div class="link">
              <p>[
                <span>赞</span>
                <a>{{ item.praise }}</a>
                ]
              </p>
              <p>
                [<span>评论</span>
                <a>{{ item.comments }}</a>]
              </p>
              <p>
                [<span>转发</span>
                <a>{{ item.forwarding }}</a>]
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: 'PostsRank',
  data() {
    return {
      count: 10,
      loading: false,
      postRank: [
        { id: 1, top: 1, headPortrait: '', name: '小小', title: '同步新空气', time: '12：00', con: 'conconconconconconconconconconconconconconconconconconconconconconc', praise: '20', comments: '30', forwarding: '40', img: '' },
        { id: 2, top: 2, headPortrait: '', name: '小小', title: '同步新空气', time: '12：00', con: 'conconconconconcon', praise: '20', comments: '30', forwarding: '40', img: '' },
        { id: 3, top: 3, headPortrait: '', name: '小小', title: '同步新空气', time: '12：00', con: 'conconconconconcon', praise: '20', comments: '30', forwarding: '40', img: '' },
        { id: 4, top: 4, headPortrait: '', name: '小小', title: '同步新空气', time: '12：00', con: 'conconconconconcon', praise: '20', comments: '30', forwarding: '40', img: '' },
        { id: 5, top: 5, headPortrait: '', name: '小小', title: '同步新空气', time: '12：00', con: 'conconconconconcon', praise: '20', comments: '30', forwarding: '40', img: '' },
        { id: 6, top: 6, headPortrait: '', name: '小小', title: '同步新空气', time: '12：00', con: 'conconconconconconconconc', praise: '20', comments: '30', forwarding: '40', img: '' },
        { id: 7, top: 7, headPortrait: '', name: '小小', title: '同步新空气', time: '12：00', con: 'conconconconconcon', praise: '20', comments: '30', forwarding: '40', img: '' },
        { id: 8, top: 8, headPortrait: '', name: '小小', title: '同步新空气', time: '12：00', con: 'conconconconconcon', praise: '20', comments: '30', forwarding: '40', img: '' },
        { id: 9, top: 9, headPortrait: '', name: '小小', title: '同步新空气', time: '12：00', con: 'conconconconconcon', praise: '20', comments: '30', forwarding: '40', img: '' },
        { id: 10, top: 10, headPortrait: '', name: '小小', title: '同步新空气', time: '12：00', con: 'conconconconconcon', praise: '20', comments: '30', forwarding: '40', img: '' }
      ]
    }
  },
  computed: {
    noMore() {
      return this.count >= 20
    },
    disabled() {
      return this.loading || this.noMore
    }
  },
  methods: {
    load() {
      this.loading = true
      setTimeout(() => {
        this.count += 2
        this.loading = false
      }, 2000)
    }
  }
}
</script>
<style scoped lang="scss">
  .postsRank-container{
    margin-top: 3px;
    padding: 15px 10px;
    box-shadow: 2px 1px 2px 2px #ddd;
    height: 648px !important;
    // height: calc( 100vh - 211px);
    overflow-y: scroll;
    ul{
      margin-top:10px;
      li{
        display: flex;
        border-bottom: 1px solid #ddd;
        padding: 10px;
        cursor: pointer;
        .list-content{
          padding: 0 10px;
          p{
            padding: 4px 0;
            font-size: 15px;
          }
          .list-content-head{
            img{
              width: 30px;
              height: 24px;
              border: 1px solid #ccc;
              margin-right: 10px;
            }
            a{
              color: red;
              font-size: 13px;
              padding: 0 20px;
            }
            .time{
              font-size: 11px;
              color: #999;
            }
          }
          .list-content-text{
            width: 300px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .go-hot{
            color:red;
            font-size: 11px;
          }
          .link{
            display: flex;
            p{
              padding-right: 15px;
              font-size: 13px;
            }
          }
        }
      }
    }
  }
</style>
