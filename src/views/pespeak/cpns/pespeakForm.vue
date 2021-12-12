<template>
  <div class="pespeak_form">
    <div class="pespeak_col">
      <div
        class="row"
        v-for="(item, index) in currentWeek[0].pespeakInfo"
        :key="index"
        :class="{ blur_wrap: index === currentWeek[0].pespeakInfo.length - 1 }"
      >
        <div class="time_wrap">
          {{ item.time }}
        </div>
        <template v-if="selectBoxIndex === 0">
          <div class="pespeak_info_day">
            <div class="for_dayinfo"></div>
          </div>
        </template>
        <template v-else>
          <div class="pespeak_info_week">
            <template v-for="item in currentWeek" :key="item">
              <div class="for_weekinfo"></div>
            </template>
          </div>
        </template>
      </div>
    </div>
    <!-- <div class="blur_area"></div> -->
    <button class="add_pespeak">
      <span class="add_text">+ 新增預約</span>
    </button>
  </div>
</template>

<script>
import { useStore } from 'vuex';

//utils
import { currentWeekFn } from '@/utils/computedTime.js';
export default {
  props: {
    selectBoxIndex: {
      type: Number,
      default: 0
    }
  },
  setup() {
    const store = useStore();
    const currentWeek = currentWeekFn(store.state.currentTimeStamp);
    return {
      currentWeek
    };
  }
};
</script>

<style lang="less" scoped>
@import '../less/pespeakForm.less';
</style>
