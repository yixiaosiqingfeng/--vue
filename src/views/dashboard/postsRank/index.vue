<template>
  <div class="postsRank-container boxShadow">
    <p class="ft18 fw">帖子排名</p>
    <div class="infinite-list-wrapper">
      <ul>
        <li v-for="item in postRankData" :key="item.id" class="infinite-list-item">
          <h4>{{ item.top }}</h4>
          <div class="list-content">
            <div class="list-content-head lis">
              <img v-if="item.imgUrl" :src="item.imgUrl" :alt="item.createName">
              <img v-else src="@/assets/index_images/default_user.jpg" alt="">
              <span class="createName">{{ item.createName }}</span>
              <a v-if="item.programName">{{ item.programName }}yes</a>
              <a v-if="!item.programName">no</a>
              <span class="time">{{ item.createDate }}</span>
            </div>
            <div class="list-content-text lis">
              <span v-if="item.content" v-html="item.content">{{ item.content }}</span>
              <span v-else />
            </div>
            <div v-if="item.topicName" class="go-hot lis">#{{ item.topicName }}</div>
            <div v-else class="go-hot lis">#我要上热门</div>
            <div class="link">
              <p>[
                <span>赞</span>
                <a>{{ item.goodClickCount }}</a>
                ]
              </p>
              <p>
                [<span>评论</span>
                <a>{{ item.replyTotal }}</a>]
              </p>
              <p>
                [<span>分享</span>
                <a>{{ item.shareCount }}</a>]
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import {
//   todayPopular
// } from '@/api/index'

export default {
  name: 'PostsRank',
  data() {
    return {
      count: 10,
      loading: false,
      postRankData: []
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
  created() {
    this.getTodayPopular()
  },
  methods: {
    load() {
      this.loading = true
      setTimeout(() => {
        this.count += 2
        this.loading = false
      }, 2000)
    },
    getTodayPopular() {
      const todayPopularParam = {
        code: '1808',
        data: {}
      }
      axios
        .post('http://192.168.0.18:3366/community_auth/select_forum_top10_v1', todayPopularParam)
        .then(res => {
          if (res.data.success && res.data.errorCode === 0) {
            this.postRankData = res.data.data
          } else {
            this.$message.error(res.data.msg)
          }
        })
    }
  }
}
</script>
<style scoped lang="scss">
  .postsRank-container{
    margin-top: 3px;
    padding: 15px 10px;
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
          .lis{
            padding: 4px 0;
            font-size: 15px;
            margin-bottom: 5px;
          }
          .list-content-head{
            display: flex;
            align-items: center;
            .createName{
              font-weight: bold;
              color: #333;
            }
            img{
              width: 22px;
              height: 22px;
              border: 1px solid #ccc;
              margin-right: 10px;
              border-radius: 50%;
            }
            a{
              color: red;
              font-size: 13px;
              padding: 0 20px;
            }
            .time{
              font-size: 10px;
              color: #999;
            }
          }
          .list-content-text{
            width: 300px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 12px;
            color: #333;
          }
          .go-hot{
            color:red;
            font-size: 10px;
          }
          .link{
            display: flex;
            color: #555;
            p{
              padding-right: 15px;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
</style>
