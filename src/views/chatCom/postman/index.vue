<template>
  <div>
    <div style="display:flex">
      <div class="index_right">
        <postRight />
      </div>
      <div class="index_left">
        <postLeft />
      </div>
    </div>
  </div>
</template>

<script>
import postRight from './components/post_right'
import postLeft from './components/post_left'
export default {
  name: 'Index',
  components: { postRight, postLeft }
}
</script>

<style scoped>
.index_right {
  width: 75%;
  margin: 5px;
}
.index_left {
  width: 25%;
  margin: 5px;
}
</style>
