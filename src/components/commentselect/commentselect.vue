<template>
  <div class="commentselect"
       v-if="comment">
    <div class="select-block">
      <span class="block all"
            :class="commentType.type === 'all'? 'active':''"
            @click.stop="selectBlock('all')">{{blockName.all + ' ' + comment.all.length}}</span>
      <span class="block pleasure"
            :class="commentType.type === 'pleasure'? 'active':''"
            @click.stop="selectBlock('pleasure')">{{blockName.pleasure + ' ' + comment.pleasure.length}}</span>
      <span class="block unpleasure"
            :class="commentType.type === 'unpleasure'? 'active':''"
            @click.stop="selectBlock('unpleasure')">{{blockName.unpleasure + ' ' + comment.unpleasure.length}}</span>
    </div>
    <div class="toggleContent"><span class="icon-check_circle" @click.stop="toggleContent" :class="{active: active}"></span>只看有内容的评价</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: false
    }
  },
  props: {
    blockName: {
      type: Object,
      default() {
        return {
          all: '全部',
          pleasure: '满意',
          unpleasure: '不满意'
        }
      }
    },
    commentType: {
      type: Object
    },
    text: {
      type: Object
    },
    comment: {
      type: Object
    }
  },
  methods: {
    selectBlock(text) {
      this.commentType.type = text
    },
    toggleContent() {
      this.active = !this.active
      this.text.show = this.active
    }
  }
}
</script>
<style lang="sass" rel="stylesheet/sass">
@import "../../common/sass/mixin.scss";
  .commentselect{
    padding: 18px 18px 0 18px;
    .select-block{
      padding-bottom: 18px;
      font-size: 0;
      @include border-1px(rgba(7, 17, 27, 0.1));
    }
    .block{
      display: inline-block;
      margin-right: 8px;
      padding: 8px 12px;
      font-size: 12px;
      line-height: 16px;
      color: rgb(77,85,93);
      background-color: #ccecf8;
      border-radius: 1px;
      &.unpleasure{
        background-color: #e9ebec;
      }
      &.active{
        background: #00a0dc;
        color: #fff;
      }
    }
    .toggleContent{
      padding: 12px 0;
      font-size: 12px;
      line-height: 24px;
      color: rgb(147,153,159);
      .icon-check_circle{
        margin-right: 4px;
        vertical-align: middle;
        height: 24px;
        font-size: 24px;
        &.active{
          color: #00c850;
        }
      }
    }
  }
</style>
