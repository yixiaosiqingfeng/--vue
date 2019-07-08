<template>
  <div class="weather-container">
    <div class="weather-con-left">
      <p />
      <span>2019-07-08 星期一 天气晴，适宜外出</span>
    </div>
    <div class="weather-con-right">
      <i />
      <span>畅驾APP最新体验公告</span>
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
	box-shadow: 2px 1px 2px 2px #ddd;
	padding: 13px 10px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 13px;
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
		i{
			display: inline-block;
			width: 20px;
			border: 1px solid #ccc;
		}
		span{
			padding: 0 15px;
		}
		a{
			color: #999;
			font-size: 12px;
			padding-right: 15px;
		}
		.more{
			font-size: 12px;
		}
	}
  }
</style>
