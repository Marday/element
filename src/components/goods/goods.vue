<template>
  <div>
    <div class="goods-wrap">
      <ul class="menu"
          v-if="goods.length"
          ref="menu">
        <li v-for="(item, index) in goods"
            class="menu-item"
            :class="[index === currentIndex?'current': '']"
            @click="selectMenu(index)">
          <span class="item-wrap">
                    <span v-if="item.type>=0"
                          class="icon"
                          :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
      <div class="food-list"
           ref="scroll">
        <ul v-for="item in goods"
            class="foods-wrap"
            ref="fScroll">
          <h2 class="title">{{item.name}}</h2>
          <li v-for="food in item.foods"
              class="food-item border-1px" @click.stop="_selectFood(food, true)">
            <img :src="food.image"
                 width="57"
                 height="57">
            <div class="food-content">
              <p class="f-name">{{food.name}}</p>
              <p>{{food.description}}</p>
              <p class="f-sellInfo"><span class="sellCount">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
              </p>
              <p class="f-price"><span>￥{{food.price}}</span><span v-if="food.oldPrice">￥{{food.oldPrice}}</span></p>
            </div>
            <div class="cartcontrol-wrap">
              <Cartcontrol :food="food" :ballDrop="true"></Cartcontrol>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <Shopcart :selectedFoods="selectedFood" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></Shopcart>
    <food :selectFood="selectFood" :showFood="selectFood_show"></food>
  </div>
</template>

<script>
import Shopcart from '../shopcart/Shopcart'
import Cartcontrol from '../Cartcontrol/Cartcontrol'
import food from '../food/food'

const ERRNO = 0
export default {
  data() {
    return {
      goods: [],
      currentIndex: 0,
      scrollY: [],
      inScroll: false,
      selectFood: {},
      selectFood_show: {show: false}
    }
  },
  computed: {
    selectedFood() {
      let foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    Shopcart,
    Cartcontrol,
    food
  },
  created() {
    this.$http.get('/api/goods').then((res) => {
      let data = res.body
      if (data.errno === ERRNO) {
        this.goods = data.data
        this.$nextTick(() => {
          this.foodScroll = this.$refs.fScroll
          this.scroll = this.$refs.scroll
          this.intScroll()
          this.menuScroll()
        })
      }
    })
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  methods: {
    selectMenu(index) {
      if (this.inScroll) {
        return
      }
      this._scroll(this.scroll, this.scrollY[index])
    },
    intScroll() {
      this.foodScroll.forEach((item, index) => {
        let scroll = item.offsetTop
        this.scrollY.push(scroll)
      })
    },
    _scroll(el, end) {
      let start = el.scrollTop
      let distance = end - start
      if (distance === 0) {
        return
      }
      this.inScroll = true
      let time = 200
      let step = (distance) > 0 ? 20 : -20
      if (distance > 1000) {
        step = 100
      }
      if (distance < -1000) {
        step = -100
      }
      let times = Math.abs(distance / step)
      let v = time / times
      let count = 1
      let timer = setInterval(() => {
        if (count >= times) {
          el.scrollTop = end
          clearInterval(timer)
          this.inScroll = false
          return
        }
        el.scrollTop = start + step * count
        count++
      }, v)
    },
    menuScroll() {
      let scroll = this.$refs.scroll
      let len = this.scrollY.length
      scroll.addEventListener('scroll', () => {
        setTimeout(() => {
          for (let i = 0; i < len; i++) {
            let height1 = this.scrollY[i]
            let height2 = this.scrollY[i + 1]
            if (height1 <= scroll.scrollTop && scroll.scrollTop < height2 || !height2) {
              this.currentIndex = i
              return
            }
          }
        }, 150)
      })
    },
    addfood(target) {

    },
    _selectFood(food, show) {
      this.selectFood = food
      this.selectFood_show.show = show
    }
  }
}
</script>

<style lang="sass" rel="stylesheet/sass">
@import "../../common/sass/mixin.scss";

.goods-wrap{
  display: flex;
  position: absolute;
  top: 174px;
  bottom: 48px;
  width: 100%;
  .decrease{
    @include bg-image(decrease_3)
  }
  .discount{
    @include bg-image(discount_3)
  }
  .special{
    @include bg-image(special_3)
  }
  .guarantee{
    @include bg-image(guarantee_3)
   }
  .invoice{
    @include bg-image(invoice_3)
  }
  .menu{
    width: 80px;
    flex-basis: 80px;
    height: 100%;
    background: #fff;
    font-size: 12px;
    font-weight: 200;
    line-height: 14px;
    color: #07111b;
    overflow-y: auto;
    &::-webkit-scrollbar{
      width: 0;
      height: 0;
    }
    .menu-item{
      display: table;
      box-sizing: border-box;
      padding: 0 12px;
      width: 100%;
      height: 54px;
      font-weight: 200;
      background-color: #f3f5f7;
      &.current{
        position: relative;
        margin-top: -1px;
        z-index: 9;
        background: #fff;
        .item-wrap:after{
          display: none;
        }
      }
      .item-wrap{
        display: table-cell;
        vertical-align: middle;
        @include border-1px(rgba(7,17,27,0.1))
      }
      .icon{
        display: inline-block;
        width: 12px;
        height: 12px;
        background-size: 100%;
        vertical-align: top;
        margin-right: 2px;
      }
    }
    .select{
      background-color: #fff;
      font-weight: normal;
    }
  }
  .food-list{
    flex: 1;
    background: #fff;
    overflow: auto;
    &::-webkit-scrollbar{
      width: 0;
      height: 0;
    }
    .foods-wrap{
      .title{
        padding: 0 14px;
        height: 26px;
        background: #f3f5f7;
        font-size: 12px;
        color: rgb(147,153,159);
        line-height: 26px;
        border-left: 2px solid #d9dde1;
      }
      .food-item{
        display: flex;
        position: relative;
        margin: 18px;
        padding-bottom: 18px;
        @include border-1px(rgba(7,17,27,0.1));
        .food-content{
          margin-left: 10px;
          font-size: 10px;
          color: #93999f;
          .f-name{
            margin: 2px 0 8px 0;
            font-size: 14px;
            color: #07111b;
          }
          .f-sellInfo{
            margin-top: 8px;
            .sellCount{
              margin-right: 12px;
            }
          }
          .f-price{
            font-size: 14px;
            color: #f01414;
            line-height: 24px;
          }
        }
        .cartcontrol-wrap{
          position: absolute;
          right: 0;
          bottom: 19px;
        }
      }
    }
  }
}
</style>
