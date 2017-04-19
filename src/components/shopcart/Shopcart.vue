<template>
  <div>
    <div class="shopcart-wrap"
         @click.stop="_show">
      <div class="content-left">
        <div class="icon-wrap">
          <div class="icon"
               :class="!!totalCount? 'highlight':''">
            <i class="icon-shopping_cart"></i>
          </div>
          <div class="count"
               v-show="!!totalCount">{{totalCount}}</div>
        </div>
        <div class="totalPrice"
             :class="!!totalCount? 'highlight':''">
          ￥{{totalprice}}
        </div>
        <div class="deliveryPrice">
          另需配送费￥{{deliveryPrice}}元
        </div>
      </div>
      <div class="content-right"
           :class="payClass">
        {{pay}}
      </div>
      <transition name="showList">
        <div class="shopcart-list"
             v-show="show">
          <div class="shopcart-list-header">
            <div class="name">购物车</div>
            <div class="clearAll"
                 @click.stop="_clear">清空</div>
          </div>
          <ul class="shopcart-list-content">
            <li class="selected-food"
                v-for="food in selectedFoods">
              <div class="name">{{food.name}}</div>
              <div class="price"><span>￥</span>{{food.price * food.count}}</div>
              <Cartcontrol :food="food"
                           :ballDrop="false"></Cartcontrol>
            </li>
          </ul>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="shopcart-list-mask"
           v-show="shopcartList && totalCount>0"
           @click.stop="listHidden"></div>
    </transition>
  </div>
</template>
<script>
import Cartcontrol from '../Cartcontrol/Cartcontrol'

export default {
  data() {
    return {
      shopcartList: false
    }
  },
  props: {
    deliveryPrice: {
      type: Number
    },
    minPrice: {
      type: Number,
      default: 0
    },
    selectedFoods: {
      type: Array
    }
  },
  computed: {
    show() {
      if (this.totalCount === 0) {
        this.shopcartList = false
      }
      return (this.shopcartList && !!this.totalCount)
    },
    totalprice() {
      let total = 0
      this.selectedFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    totalCount() {
      let total = 0
      this.selectedFoods.forEach((food) => {
        total += food.count
      })
      return total
    },
    pay() {
      let des = '去结算'
      if (this.totalprice >= 20) {
        return des
      } else if (this.totalCount > 0) {
        des = `还差￥${(20 - this.totalprice)}配送`
        return des
      } else {
        des = `￥${this.minPrice}元起送`
        return des
      }
    },
    payClass() {
      if (this.totalprice >= 20) {
        return 'highlight'
      } else {
        return ''
      }
    }
  },
  methods: {
    _show() {
      this.shopcartList = true
    },
    listHidden() {
      this.shopcartList = false
    },
    _clear() {
      this.selectedFoods.forEach((food) => {
        food.count = 0
        this.shopcartList = false
      })
    }
  },
  components: {
    Cartcontrol
  }
}
</script>
<style lang="sass" rel="stylesheet/sass">
@import "../../common/sass/mixin.scss";

.shopcart-wrap{
  position: fixed;
  display: flex;
  left: 0;
  bottom: 0;
  z-index: 15;
  width: 100%;
  height: 48px;
  .content-left{
    flex: 1;
    background: #141d27;
    color: rgba(255, 255, 255, 0.4);
    font-size: 0;
    .icon-wrap{
      box-sizing: border-box;
      display: inline-block;
      position: relative;
      top: -10px;
      margin: 0 12px;
      height: 56px;
      width: 56px;
      padding: 6px;
      vertical-align: top;
      border-radius: 50%;
      background: #141d27;
      .icon{
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: #2b343c;
        text-align: center;
        .icon-shopping_cart{
          font-size: 24px;
          line-height: 44px;
          color: rgba(255, 255, 255, 0.4);
        }
        &.highlight{
          background-color: #00a0dc;
          .icon-shopping_cart{
            color: #fff;
          }
        }
      }
      .count{
        position: absolute;
        right: 0;
        top: 0;
        width:24px;
        height: 16px;
        line-height: 16px;
        font-size: 9px;
        font-weight: 700;
        text-align: center;
        background-color: #f01414;
        color: #fff;
        border-radius: 16px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
      }
    }
    .totalPrice{
      display: inline-block;
      margin: 12px 0;
      font-size: 16px;
      font-weight: 700;
      line-height: 24px;
      padding-right: 12px;
      @include border-right-1px(rgba(255,255,255,0.1));
      &.highlight{
        color: #fff;
      }
    }
    .deliveryPrice{
      display: inline-block;
      font-size: 10px;
      line-height: 48px;
      padding-left: 12px;
      vertical-align: top;
    }
  }
  .content-right{
    width: 105px;
    text-align: center;
    background: #2b333b;
    line-height: 48px;
    font-size: 12px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.4);
    &.highlight{
      background-color: #00b43c;
      color: #fff;
    }
  }
  .shopcart-list{
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-100%);
    z-index: -1;
    width: 100%;
    background-color: #fff;
    &.showList-enter-active, &.showList-leave-active  {
      transition: all 0.5s;
    }
    &.showList-enter, &.showList-leave-active {
      transform: translateY(0);
    }
    .shopcart-list-header{
      height: 40px;
      padding: 0 18px;
      background-color: #f3f5f7;
      .name{
        display: inline-block;
        font-size: 14px;
        color: rgb(7, 17, 27);
        line-height: 40px;
      }
      .clearAll{
        float: right;
        font-size: 12px;
        color: rgb(0, 160, 220);
        line-height: 40px;
      }
    }
    .shopcart-list-content{
      padding: 0 18px;
      max-height: 257px;
      overflow: auto;
      .selected-food{
        display: flex;
        height: 48px;
        align-items: center;
        @include border-1px(rgba(7, 17, 27, 0.1));
        .name{
          flex: 1;
        }
        .price{
          margin-right: 12px;
          font-size: 14px;
          color: rgb(240, 20, 20);
          font-weight: 700;
          span{
            font-size: 10px;
            font-weight: normal;
          }
        }
      }
    }
  }
}
.shopcart-list-mask{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 12;
  background: rgba(7, 17, 27, 0.6);
  backdrop-filter: blur(10px);
  opacity: 1;
  &.fade-enter-active, &.fade-leave-active{
    transition: all 0.5s;
  }
  &.fade-enter, &.fade-leave-active{
    opacity: 0;
  }
}
</style>
