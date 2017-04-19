<template>
  <div class="star"
       :class="sizeType">
    <span v-for="(itemClass, index) in itemClasses"
          :class="itemClass"
          class="star-item"
          key="index"></span>
  </div>
</template>
<script>
const LENGTH = 5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'
export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    sizeType() {
      return 'star-' + this.size
    },
    itemClasses() {
      let result = []
      let score = Math.floor(this.score * 2) / 2
      let hasDecimal = score % 1 !== 0
      let integer = Math.floor(score)
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON)
      }
      if (hasDecimal) {
        result.push(CLS_HALF)
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF)
      }
      return result
    }
  }
}
</script>
<style lang="sass" rel="stylesheet/sass">
@import '../../common/sass/mixin.scss';
.star{
  .star-item{
    display: inline-block;
    &:last-child{
      margin-right: 0 !important;
    }
  }
  &.star-48{
    .star-item{
      width: 20px;
      height: 20px;
      margin-right: 22px;
      background-size: 20px 20px;
    }
    .on{
      @include bg-image(star48_on)
    }
    .off{
      @include bg-image(star48_off)
    }
    .half{
      @include bg-image(star48_half)
    }
  }
  &.star-36{
    .star-item{
      width: 15px;
      height: 15px;
      margin-right: 6px;
      background-size: 15px 15px;
    }
    .on{
      @include bg-image(star36_on)
    }
    .off{
      @include bg-image(star36_off)
    }
    .half{
      @include bg-image(star36_half)
    }
  }
  &.star-24{
    .star-item{
      width: 10px;
      height: 10px;
      margin-right: 3px;
      background-size: 10px 10px;
    }
    .on{
      @include bg-image(star24_on)
    }
    .off{
      @include bg-image(star24_off)
    }
    .half{
      @include bg-image(star24_half)
    }
  }
}
</style>
