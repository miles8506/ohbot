<template>
  <div class="calendar">
    <c-title
      :hideControl="false"
      :nowTime="nowTime"
      :isShowTitle="false"
      @emitSubWeek="emitSubWeek"
      @emitAddWeek="emitAddWeek"
    />
    <days-body :nowTime="nowTime" :nowMounth="true" />
    <c-title
      :hideControl="false"
      :nowTime="nowTime + 2629800000"
      @emitSubWeek="emitSubWeek"
      @emitAddWeek="emitAddWeek"
    />
    <days-body :nowTime="nowTime + 2629800000" :currentSide="false" />
  </div>
</template>

<script>
import { ref } from 'vue';

// component
import CTitle from './cpn/cTitle.vue';
import DaysBody from './cpn/daysBody.vue';

// dayjs
import dayjs from 'dayjs';

export default {
  data() {
    return {
      nowTimeFn: null,
      nowTime: 0
    };
  },
  components: {
    CTitle,
    DaysBody
  },
  setup() {
    let nowTime = ref(0);
    const now = dayjs(dayjs().$d).valueOf();
    nowTime.value = now;

    const emitSubWeek = () => {
      const dateInfo = dayjs(nowTime.value).subtract(1, 'month').$d;
      const beforeMonthTimestamp = dayjs(dateInfo).valueOf();
      nowTime.value = beforeMonthTimestamp;
    };
    const emitAddWeek = () => {
      const dateInfo = dayjs(nowTime.value).add(1, 'month').$d;
      const afterMonthTimestamp = dayjs(dateInfo).valueOf();
      nowTime.value = afterMonthTimestamp;
    };
    return {
      nowTime,
      emitSubWeek,
      emitAddWeek
    };
  }
};
</script>

<style lang="less" scoped>
.calendar {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 375px;
  // height: 100%;
  overflow: hidden;
  /* overflow-y: scroll; */
}
</style>
