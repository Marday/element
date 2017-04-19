<template>
  <div class="header">
    <div class="content-wrap">
      <div class="avatar">
        <img v-if="seller.avatar"
             :src="seller.avatar"
             width="64"
             height="64"
             alt="头像">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}} / {{seller.deliveryTime}}分钟到达
        </div>
        <div class="support"
             v-if="seller.supports">
          <span class="icon"
                :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="supports" @click="showDetail">
        <span class="text"
              v-if="seller.supports">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right icon"></i>
      </div>
    </div>
    <div class="bg-image">
      <img :src="seller.avatar"
           alt="背景图"
           width="100%"
           height="100%">
    </div>
    <div class="bulletin" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <transition name="fade">
      <div class="show-detail"
          v-if="showSupport">
        <div class="detail-wrap">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <Star :size="48" :score="seller.score"/>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="name">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul class="support-list"
              v-if="seller.supports">
            <li v-for="(item, index) in seller.supports">
              <i class="icon"
                :class="classMap[item.type]"></i>
                <span class="text">{{item.description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <h2 class="name">商家公告</h2>
            <div class="line"></div>
          </div>
          <div class="bulletin-text">{{seller.bulletin}}</div>
        </div>
        <div class="close">
          <i class="icon-close" @click="hiddenDedail"></i>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import Star from '../star/star'

export default {
  data() {
    return {
      showSupport: false
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    Star
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  methods: {
    showDetail() {
      this.showSupport = true
    },
    hiddenDedail() {
      this.showSupport = false
    }
  }
}
</script>
<style lang="sass"  rel="stylesheet/sass">
@import "../../common/sass/mixin.scss";

.header{
  position: relative;
  width: 100%;
  height: 134px;
  overflow: hidden;
  font-weight: 200;
  background: rgba(7,17,27,0.5);
  color: #fff;
  .content-wrap{
    position: relative;
    display: flex;
    height: 106px;
    box-sizing: border-box;
    padding: 24px 12px 18px 24px;
    .avatar{
      border-radius: 2px;
    }
    .content{
      margin-left: 16px;
      .title{
        margin-top: 2px;
        font-size: 0;
        .brand{
          vertical-align: top;
          display: inline-block;
          width: 30px;
          height: 18px;
          @include bg-image(brand);
          background-size: 30px 18px;
        }
        .name{
          vertical-align: bottom;
          margin-left: 6px;
          font-size: 16px;
          font-weight: bold;
          line-height: 18px;
        }
      }
      .description{
        margin-top: 8px;
        font-size: 12px;
        line-height: 12px;
      }
      .support{
        margin-top: 10px;
        font-size: 0;
        .icon{
          display: inline-block;
          width: 12px;
          height: 12px;
          background-size: 12px 12px;
          vertical-align: top;
        }
        .text{
          margin-left: 4px;
          font-size: 10px;
          line-height: 14px;
        }
      }
    }
    .supports{
      position: absolute;
      right: 12px;
      bottom: 14px;
      height: 24px;
      line-height: 24px;
      border-radius: 24px;
      padding: 0 8px;
      text-align: center;
      background: rgba(0, 0, 0, 0.2);
      font-size: 0;
      .text{
        font-size: 10px;
        vertical-align: top;
      }
      .icon{
        margin-left: 2px;
        line-height: 24px;
        font-size: 10px;
      }
    }
  }
  .bg-image{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    filter: blur(10px);
    z-index: -1;
  }
  .bulletin{
    position: relative;
    height: 28px;
    padding: 0 24px 0 12px;
    background: rgba(7, 17, 27, 0.2);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 28px;
    .bulletin-title{
      display: inline-block;
      height: 100%;
      width: 22px;
      background-size: 22px 12px;
      background-position: center;
      @include bg-image(bulletin);
      vertical-align: top;
    }
    .bulletin-text{
      font-size: 10px;
      vertical-align: middle;
    }
    .icon-keyboard_arrow_right{
      font-size: 10px;
      position: absolute;
      top: 8px;
      right: 12px;
    }
  }
  .show-detail{
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: auto;
    font-size: 0;
    margin: 0;
    background: rgba(7, 17,27,0.8);
    .detail-wrap{
      box-sizing: border-box;
      padding: 64px 0 64px 0;
      min-height: 100%;
      h1.name{
        font-size: 16px;
        font-weight: 700;
        line-height: 16px;
        text-align: center;
      }
      .star-wrapper{
        margin-top: 16px;
        text-align: center;
      }
      .title{
        display: flex;
        width: 80%;
        margin: 28px auto 24px auto;
        text-align: center;
        .line{
          flex-grow: 1;
          top: -7px;
          @include border-1px(rgba(255, 255, 255, 0.2))
        }
        .name{
          font-size: 14px;
          font-weight: 700;
          padding: 0 12px;
        }
      }
      .support-list{
        margin: 0 auto;
        width: 80%;
        padding: 0 12px;
        li{
          font-size: 0;
          margin-bottom: 12px;
          .icon{
            display: inline-block;
            width: 16px;
            height: 16px;
            background-size: 100%;
            vertical-align: top;
            margin-right: 6px;
          }
          .text{
            font-size: 12px;
            line-height: 16px;
          }
        }
      }
      .bulletin-text{
        margin: 0 auto;
        width: 80%;
        padding: 0 12px;
        font-size: 12px;
        line-height: 24px;
      }
    }
    .close{
      position: relative;
      margin-top: -64px;
      height: 32px;
      text-align: center;
      font-size: 32px;
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
  .decrease{
     @include bg-image(decrease_1)
  }
  .discount{
     @include bg-image(discount_3)
  }
  .special{
    @include bg-image(special_3)
  }
  .guarantee{
    @include bg-image(guarantee_1)
   }
  .invoice{
    @include bg-image(invoice_1)
  }
}
</style>
