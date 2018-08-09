<template>
  <tabbar v-model="index">
    <tabbar-item>
      <svg class="icon" aria-hidden="true" slot="icon">
    　　<use xlink:href="#icon-xunwuqishiweixuanzhong"></use>
  　　</svg>
      <span slot="label">寻物启示</span>
    </tabbar-item>
    <tabbar-item>
      <svg class="icon" aria-hidden="true" slot="icon">
    　　<use xlink:href="#icon-xingzhuang9kaobei"></use>
  　　</svg>
      <span slot="label">失物招领</span>
    </tabbar-item>
    <tabbar-item>
      <svg class="icon" aria-hidden="true" slot="icon">
    　　<use xlink:href="#icon-jingjirenjinglikehuxianxingcopy"></use>
  　　</svg>
      <span slot="label">个人中心</span>
    </tabbar-item>
  </tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'

export default {
  name: 'MyTabbar',
  components: {
    Tabbar,
    TabbarItem
  },
  data: function () {
    return {
      index: null
    }
  },
  created: function () {
    if (this.$route.path === '/home/lost') {
      this.index = 0
    } else if (this.$route.path === '/home/found') {
      this.index = 1
    } else if (this.$route.path === '/home/user') {
      this.index = 2
    } else {
      this.index = Number(sessionStorage.getItem('index'))
    }
    sessionStorage.setItem('index', this.index)
  },
  watch: {
    $route: function (to, from) {
      if (to.path === '/home/lost') {
        this.index = 0
      } else if (to.path === '/home/found') {
        this.index = 1
      } else if (to.path === '/home/user') {
        this.index = 2
      }
      sessionStorage.setItem('index', this.index)
    },
    index: function (val, old) {
      if (old === null) {
        return
      }
      if (val === 0 && this.$route.path !== '/home/lost') {
        this.$router.push('/home/lost')
      } else if (val === 1 && this.$route.path !== '/home/found') {
        this.$router.push('/home/found')
      } else if (val === 2 && this.$route.path !== '/home/user') {
        this.$router.push('/home/user')
      }
      sessionStorage.setItem('index', this.index)
    }
  }
}
</script>

<style scoped>
.icon {
  width: 1em; height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.weui-tabbar__item {
  font-size: 1.15em;
}

</style>
