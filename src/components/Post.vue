<template>
  <div>
    <!-- <group>
      <checklist
        :options="[{key:'1',value:'我捡到东西了'},{key:'2',value:'我丢东西了'} ]"
        :min="1"
        :max="1"
        v-model="status"
      >
      </checklist>
    </group> -->
    <group>
      <x-input title="物品:" placeholder="请输入物品名称" v-model="goodsName"></x-input>
      <datetime title="日期:&nbsp;&nbsp;&nbsp;&nbsp;" v-model="date" value-text-align="left" placeholder="您丢失或捡到物品的日期" format="YYYY-MM-DD"></datetime>
      <x-input title="地点:" placeholder="请输入丢失或捡到的地点" v-model="place"></x-input>
      <x-input title="联系电话:" placeholder="请输入联系电话" v-model="phone"></x-input>
    </group>
    <group>
      <x-textarea title="描述:" v-model="description"></x-textarea>
    </group>

    <vue-core-image-upload
      class="imgupload"
      :crop="false"
      text="选择图片"
      @imageuploaded="imageuploaded"
      @imageuploading="imageuploading"
      @errorhandle="errorhandle"
      :max-file-size="3145728"
      :multiple="true"
      :multiple-size="9"
      url="/api/uploadImg" >
    </vue-core-image-upload>
    <div class="previewImg">
      <img :src="item" v-for="item of picture">
    </div>

    <div class="btn" @click="formSubmit">
      <x-button type="primary" >点击提交</x-button>
    </div>
    
    <!-- <div v-transfer-dom> -->
    <loading :show="showLoading" text="正在提交"></loading>
    <loading :show="showUpload" text="正在上传"></loading>

    <!-- <div v-transfer-dom> -->
    <toast v-model="showWarn" type="warn" width="9rem" :time="1200">{{warnMsg}}</toast>
    <toast v-model="showSuccess" type="success" width="9rem" :time="1800">提交成功</toast>
    <toast v-model="showCancel" type="cancel" width="9rem" :time="1800">提交失败<p>请联系工作人员</p></toast>
    <toast v-model="showErr" type="cancel" width="12rem" :time="1600">{{errMsg}}<p>请重试</p></toast>
<!--       <alert v-model="showAlert" title="提示" hide-on-blur="true"> 表单内容不能有空 </alert> -->
<!--     </div> -->
  </div>
</template>

<script>
import { XInput, Group, Datetime, XTextarea, XButton, Alert, Loading, Toast } from 'vux'
import VueCoreImageUpload from 'vue-core-image-upload'
export default {
  name: 'Post',
  components: {
    // Checklist,
    XInput,
    Group,
    Datetime,
    XTextarea,
    XButton,
    Alert,
    Loading,
    Toast,
    'vue-core-image-upload': VueCoreImageUpload
  },
  props: ['type'],
  data: function () {
    return {
      // status: [],
      goodsName: '',
      date: '',
      place: '',
      phone: '',
      description: '',
      picture: [],
      warnMsg: '',
      showWarn: false,
      showLoading: false,
      showSuccess: false,
      showCancel: false,
      showUpload: false,
      showErr: false,
      errMsg: ''
    }
  },
  methods: {
    formSubmit () {
      // 判空
      if (!this.goodsName || !this.date || !this.place || !this.phone || !this.description) {
        this.warnMsg = '表单内容不能有空'
        this.showWarn = true
        return
      }
      // 表单验证
      if (this.description.length > 50) {
        this.warnMsg = '描述内容不能超过50个字'
        this.showWarn = true
        return
      }
      if (this.goodsName.length > 10) {
        this.warnMsg = '物品名不能超过10个字'
        this.showWarn = true
        return
      }
      if (this.place.length > 10) {
        this.warnMsg = '地点不能超过10个字'
        this.showWarn = true
        return
      }
      if (!(/^1[0-9]{10}$/.test(this.phone))) {
        this.warnMsg = '请输入正确的手机号'
        this.showWarn = true
        return
      }
      // 加动画
      this.showLoading = true
      // 提交表单
      this.$ajax.post('/api/form', {
        status: this.type === 'lost' ? 1 : 2,
        goodsName: this.goodsName,
        date: this.date,
        place: this.place,
        phone: this.phone,
        description: this.description,
        picture: this.picture
      }).then((res) => {
        this.showLoading = false
        if (res.data.code === 0) {
          // 表单上传成功
          this.showSuccess = true
          setTimeout(() => {
            location.reload()
          }, 1600)
        } else {
          this.showCancel = true
        }
      })
    },
    imageuploaded (res) {
      this.showUpload = false
      if (res.code === 0) {
        this.picture = res.picture
      }
    },
    imageuploading () {
      this.showUpload = true
    },
    errorhandle (e) {
      if (e === 'access_denied') {
        this.errMsg = '服务端拒绝访问'
      } else {
        this.errMsg = '图片最大不能超过3MB'
      }
      this.showErr = true
    }
  }

}
</script>

<style scoped>
.previewImg {
  width:95%;
  display: flex;
  flex-wrap:wrap;
  margin: 15px auto;
}
.previewImg>img{
  width:31%;
  height: 7rem;
  margin-top: 5px;
  margin-left: 5px;
}
.imgupload {
  width:120px;
  height: 40px;
  background: #0099CC;
  color: #fff;
  text-align: center;
  line-height: 40px;
  margin-left: 10px;
  margin-top: 10px;
  border-radius: 5px;
}
.btn {
  margin:25px auto;
  width: 95%;
}
.weui-cell__ft {
  text-align: left;
}
.vux-cell-value {
  color: #000 !import;
}
</style>
<style lang="less" scoped>
/deep/ .vux-cell-value {
    color: #000;
  }
</style>
