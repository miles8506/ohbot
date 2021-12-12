<template>
  <div class="main">
    <main-header />
    <week-info />
    <div class="main_container">
      <!-- <button @click="clickbtn">click</button> -->
      <calendar />
    </div>
    <div class="pespeak_wrap">
      <button class="pespeak_btn" @click="goPespeakPage">選擇</button>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

// component
import MainHeader from './cpns/mainHeader.vue';
import WeekInfo from './cpns/weekInfo.vue';
import Calendar from '@/base-ui/calendar';

import dayjs from 'dayjs';

export default {
  components: {
    MainHeader,
    WeekInfo,
    Calendar
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    // init
    store.commit('setCurrentSide', true);
    store.commit('setCurrentStamp', dayjs().format('YYYY/MM/DD'));

    const goPespeakPage = () => {
      router.push({
        path: '/pespeak',
        query: {
          stamp: store.state.currentTimeStamp
        }
      });
    };
    return {
      goPespeakPage
    };
  }
};
</script>

<style lang="less" scoped>
@import './less/main.less';
</style>
