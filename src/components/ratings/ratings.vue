<template>
  <div class="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="left">
          <h2 class="score">{{seller.score}}</h2>
          <p class="name">综合评分</p>
          <p class="rank">高于周边商家{{seller.rankRate}}%</p>
        </div>
        <div class="right">
          <div class="score-wrap">
            <span class="name">服务态度</span>
            <Star :size="36"
                  :score="seller.serviceScore"></Star>
            <span class="scoreNum">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrap">
            <span class="name">商品评分</span>
            <Star :size="36"
                  :score="seller.foodScore"></Star>
            <span class="scoreNum">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrap">
            <span class="name">送达时间</span>
            <span class="deliveryTime">{{seller.deliveryTime}}</span>
          </div>
        </div>
      </div>
      <division></division>
      <commentselect :commentType="commentType"
                     :text="text"
                     :comment="comments"></commentselect>
      <ul class="comments">
        <li class="comment-item"
            v-for="(rating, index) in showText">
            <div class="avatar">
              <img :src="rating.avatar">
            </div>
            <div class="content">
              <div class="name">{{rating.username}}</div>
              <div class="score">
                <Star :size="24" :score="rating.score"></Star>
                <span class="des">{{rating.deliveryTime}}分钟到达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-if="!!rating.recommend[0]">
                <i :class="[!rating.rateType?'icon-thumb_up':'icon-thumb_down', 'icon']"></i>
                <span class="item" v-for="item in rating.recommend">
                  {{item}}
                </span>
              </div>
            </div>
            <div class="time">
              {{rating.rateTime | date}}
            </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Star from '../star/star'
import division from '../division/division'
import commentselect from '../commentselect/commentselect'
import { formatDate } from '../../common/js/formatDate'
const ERRNO = 0
export default {
  data() {
    return {
      commentType: { type: 'all' },
      text: { show: false },
      ratings: []
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  computed: {
    comments() {
      let ratings = this.ratings
      let arr = {
        all: [],
        pleasure: [],
        unpleasure: []
      }
      arr.all = ratings
      arr.pleasure = ratings.filter((el, index) => {
        return (el.rateType === 0)
      })
      arr.unpleasure = ratings.filter((el, index) => {
        return (el.rateType === 1)
      })
      return arr
    },
    showText() {
      let text = []
      let comment = this.comments[this.commentType.type]
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
    date(time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  components: {
    Star,
    division,
    commentselect
  },
  created() {
    this.$http.get('/api/ratings').then((res) => {
      res = res.body
      if (res.errno === ERRNO) {
        this.ratings = res.data
        console.log(this.ratings)
      }
    })
  }
}
</script>
<style lang="sass">
@import "../../common/sass/mixin.scss";
.ratings{
  position: absolute;
  top: 174px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  &::-webkit-scrollbar{
    width: 0;
    height: 0;
  }
  .ratings-content{
    .overview{
      display: flex;
      padding: 18px 0;
      .left{
        width: 137px;
        text-align: center;
        @include border-right-1px(rgba(7,17,27,0.1));
        .score{
          margin-bottom: 6px;
          font-size: 24px;
          line-height: 28px;
          color: rgb(255,153,0);
        }
        .name{
          margin-bottom: 8px;
          font-size: 12px;
          color: rgb(7,17,27);
          line-height: 12px;
        }
        .rank{
          margin-bottom: 6px;
          font-size: 10px;
          color: rgb(147,153,159);
        }
      }
      .right{
        flex: 1;
        padding-left: 24px;
        .score-wrap{
          margin-bottom: 8px;
          font-size: 0;
          .name{
            display: inline-block;
            margin-right: 12px;
            font-size: 12px;
            line-height: 18px;
            color: rgb(7,17,27);
          }
          .star{
            display:inline-block;
            vertical-align: top;
            margin-right: 12px;
          }
          .scoreNum{
            font-size:12px;
            line-height: 18px;
            color: rgb(255,153,0);
          }
        }
        .delivery-wrap{
          font-size: 12px;
          line-height: 18px;
          .name{
            margin-right:12px;
            color: rgb(7,17,27);
          }
          .deliveryTime{
            color: rgb(147,153,159);
          }
        }
      }
    }
    .comments{
      padding: 0 18px;
      border-top: 1px solid #e6e7e8;
      .comment-item{
        display: flex;
        position: relative;
        padding: 18px 0;
        @include border-1px(rgba(7,17,27,0.1))
        .avatar{
          width: 40px;
          img{
            width: 28px;
            height: 28px;
            border-radius: 50%;
          }
        }
        .content{
          flex: 1;
          .name{
            margin-bottom: 4px;
            font-size: 10px;
            line-height: 12px;
            color: rgb(7,17,27);
          }
          .score{
            margin-bottom: 6px;
            font-size: 0;
            .star{
              margin-right: 6px;
              display: inline-block;
              vertical-align: top;
            }
            .des{
              font-size: 10px;
              line-height: 12px;
              color: rgb(147,153,159);
            }
          }
          .text{
            margin-bottom: 8px;
            font-size: 12px;
            line-height: 18px;
            color: rgb(7,17,27);
          }
          .recommend{
            font-size: 0;
            .icon{
              font-size: 12px;
              line-height: 16px;
            }
            .icon-thumb_up{
              color: #00a0dc;
            }
            .icon-thumb_down{
              color:rgb(183,187,191);
            }
            .item{
              margin-top: 1px;
              padding: 0 6px;
              font-size: 12px;
              line-height: 16px;
              color: rgb(147,153,159);
              border: 1px solid rgba(7,17,27,0.1);
            }
          }
        }
        .time{
          position: absolute;
          right: 18px;
          top: 18px;
          font-size:10px;
          line-height: 12px;
          color: rgb(147,153,159);
        }
      }
    }
  }
}
</style>
