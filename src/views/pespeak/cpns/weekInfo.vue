<template>
  <div class="week_info">
    <div class="calendar_icon" @click="goMainPage">
      <img src="@/assets/img/icons8-calendar.png" alt="" />
    </div>
    <div class="week_bar">
      <template v-for="item in currentWeekArr" :key="item">
        <div
          class="date"
          :class="{
            current_date: $store.state.currentTimeStamp === item.fullDate
          }"
          @click="clickWeekDate(item.fullDate)"
        >
          <div class="week_hd">
            {{ item.weekDate }}
          </div>
          <div class="week_bd">
            {{ item.date }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

// utils
import { currentWeekFn } from '@/utils/computedTime.js';

export default {
  setup() {
    const store = useStore();
    const currentWeekArr = computed(() =>
      currentWeekFn(store.state.currentTimeStamp)
    );
    const router = useRouter();
    const goMainPage = () => {
      router.push('/main');
    };

    const clickWeekDate = (date) => {
      store.commit('setCurrentTimeStamp', date);
      store.commit('setCurrentStamp', date);
    };
    return {
      currentWeekArr,
      goMainPage,
      clickWeekDate
    };
  }
};
</script>

<style lang="less" scoped>
@import '../less/weekInfo.less';
</style>
