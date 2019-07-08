<template>
  <div class="showStatistics-container">
    <div class="show-con-title">
      <h5>节目统计</h5>
      <p>
        <span>更新时间：2019-06-15  12：00</span>
        <a>刷新</a>
      </p>
    </div>
    <div class="show-con-progress" />
    <div class="show-con-date">
      <div class="times">
        <span>昨日</span>
        <span class="border">本周</span>
        <span>本月</span>
      </div>
      <div class="date">
        <p>
          <span>6月17日</span>
        </p>
        <span> - </span>
        <p>
          <span>6月17日</span>
        </p>
      </div>
      <P class="search">搜索</P>
    </div>
    <div class="show-con-list">
      <ul>
        <li v-for="item in dataList" :key="item.id">
          <h2>{{ item.num }}</h2>
          <span>{{ item.title }}</span>
          <p>
            <span>环比昨日  {{ item.score }}</span>
            <i />
          </p>
        </li>
      </ul>
      <div class="enter-icon">
        <p> > </p>
      </div>
    </div>
    <div class="show-con-new">
      <ul>
        <li v-for="item in hotToptic" :key="item.id">
          <span>{{ item.top }}</span>
          <p class="showname">#{{ item.name }}</p>
          <p>
            <i />
            <a>热度值</a>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ShowStatistics',
  data() {
    return {
      dataList: [
        { id: 1, title: '用户总数', num: 1200, score: '2%' }, { id: 2, title: '用户总数', num: 1200, score: '2%' },
        { id: 3, title: '用户总数', num: 1200, score: '2%' }, { id: 4, title: '用户总数', num: 1200, score: '2%' }
      ],
      hotToptic: [
        { id: 1, top: 'TOP1', name: '节目名称', hotValue: 200 }, { id: 2, top: 'TOP2', name: '节目名称', hotValue: 200 }, { id: 3, top: 'TOP3', name: '节目名称', hotValue: 200 },
        { id: 4, top: 'TOP4', name: '节目名称', hotValue: 200 }, { id: 5, top: 'TOP5', name: '节目名称', hotValue: 200 }, { id: 6, top: 'TOP6', name: '节目名称', hotValue: 200 }
      ]
    }
  }
}
</script>
<style scoped lang="scss">
  .showStatistics-container{
    padding: 15px 10px;
    box-shadow: 2px 2px 2px 2px #ddd;
    .show-con-title{
      display: flex;
      justify-content: space-between;
      p{
        span{
          color: #999;
          font-size: 12px;
          padding-right: 20px;
        }
        a{
          font-size: 13px;
        }
      }
    }
    .show-con-progress{
      height: 30px;
      border: 1px solid red;
      margin: 10px 20px;
    }
    .show-con-date{
      display: flex;
      align-items: center;
      margin: 15px 20px;
      font-size: 10px;
      .times{
        display: flex;
        border: 1px solid #ccc;
        span{
          padding: 3px 6px;
        }
        .border{
          border-left:1px solid #ccc;
          border-right:1px solid #ccc;
        }
      }
      .date{
        display: flex;
        margin: 0 25px;
        align-items: center;
        p{
          border: 1px solid #ccc;
          padding: 2px 4px;
        }
        span{
          margin: 0 5px;
        }
      }
      .search{
        background: skyblue;
        color: #fff;
        padding: 3px 10px;
      }
    }
    .show-con-list{
      display: flex;
      margin: 10px 15px;
      ul{
        width: 95%;
        padding: 10px 0;
        display: flex;
        li{
          width: 25%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 12px;
          color: #666;
          line-height: 21px;
          h2{
            color: #222;
          }
          p{
            display: flex;
            i{
              display: inline-block;
              width: 20px;
              height: 20px;
              border: 1px solid #ccc;
            }
          }
        }
      }
      .enter-icon{
        width: 5%;
        display: flex;
        justify-content: center;
        align-items: center;
        p{
            width: 22px;
            height: 22px;
            border: 1px solid #ddd;
            border-radius: 50%;
            text-align: center;
            line-height: 22px;
            box-shadow: 1px 1px 1px #ddd;
        }
      }
    }
    .show-con-new{
      margin: 15px 20px;
      ul{
        display: flex;
        flex-wrap: wrap;
        li{
          width: 40%;
          display: flex;
          align-items: center;
          font-size: 10px;
          color: #333;
          margin: 10px 15px 10px 0;
          span{
            background: red;
            color: #fff;
            border: 1px solid red;
            border-radius: 5px;
            padding: 1px 5px;
          }
          .showname{
            margin: 0 40px 0 10px;
          }
          p{
            display: flex;
            align-items: center;
            i{
              display: inline-block;
              width: 16px;
              height: 16px;
              border:1px solid #ddd;
            }
            a{
              padding: 2px 5px;
            }
          }
        }
      }
    }
  }
</style>
