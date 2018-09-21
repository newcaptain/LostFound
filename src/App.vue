<template>
  <div id="app">
    <view-box :body-padding-top="'46px'">
      <x-header :title="thisTt" :left-options="leftOptions" slot="header" id="xheader"></x-header>
      
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <!-- <router-view v-if="!$route.meta.keepAlive"></router-view> -->

      <!-- <my-tabbar slot="bottom"></my-tabbar> -->
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
    XHeader
  },
  data: () => {
    return {
      // currentTitle: '寻物启示',
      leftOptions: {
        backText: ''
      },
      thisTt: ""
    }
  },
  watch: {
    '$route' (to,from) {
      if (to.path.indexOf('/home/detail') !== -1) this.thisTt = '招领详情'
      if (to.path === '/') this.thisTt = '失物招领'
    }
  },
  mounted: function() {
    if (this.$route.path.indexOf('/home/detail') !== -1) this.thisTt = '招领详情'
    if (this.$route.path === '/') this.thisTt = '失物招领'
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #eee;
  border: 1px double #aaa;
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
<style lang="less">
.icon {
   width: 1em; height: 1em;
   vertical-align: -0.15em;
   fill: currentColor;
   overflow: hidden;
}
@media screen and (min-width: 785px) {
  body {
    width: 43%;
    margin:0 auto;
  }
}
</style>
