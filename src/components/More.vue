<template>
  <div>
    <div @click="loadMore" v-show="stopActive && hasMore">
      <divider>点击加载更多</divider>
    </div>
    <load-more :tip="('正在加载')" v-show="!stopActive && hasMore"></load-more>
    <divider v-if="!hasMore">没有更多了</divider>
  </div>
</template>

<script>
import { LoadMore, Divider } from 'vux'
export default {
  name: 'More',
  props: ['hasMore', 'stopActive'],
  components: {
    Divider,
    LoadMore
  },
  data () {
    return {
      num: 0
    }
  },
  methods: {
    loadMore: function () {
      this.num ++
      this.$emit('clickMore', this.num)
    }
  }
}
</script>

<style scoped>

</style>
