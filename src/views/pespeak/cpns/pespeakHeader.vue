<template>
  <m-header>
    <template #header_left>
      <div class="header_left">
        <template v-if="selectBoxIndex === 0">
          <div class="before_icon_wrap" @click="clickSubDate">
            <span class="before_icon"></span>
          </div>
          <div class="control_wrap">{{ currentDate }}</div>
          <div class="after_icon_wrap" @click="clickAddDate">
            <span class="after_icon"></span>
          </div>
        </template>
        <template v-else>
          <div class="text">預約行事曆</div>
        </template>
      </div>
    </template>
    <template #header_right>
      <slide-box
        :typeArr="typeArr"
        @click="chooseType"
        :selectBoxIndex="selectBoxIndex"
      ></slide-box>
    </template>
  </m-header>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

// component
import MHeader from '@/components/Mheader';
import SlideBox from '@/components/slideBox';

import dayjs from 'dayjs';
export default {
  components: {
    MHeader,
    SlideBox
  },
  emits: ['emitDateType'],
  props: {
    typeArr: {
      type: Array,
      default() {
        return [];
      }
    },
    selectBoxIndex: {
      type: Number,
      default: 0
    }
  },
  setup(props, { emit }) {
    const store = useStore();
    const route = useRoute();
    const currentDate = computed(() => {
      const currentStamp = store.state.currentStamp;
      const formatDate = dayjs(currentStamp).format('YYYY/MM/DD');
      return formatDate;
    });

    // sub
    const clickSubDate = () => {
      store.commit('subCurrentStamp', 86400000);
      store.commit(
        'setCurrentTimeStamp',
        dayjs(store.state.currentStamp).format('YYYY/M/D')
      );
      route.query.stamp = store.state.currentTimeStamp;
      console.log(route.query.stamp);
    };

    // add
    const clickAddDate = () => {
      store.commit('addCurrentStamp', 86400000);
      store.commit(
        'setCurrentTimeStamp',
        dayjs(store.state.currentStamp).format('YYYY/M/D')
      );
      route.query.stamp = store.state.currentTimeStamp;
    };
    const chooseType = () => {
      emit('emitDateType', 'date');
    };
    return {
      currentDate,
      chooseType,
      clickSubDate,
      clickAddDate
    };
  }
};
</script>

<style lang="less" scoped>
@import '../less/pespeakHeader.less';
</style>
