<template>
  <div class="week_info">
    <div class="current_month">
      <span>{{ currentMonth }}</span>
    </div>
    <div class="week_bar">
      <template v-for="(item, index) in weekList" :key="index">
        <div>
          {{ item }}
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';

import dayjs from 'dayjs';
export default {
  setup() {
    const weekList = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const store = useStore();
    const currentMonth = dayjs(store.state.nowTime).format('YYYY /  MM');
    return {
      currentMonth,
      weekList
    };
  }
};
</script>

<style lang="less" scoped>
@import '../less/weekInfo.less';
</style>
