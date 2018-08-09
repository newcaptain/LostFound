<template>
  <div id="app">
    <view-box :body-padding-top="'46px'">
      <x-header :title="currentTitle" :left-options="leftOptions" slot="header" id="xheader"></x-header>
      
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>

      <my-tabbar slot="bottom"></my-tabbar>
    </view-box>
  </div>
</template>

<script>
import { XHeader, ViewBox } from 'vux'
import MyTabbar from './components/MyTabbar'
export default {
  name: 'app',
  components: {
    ViewBox,
    XHeader,
    MyTabbar
  },
  data: () => {
    return {
      // currentTitle: '寻物启示',
      leftOptions: {
        backText: ''
      }
    }
  },
  watch: {

  },
  computed: {
    currentTitle () {
      if (this.$route.path === '/home/lost') return '寻物启事'
      if (this.$route.path === '/home/found') return '失物招领'
      if (this.$route.path.indexOf('/home/detail') !== -1) return '物品详情'
      if (this.$route.path.indexOf('/home/mypost') !== -1) return '我的发布'
      if (this.$route.path === '/home/user') return '个人中心'
      if (this.$route.path.indexOf('/home/post') !== -1) return '发布信息'
    }
  },
  methods: {
    // handleSwitch: function (val) {
    //   if (val === 0) {
    //     this.$router.push('/home/lost')
    //     this.currentTitle = '寻物启事'
    //   } else if (val === 1) {
    //     this.$router.push('/home/found')
    //     this.currentTitle = '失物招领'
    //   } else {
    //     this.$router.push('/home/user')
    //     this.currentTitle = '个人中心'
    //   }
    // }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
body {
  background-color: #eee;
}
html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
#app {
  height: 100%;
}
#xheader {
  width:100%;
  position:absolute;
  left:0;
  top:0;
  z-index:100;
}
</style>
<style >
.icon {
   width: 1em; height: 1em;
   vertical-align: -0.15em;
   fill: currentColor;
   overflow: hidden;
}
</style>
