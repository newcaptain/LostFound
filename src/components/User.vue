<template>
  <div class="container">
    <div class="avatar">
      <img :src="avatar">
    </div>
    <div class="user">
      {{name}}
      <p><small>{{id}}</small></p>
    </div>
    <div class="btn">
      <x-button :gradients="['#6F1BFE', '#9479DF']" :link="'/home/mypost/lost'">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-wodefabu"></use>
        </svg>
        我丢东西了
      </x-button>
      <x-button :gradients="['#FF5E3A', '#FF9500']" :link="'/home/mypost/found'">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-public"></use>
        </svg>
        我捡东西了
      </x-button>
      <x-button :gradients="['#1D62F0', '#19D5FD']" @click.native="download">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-daochu"></use>
        </svg>
        导出信息
      </x-button>      
    </div>
    
    <footer>
      <small>易班学生工作站提供技术支持</small>
    </footer>

    <toast v-model="showCancel" type="cancel" width="9rem" :time="1800">获取用户信息失败<p>请重新登陆</p></toast>
  </div>
</template>

<script>
import { XButton, Toast } from 'vux'
export default {
  name: 'User',
  components: {
    XButton,
    Toast
  },
  data () {
    return {
      name: '...',
      id: '...',
      avatar: require('../assets/avatar.png'),
      showCancel: false
    }
  },
  mounted: function () {
    this.$ajax.get('/api/userInfo')
      .then((res) => {
        if (res.data.code === 0) {
          this.name = res.data.name
          this.id = res.data.id
          this.avatar = res.data.avatar
        } else {
          this.showCancel = true
        }
      })
  },
  methods: {
    download () {
      window.location.href = '/api/export'
    }
  }
}
</script>

<style scoped>

.btn {
  width: 96%;
  margin: 0 auto;
  color:#fff;
}
.avatar>img {
  display: block;
  margin: 2rem auto;
  margin-bottom: 1rem;
  border-radius: 50%;
  width: 128px;
  height: 128px;
}
.user {
  margin: 1.15rem auto;
  text-align: center;
}
footer {
  margin: 5rem 0 1rem 0;
  text-align: center;
}

</style>
