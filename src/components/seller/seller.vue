<template>
  <div class="seller-wrap">
    <div class="overview">
      <div class="top">
        <h2 class="title">
            {{seller.name}}
          </h2>
        <div class="des">
          <Star :size="36"
                :score="seller.score"></Star>
          <span class="score">({{seller.ratingCount}})</span>
          <span class="sellCount">月售{{seller.sellCount}}单</span>
        </div>
        <div class="favorite"
             :class="{active: favorite}"
             @click="toggleFavorite">
          <i class="icon-favorite"></i>
          <div class="text">
            {{favoriteText}}
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="block">
          <div class="text">起送价</div>
          <div class="num">{{seller.minPrice}}<span class="small">元</span></div>
        </div>
        <div class="block">
          <div class="text">商家配送</div>
          <div class="num">{{seller.deliveryPrice}}<span class="small">元</span></div>
        </div>
        <div class="block">
          <div class="text">平均配送时间</div>
          <div class="num">{{seller.deliveryTime}}<span class="small">分钟</span></div>
        </div>
      </div>
    </div>
    <division></division>
    <div class="bulletin">
      <h2 class="title">公告与活动</h2>
      <p class="text">{{seller.bulletin}}</p>
      <ul class="supports">
        <li class="support-item"
            v-for="item in seller.supports"
            v-if="seller.supports">
          <span :class="classMap[item.type]"
                class="icon"></span>{{item.description}}
        </li>
      </ul>
    </div>
    <division></division>
    <div class="pic">
      <h2 class="title">商家实景</h2>
      <div class="seller-pic">
        <ul class="pic-wrap">
          <li class="item"
              v-for="item in seller.pics"
              v-if="seller.pics">
            <img :src="item">
          </li>
        </ul>
      </div>
    </div>
    <division></division>
    <div class="seller-info">
      <h2 class="title">商家信息</h2>
      <ul class="info">
        <li class="info-item"
            v-for="item in seller.infos"
            v-if="seller.infos">
          {{item}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Star from '../star/star'
import division from '../division/division'
import { saveLocal, loadLocal } from '../../common/js/store'
export default {
  data() {
    return {
      favorite: (() => {
        return loadLocal(this.seller.id, 'favorite', false)
      })()
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  methods: {
    toggleFavorite() {
      this.favorite = !this.favorite
      saveLocal(this.seller.id, 'favorite', this.favorite)
    }
  },
  computed: {
    favoriteText() {
      if (this.favorite) {
        return '已收藏'
      } else {
        return '收藏'
      }
    }
  },
  components: {
    Star,
    division
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  }
}
</script>
<style lang="sass">
@import "../../common/sass/mixin.scss";

.seller-wrap{
  .title{
    font-size: 14px;
    color: rgb(7,17,27);
    line-height: 14px;
    margin-bottom: 8px;
  }
  .overview{
    padding: 18px;
    .top{
      padding-bottom: 18px;
      @include border-1px(rgba(7,17,27,0.1));
      .des{
        position: relative;
        color: rgb(77,85,93);
        font-size: 0;
        .star{
          display: inline-block;
        }
        .score, .sellCount{
          display: inline-block;
          vertical-align: top;
          font-size: 10px;
        }
        .score{
          margin-left: 8px;
          margin-right: 12px;
        }
      }
      .favorite{
        position: absolute;
        right: 0;
        top: 0;
        width: 44px;
        text-align: center;
        color: #d4d6d9;
        .icon-favorite{
          font-size: 24px;
        }
        &.active{
          color: red;
        }
        .text{
          margin-top: 4px;
          font-size: 10px;
          line-height: 10px;
          color: rgb(77,89,93);
        }
      }
    }
    .bottom{
      display: flex;
      padding-top: 18px;
      .block{
        flex: 1;
        text-align: center;
        .text{
          font-size: 10px;
          color: rgb(147,153,159);
          margin-bottom: 4px;
        }
        .num{
          font-size: 24px;
          font-weight: 200;
          .small{
            font-size: 10px;
          }
        }
      }
    }
  }
  .bulletin{
    padding: 18px;
    .text{
      padding: 0 12px;
      font-size: 12px;
      color: rgb(240,20,20);
      line-height: 24px;
    }
    .supports{
      .support-item{
        padding: 16px 12px;
        font-size:12px;
        color: rgb(7,17,27);
        line-height: 16px;
        @include border-top-1px(rgba(7,17,27,0.1));
        .icon{
          display: inline-block;
          margin-right: 6px;
          height: 16px;
          width: 16px;
          background-size: 100%;
          vertical-align: top;
        }
        .decrease{
          @include bg-image(decrease_4)
        }
        .discount{
          @include bg-image(discount_4)
        }
        .special{
          @include bg-image(special_4)
        }
        .guarantee{
          @include bg-image(guarantee_4)
        }
        .invoice{
          @include bg-image(invoice_4)
        }
      }
    }
  }
  .pic{
    padding: 18px;
    font-size: 0;
    .title{
      margin-bottom: 12px;
    }
    .seller-pic{
      overflow: auto;
      height: 90px;
      width: 100%;
      &::-webkit-scrollbar{
        width: 0;
        height: 0;
      }
      .pic-wrap{
        white-space: nowrap;
        height: 90px;
        .item{
          display: inline-block;
          height: 90px;
          width: 120px;
          margin-right: 6px;
          &:last-child{
            margin-right: 0;
          }
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .seller-info{
    padding: 18px;
    .info{
      .info-item{
        padding: 16px 12px;
        font-size:12px;
        color: rgb(7,17,27);
        line-height: 16px;
         @include border-top-1px(rgba(7,17,27,0.1));
      }
    }
  }
}
</style>
