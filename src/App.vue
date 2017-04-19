<template>
  <div id="app">
    <vueheader :seller="seller"></vueheader>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Vueheader from './components/VueHeader/VueHeader.vue'
export default {
  data() {
    return {
      seller: {}
    }
  },
  created() {
    const ERR_NO = 0
    this.$http.get('/api/seller').then((res) => {
      if (res.body.errno === ERR_NO) {
        this.seller = res.body.data
        console.log(this.seller)
      }
    })
  },
  components: {
    Vueheader
  }
}
</script>

<style lang="sass">
@import "./common/sass/mixin.scss";

#app {
  .router-link-active {
    color: rgb(240, 20, 20);
  }
  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    .tab-item{
      flex:1;
      font-size: 14px;
      color: rgb(77, 85, 93);
      @include border-1px(rgba(7, 17, 27, 0.1));
    }
  }
}



</style>
