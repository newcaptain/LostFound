<template>
  <div>
    <search :auto-fixed="false" v-model="searchVal" :placeholder="'请输入物品名'" @on-change="search"></search>
    <goods-items :items="items" :del="false"></goods-items>
    <more :has-more="hasMore" :stop-active="stopActive" @clickMore="loadMore"></more>
    <toast v-model="showCancel" type="cancel" width="9rem" :time="1400">{{cancelMsg}}</toast>
  </div>
</template>

<script>
import GoodsItems from './GoodsItems'
import More from './More'
import { Search, Toast } from 'vux'

export default {
  name: 'Lost',
  components: {
    GoodsItems,
    Search,
    Toast,
    More
  },
  data () {
    return {
      hasMore: true,
      stopActive: false,
      items: [],
      showCancel: false,
      cancelMsg: '获取信息失败',
      searchVal: ''
    }
  },
  mounted: function () {
    this.$ajax.get('/api/goodsItems', {
      params: {
        type: 1,
        num: 0,
        search: ''
      }
    })
      .then((res) => {
        if (res.data.code === 0) {
          this.items = res.data.items
          if (res.data.hasMore === false) {
            this.hasMore = false
          }
          this.stopActive = true
        } else {
          this.cancelMsg = res.data.msg
          this.showCancel = true
          this.hasMore = false
        }
      })
  },
  methods: {
    loadMore: function (num) {
      // 开启动画
      this.stopActive = false
      this.$ajax.get('/api/goodsItems', {
        params: {
          type: 1,
          num: num,
          search: this.searchVal
        }
      })
        .then((res) => {
          if (res.data.code === 0) {
            res.data.items.forEach((item) => {
              this.items.push(item)
            })
            this.hasMore = res.data.hasMore
            // 关动画
            this.stopActive = true
          } else {
            this.cancelMsg = res.data.msg
            this.showCancel = true
            this.hasMore = false
          }
        }
      )
    },
    search: function () {
      this.$ajax.get('/api/goodsItems', {
        params: {
          type: 1,
          num: 0,
          search: this.searchVal
        }
      })
        .then((res) => {
          if (res.data.code === 0) {
            this.items = res.data.items
            this.hasMore = res.data.hasMore
            this.stopActive = true
          } else {
            this.cancelMsg = res.data.msg
            this.showCancel = true
            this.hasMore = false
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
