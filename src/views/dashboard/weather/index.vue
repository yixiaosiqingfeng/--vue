<template>
  <div class="weather-container boxShadow">
    <div class="weather-con-left">
      <p />
      <span>2019-07-08 星期一 天气晴，适宜外出</span>
    </div>
    <div class="weather-con-right">
      <span class="iconfont icon-notice" />
      <p class="title-text">畅驾APP最新体验公告</p>
      <a>2019-07-08</a>
      <p class="more">更多</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Weather',
  data() {
    return {

    }
  },
  method: {
  },
  created() {

  }
}
</script>
<style scoped lang="scss">
  .weather-container{
	height: 40px;
	padding: 0 10px;
	box-sizing: border-box;
	display: flex;
	line-height: 40px;
	justify-content: space-between;
	font-size: 13px;
	color: #333;
	.weather-con-left{
		display: flex;
		p{
			width: 100px;
			border: 1px solid black;
			margin-right: 10px;
		}
	}
	.weather-con-right{
		display: flex;
		span{
			font-size: 13px;
		}
		.title-text{
			padding: 0 15px;
			color: #333;
		}
		a{
			color: #999;
			font-size: 12px;
			padding-right: 15px;
		}
		.more{
			font-size: 12px;
			cursor: pointer;
		}
	}
  }
</style>
