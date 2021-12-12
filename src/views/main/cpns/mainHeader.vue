<template>
  <m-header>
    <template #header_left>
      <div class="header_left">
        <div class="calendar_icon">
          <img src="@/assets/img/calendar.png" alt="" />
        </div>
        <div class="text">選擇日期</div>
      </div>
    </template>
    <template #header_right>
      <div class="header_right">
        <div class="close">X</div>
      </div>
    </template>
  </m-header>
</template>

<script>
import MHeader from '@/components/Mheader';

export default {
  components: {
    MHeader
  },
  setup() {
    return {};
  }
};
</script>

<style lang="less" scoped>
@import '../less/mainHeader.less';
</style>
