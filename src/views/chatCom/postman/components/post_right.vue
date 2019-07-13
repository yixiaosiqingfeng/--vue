<template>
  <div>
    <!-- 我我我 -->
    <rightHeader @addPost="addPost" />
    <rightList :post="post" />
  </div>
</template>
<script>
import rightHeader from './post_right_header'
import rightList from './post_right_list'

export default {
  name: 'PostRight',
  components: { rightHeader, rightList },
  data() {
    return {
      post: 1
    }
  },
  methods: {
    addPost() {
      this.post++
    }
  }

}
</script>
<style scoped>

</style>
