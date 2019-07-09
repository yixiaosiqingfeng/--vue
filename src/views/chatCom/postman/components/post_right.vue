<template>
  <div>
    <rightHeader />
    <rightList />
  </div>
</template>
<script>
import rightHeader from './post_right_header'
import rightList from './post_right_list'

export default {
  name: 'PostRight',
  components: { rightHeader, rightList }

}
</script>
<style scoped>

</style>
