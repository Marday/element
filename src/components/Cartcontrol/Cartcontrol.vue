<template>
  <div class="cartControl">
    <transition name="move">
      <div class="cart-decrease"
           v-show="this.food.count>0"
           @click.stop="decreaseCart">
        <i class="icon-remove_circle_outline rotate"></i>
      </div>
    </transition>
    <div class="cart-count"
         v-show="this.food.count>0">
      {{this.food.count}}
    </div>
    <div class="cart-add icon-add_circle"
         @click.stop="addCart">
    </div>
    <div class="balls-wrap"
         v-if="ballDrop"
         v-for="ball in balls">
      <transition name="drop"
                  @before-enter="beforeDrop"
                  @enter="dropping"
                  @after-enter="afterDrop">
        <div class="balls"
             v-show="ball.show">
          <div class="inner"></div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: []
    }
  },
  props: {
    food: {
      type: Object
    },
    ballDrop: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    addCart(event) {
      if (!this.food.count) {
        this.$set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      this.drop(event.target)
    },
    decreaseCart() {
      this.food.count--
    },
    drop(target) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = target
          this.dropBalls.push(ball)
          return
        }
      }
    },
    beforeDrop(el) {
      let count = this.dropBalls.length
      while (count--) {
        let rect = this.dropBalls[count].el.getBoundingClientRect()
        let x = rect.left - 32
        let y = -(window.innerHeight - rect.top - 22)
        el.style.display = 'block'
        el.style.transform = `translateY(${y}px)`
        el.style.webkitTransform = `translateY(${y}px)`
        let inner = el.getElementsByClassName('inner')[0]
        inner.style.transform = `translateX(${x}px)`
        inner.style.webkitTransform = `translateX(${x}px)`
      }
    },
    dropping(el, done) {
      /** 在元素还未在文档时处于的位置到出现时的位置，如果不重绘一次，
      会直接出现在终点位置而不触发transitionend事件
      所以需要重绘一下，获取元素的style属性就可以触发重绘 **/
      let rl = el.offsetHeight
      this.$nextTick(() => {
        el.style.transform = `translateY(0px)`
        el.style.webkitTransform = `translateY(0px)`
        let inner = el.getElementsByClassName('inner')[0]
        inner.style.transform = `translateX(0px)`
        inner.style.webkitTransform = `translateX(0px)`
        el.addEventListener('transitionend', done)
      })
    },
    afterDrop(el) {
      let ball = this.dropBalls.shift()
      ball.show = false
      el.style.display = 'none'
    }
  }
}
</script>
<style lang="sass" rel="stylesheet/sass">
.cartControl{
  font-size: 0;
  .cart-decrease,.cart-add{
    display: inline-block;
    width: 20px;
    height: 20px;
    font-size: 20px;
    color: #00a0dc;
  }
  .cart-decrease{
    opacity: 1;
    .rotate{
      display: inline-block;
      transition: all 0.4s linear;
      transform: rotate(0);
    }
    &.move-enter-active, &.move-leave-active{
      transition: all 0.4s linear;
    }
    &.move-enter, &.move-leave-active{
      opacity: 0;
      transform: translateX(24px);
      .rotate{
        transform: rotate(180deg);
      }
    }
  }
  .cart-count{
    display: inline-block;
    width: 24px;
    vertical-align: top;
    text-align: center;
    line-height: 20px;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
  .balls-wrap{
    .balls{
      position: fixed;
      left: 32px;
      bottom: 22px;
      z-index: 200;
      transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
      .inner{
        width: 16px;
        height: 16px;
        transition: all 0.4s linear;
        border-radius: 50%;
        background-color: rgb(0, 160, 220);
      }
    }
  }
}
</style>
