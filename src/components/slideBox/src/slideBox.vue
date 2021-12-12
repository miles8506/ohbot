<template>
  <div class="slide_bar" @click="showSlideList">
    <div class="current_item">
      {{ typeArr[selectBoxIndex] }}
    </div>
    <span class="slide_icon"></span>
  </div>
</template>

<script>
export default {
  props: {
    typeArr: {
      type: Array,
      required: true
    },
    selectBoxIndex: {
      type: Number,
      default: 0
    }
  },
  setup() {
    const showSlideList = () => {};
    return { showSlideList };
  }
};
</script>

<style lang="less" scoped>
@import './less/slideBox.less';
</style>
