<template>
  <div>
    <ul>
      <li class="item" v-for="item of items" :key="item.id">
        <div class="header" >
          <span class="status">{{item.status}}</span><span class="usrId">{{item.userId}}</span> 
          <span class="postDate">
            {{item.postDate}}
            <svg class="icon" aria-hidden="true" v-if="del" @click="confirmDel(item.id)">
              <use xlink:href="#icon-chushaixuanxiang1"></use>
            </svg>
          </span>
        </div>
        <router-link :to="'/home/detail/' + item.id" tag="div" class="content">
          <div class="ig">
            <img :src="item.imgUrl"> 
          </div>
          <div class="desc">
            <p>物品: {{item.goods}}</p>
            <p>地点: {{item.place}}</p>
            <p>时间: {{item.lostTime}}</p>
          </div>    
        </router-link>
      </li>
    </ul>
    <confirm 
      v-model="showConfirm"
      @on-confirm="onConfirm"
    >
        <p style="text-align:center;">您确定要删除该记录吗？</p>
    </confirm>
    <loading :show="showLoading" text="正在删除"></loading>
    <toast v-model="showSuccess" text="删除成功" type="success"></toast>
    <toast v-model="showFailed" text="删除失败" type="cancel"></toast>
  </div>
</template>

<script>
import { Confirm, Loading, Toast } from 'vux'
export default {
  name: 'GoodsItems',
  props: ['items', 'del'],
  components: {
    Confirm,
    Loading,
    Toast
  },
  data () {
    return {
      showConfirm: false,
      deleteId: '',
      showLoading: false,
      showSuccess: false,
      showFailed: false
    }
  },
  methods: {
    confirmDel (_id) {
      this.deleteId = _id
      this.showConfirm = true
    },
    onConfirm () {
      this.showLoading = true
      this.$ajax.post('/api/deletePost', {
        id: this.deleteId
      })
        .then((res) => {
          this.showLoading = false
          if (res.data.code === 0) {
            this.showSuccess = true
            setTimeout(() => {
              window.location.reload()
            }, 500)
          } else {
            this.showFailed = true
          }
        })
    }
  }
}
</script>

<style scoped>
.item {
  /*height: 140p;*/
  display: block
}
.header {
  display: flex;
  font-size: 1rem;
  margin-top: 6px;
  padding: 0.4rem 0.6rem 0.4rem 0.6rem;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  background: #fff;
  color: #999;
}
.status {
  color: #FF9933;
  float: left;

}
.usrId {
  flex: 1;
  text-align: center;
}
.postDate {
  float: right;
}
.content {
  background: #fff;
  padding: 10px 10px 10px 10px;
  display: flex;
}
.ig {
  width: 80px;
  height: 80px;
  float: left;

}
.ig img {
  width: 100%;
  height: 100%;
}
.desc {
  margin-left: 1.1rem;
  flex: 1;
  overflow: hidden;
}
.desc p {
  overflow: hidden; 
  white-space: nowrap;
  text-overflow: ellipsis;
}

</style>
