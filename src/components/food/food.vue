<template>
  <transition name="food-detail">
    <div class="food-detail-wrap"
         v-show="showFood.show"
         v-if="selectFood.name">
      <div class="pictrue">
        <img :src="selectFood.image"
             width="100%"
             height="375">
        <div class="back" @click.stop="back">
          <i class="icon-arrow_lift"></i>
        </div>
      </div>
      <div class="content">
        <h2 class="title">{{selectFood.name}}</h2>
        <div class="detail">
          <span class="sell-count">
                        月售{{selectFood.sellCount}}
                      </span>
          <span class="rate">
                        好评率{{selectFood.rating}}%
                      </span>
        </div>
        <div class="price">
          <span class="now"><span class="symbol">￥</span>{{selectFood.price}}</span><span class="old"
                v-if="selectFood.oldPrice"><span class="symbol">￥</span>{{selectFood.oldPrice}}</span>
        </div>
        <div class="cartcontrol-wrap">
          <Cartcontrol :food="selectFood"
                       :ballDrop="true" ref="cartcontrol">
          </Cartcontrol>
        </div>
        <transition>
          <div class="buy-this"
               v-show="buy" @click.stop="add">
            加入购物车
          </div>
        </transition>
      </div>
      <division v-if="selectFood.info"></division>
      <div class="food-info"
           v-if="selectFood.info">
        <h2 class="title">商品介绍</h2>
        <div class="info">
          {{selectFood.info}}
        </div>
      </div>
      <division></division>
      <div class="comment-wrap">
        <h2 class="title">商品评价</h2>
        <commentselect :comment="comment" :commentType="commentType" :text="text"></commentselect>
      </div>
      <ul class="comment">
        <li class="comment-item"
            v-for="(rating, index) in showText">
          <p class="time">{{rating.rateTime | time}}</p>
          <p class="text"><span :class="{'icon-thumb_up': rating.rateType===0,'icon-thumb_down': rating.rateType===1}"></span>{{rating.text}}</p>
          <div class="userinfo">
            <span class="username">{{rating.username}}</span>
            <img :src="rating.avatar"
                 class="avatar">
          </div>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
import Cartcontrol from '../Cartcontrol/Cartcontrol'
import division from '../division/division'
import commentselect from '../commentselect/commentselect'
import { formatDate } from '../../common/js/formatDate'
export default {
  data() {
    return {
      commentType: {type: 'all'},
      text: {show: false}
    }
  },
  props: {
    selectFood: {
      type: Object
    },
    showFood: {
      type: Object
    }
  },
  methods: {
    back() {
      this.showFood.show = false
    },
    add(event) {
      this.$refs.cartcontrol.addCart(event)
    }
  },
  computed: {
    buy() {
      if (this.selectFood.count) {
        return false
      } else {
        return true
      }
    },
    comment() {
      let rates = this.selectFood.ratings
      let arr = {
        all: [],
        pleasure: [],
        unpleasure: []
      }
      arr.all = rates
      arr.pleasure = rates.filter((el, index) => {
        return (el.rateType === 0)
      })
      arr.unpleasure = rates.filter((el, index) => {
        return (el.rateType === 1)
      })
      return arr
    },
    showText() {
      let text = []
      let comment = this.comment[this.commentType.type]
      if (this.text.show) {
        comment.forEach((item) => {
          if (item.text) {
            text.push(item)
          }
        })
      } else {
        return comment
      }
      return text
    }
  },
  filters: {
    time(time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  components: {
    Cartcontrol,
    division,
    commentselect
  }
}
</script>

<style lang="sass" rel="stylesheet/sass">
@import "../../common/sass/mixin.scss";
.food-detail-wrap{
  position: fixed;
  bottom: 48px;
  top: 0;
  left: 0;
  right: 0;
  overflow: auto;
  z-index: 11;
  background-color: #fff;
  &::-webkit-scrollbar {
    width: 0;
  }
  .pictrue{
    position: relative;
    font-size: 0;
    .back{
      position: absolute;
      top: 10px;
      left: 0;
      padding: 10px;
      .icon-arrow_lift{
        font-size: 20px;
        color: #fff;
      }
    }
  }
  .content{
    position: relative;
    padding: 18px;
    .title{
      font-size: 14px;
      font-weight: 700;
      color: rgb(7, 17, 27);
      line-height: 14px;
    }
    .detail{
      margin-top: 8px;
      height: 10px;
      font-size: 10px;
      color: rgb(147, 153, 159);
      .sell-count{
        margin-right: 12px;
      }
    }
    .price{
      margin-top: 18px;
      height: 24px;
      .now{
        margin-right: 12px;
        font-size: 14px;
        font-weight: 700;
        color: rgb(240, 20, 20);
        line-height: 24px;
        .symbol{
          font-size: 10px;
          font-weight: normal;
        }
      }
      .old{
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
    }
    .cartcontrol-wrap, .buy-this{
      position: absolute;
      bottom: 18px;
      right: 18px;
    }
    .buy-this{
      padding: 6px 12px;
      font-size: 10px;
      line-height: 12px;
      color: #fff;
      background-color: rgb(0,160,220);
      border-radius: 12px;
    }
  }
  .food-info{
    padding: 18px;
    .title{
      font-size: 14px;
      color: #07111b;
    }
    .info{
      margin-top: 6px;
      padding: 0 8px;
      font-size: 12px;
      line-height: 24px;
      color: rgb(77,85,93);
    }
  }
  .comment-wrap{
    padding-top: 18px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    .title{
      padding: 0 18px 0 18px;
    }
  }
  .comment{
    padding: 0 18px;
    .comment-item{
      padding: 18px 0;
      color: rgb(147, 153, 159);
      @include border-1px(rgba(7,17,27,0.1))
      .time{
        margin-bottom:6px;
        font-size: 10px;
        line-height: 12px;
      }
      .text{
        font-size: 12px;
        line-height: 16px;
        color: rgb(7,17,27);
        .icon-thumb_down, .icon-thumb_up{
          display: inline-block;
          line-height: 16px;
          vertical-align: top;
          margin-right: 4px;
        }
        .icon-thumb_down{
          color: rgb(147,153,159);
        }
        .icon-thumb_up{
          color: rgb(0,160,220);
        }
      }
      .userinfo{
        position: absolute;
        top: 16px;
        right: 0;
        font-size: 0;
        .username{
          font-size: 10px;
          line-height: 12px;
          color: rgb(147,153,159);
          margin-right: 6px;
        }
        .avatar{
          width: 12px;
          height: 12px;
          border-radius: 50%;
          vertical-align: top;
        }
      }
    }
  }
}
.food-detail-enter-active, .food-detail-leave-active{
  transform: translateX(0);
  transition: all 0.5s;
}
.food-detail-enter, .food-detail-leave-active{
  transform: translateX(100%);
}
</style>
