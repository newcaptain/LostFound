<template>
  <div class="container">
    <div class="header">
      <img :src="item.avatar" class="avatar">
      <div class="user">{{item.name}} ({{item.yibanId}})</div>
    </div>
    <div class="content">
      <div class="contentItem"><label> 物品： </label> <p> {{item.goodsName}} </p></div>
      <div class="contentItem"><label> 时间： </label><p> {{item.goodsDate}} </p></div>
      <div class="contentItem"><label> 地点： </label><p> {{item.goodsPlace}}</p></div>
      <div class="contentItem"><label> 描述： </label><p> {{item.goodsDescrip}}</p></div>
      <div class="contentItem"><label> 联系方式： </label><p> {{item.goodsPhone}}</p></div>    
    </div>
    <div class="imgShow">
      <img 
        class="previewer-img"
        v-for="(item, index) of item.imgList"
        :src="item.src"
        @click="show(index)"
      >
      <previewer
        ref="previewer"
        :list="item.imgList"
        :options="options"
        @on-index-change="logIndexChange"
      > 
      </previewer>
    </div>
    <div class="time">
      <small>{{item.postTime}} 发布</small>
    </div>
    <loading :show="showLoading"></loading>
  </div>
</template>

<script>
import { Previewer, Loading } from 'vux'
export default {
  name: 'Detail',
  components: {
    Previewer,
    Loading
  },
  methods: {
    logIndexChange (arg) {
      console.log(arg)
    },
    show (index) {
      this.$refs.previewer.show(index)
    }
  },
  data () {
    return {
      showLoading: false,
      item: {
        status: '...',
        avatar: '...',
        yibanId: '...',
        name: '...',
        goodsName: '...',
        goodsDate: '...',
        goodsPlace: '...',
        goodsDescrip: '...',
        goodsPhone: '...',
        postTime: '...',
        imgList: []
      },
      options: {
        getThumbBoundsFn (index) {
          let thumbnail = document.querySelectorAll('.previewer-img')[index]
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          let rect = thumbnail.getBoundingClientRect()
          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
        }
      }
    }
  },
  mounted: function () {
    this.showLoading = true
    this.$ajax.get('/api/detail', {
      params: {
        id: this.$route.params.id
      }
    })
      .then((res) => {
        this.showLoading = false
        if (res.data.code === 0) {
          this.item = res.data.item
          if (this.item.status === '寻物') {
            this.$emit('changeHead', 0)
          } else {
            this.$emit('changeHead', 1)
          }
        } else {
          alert('该记录不存在,请刷新重试')
        }
      })
  }
}
</script>

<style scoped>
.container {
  padding-left: 0.2rem;
  padding-bottom: 1.5rem;
  background: #fff;
}
.status {
  font-size: 2.8rem;
  color: #0099CC;
}
.header {
  display: flex;
  padding-top: .8rem;
}
.avatar {
  border-radius: 50%;
  width: 60px;
  height: 60px;
  float: left;
}
.user {
  flex: 1;
  font-size: 1rem;
  padding: 15px;
  color: #777;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.contentItem {
  display: flex;
  line-height: 2rem;
}
.contentItem>label {
  float: left;
}
.contentItem>p {
  flex: 1;
}
.imgShow {
  width: 98%;
  margin: 0 auto;
/*  display: flex;*/
/*  flex-wrap:wrap;*/
  align-items:center;
}
.previewer-img {
  width: 32%;
  max-width: 32%;
  height: 8em;
  max-height: 8em;
  margin: 0.1rem;
/*  -webkit-box-flex: 1; -webkit-flex: 1; flex:1;*/
}
.time {
  margin-top: 1.8rem;
  text-align: center;
}
</style>
