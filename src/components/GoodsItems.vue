<template>
  <div>
    <ul>
      <li class="item" v-for="item of items" :key="item.id">
        <div class="header" >
          <span class="status">{{item.status}}</span><span class="usrId">{{item.userId}}</span>
          <span class="postDate">
            {{item.postDate}}
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
          <div>
            <div>
              <svg class="icon" aria-hidden="true" v-if="del" @click.prevent="confirmFinish(item.id)">
                <use xlink:href="#icon-wancheng"></use>
              </svg>
            </div>
              <div>
                <svg class="icon" aria-hidden="true" v-if="del" @click.prevent="confirmDelete(item.id)">
                  <use xlink:href="#icon-chushaixuanxiang1"></use>
                </svg>
              </div>
          </div>
        </router-link>
      </li>
    </ul>
    <confirm 
      v-model="showConfirm"
      @on-confirm="onConfirm"
    >
      <p style="text-align:center;">{{confirmMsg}}</p>
    </confirm>
    <loading :show="showLoading" text="正在操作"></loading>
    <toast v-model="showSuccess" :text=successMsg type="success"></toast>
    <toast v-model="showFailed" :text=failMsg type="cancel"></toast>
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
      isFinish: true, 
      showConfirm: false,
      opId: '',
      showLoading: false,
      showSuccess: false,
      showFailed: false,
      confirmMsg: '',
      successMsg: '',
      failMsg: ''
    }
  },
  methods: {
    confirmDelete (_id) {
      this.confirmMsg = '您确定要删除该记录吗？'
      this.isFinish = false
      this.opId = _id
      this.showConfirm = true
    },
    confirmFinish (_id) {
      this.confirmMsg = '您确定要更改该记录状态吗？'
      this.isFinish = true
      this.opId = _id
      this.showConfirm = true
    },
    onConfirm () {
      this.showLoading = true
      if (!this.isFinish) {
        // 点击删除按钮， 执行删除操作
        this.$ajax.post('/api/deletePost', {
          id: this.opId
        }).then((res) => {
            this.showLoading = false
            if (res.data.code === 0) {
              this.successMsg = '删除成功'
              this.showSuccess = true
              setTimeout(() => {
                window.location.reload()
              }, 500)
            } else {
              this.failMsg = '删除失败'
              this.showFailed = true
            }
          })
      } else {
        // 点击完成按钮， 执行完成操作
        this.$ajax.post('/api/finishPost', {
          id: this.opId
        }).then((res) => {
            this.showLoading = false
            if (res.data.code === 0) {
              this.successMsg = '操作成功'
              this.showSuccess = true
              setTimeout(() => {
                window.location.reload()
              }, 500)
            } else {
              this.failMsg = '操作失败'
              this.showFailed = true
            }
          })
      }
      
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
.finishBtn {
  background: #1AAD19;
  color: #fff;
  border: none;
  height: 1.5rem;
  padding: 5px 5px 5px 5px;
}
</style>
