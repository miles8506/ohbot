<template>
  <div class="days_body">
    <div v-for="(week, fatherIndex) in dateArr" :key="fatherIndex" class="week">
      <span
        v-for="(item, childrenIndex) in week"
        :key="childrenIndex"
        class="date_box"
        :class="{
          other_month: !item.currentMonth
        }"
        @click="clickDate(item.timeStamp)"
      >
        <span
          class="date"
          :class="{
            current_date:
              $store.state.currentTimeStamp === item.timeStamp &&
              currentSide === $store.state.currentSide
          }"
          >{{ item.date }}</span
        >
      </span>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';

// hook
import { useMonth } from '../../hook/useMonth';

import dayjs from 'dayjs';

export default {
  props: {
    // 當前時間
    nowTime: {
      type: Number,
      required: true
    },
    nowMounth: {
      type: Boolean,
      defaults: false
    },
    currentSide: {
      type: Boolean,
      default: true
      // true -> front side ; false -> back side
    }
  },
  setup(props) {
    const store = useStore();
    let dateArr = ref([]);
    let failLogData = ref([]);
    const currentDate = dayjs().format('YYYY/M/D');
    failLogData.value = store.state.failLogData;
    useMonth(props.nowTime, dateArr.value, failLogData.value);

    if (props.nowMounth) {
      dateArr.value.forEach((item) => {
        item.forEach((childItem) => {
          if (childItem.timeStamp === currentDate) {
            store.commit('setCurrentTimeStamp', childItem.timeStamp);
            return;
          }
        });
      });
    }

    // click date
    const clickDate = (tiemStamp) => {
      store.commit('setCurrentSide', props.currentSide);
      store.commit('setCurrentTimeStamp', tiemStamp);
      store.commit('setCurrentStamp', tiemStamp);
    };

    watch(
      () => props.nowTime,
      (newTimeStamp) => {
        dateArr.value = [];
        useMonth(newTimeStamp, dateArr.value, failLogData.value);
      }
    );

    return {
      dateArr,
      failLogData,
      clickDate
    };
  }
};
</script>

<style scoped>
.days_body {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 20px 0;
  padding: 0 40px;
  color: #505050;
}

.week {
  flex: 1;
  display: flex;
  width: 100%;
}

.week:last-child {
  border-bottom: none;
}

.date_box {
  position: relative;
  flex: 1;
  /* height: 40px; */
  text-align: center;
  /* line-height: 40px; */
  cursor: pointer;
}

.date_box:nth-child(7n) {
  border: 0;
}

.date_box .date {
  /* display: inline-block; */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
  padding: 2px 5px;
  text-align: center;
  line-height: 27px;
  border-radius: 30px;
  /* background-color: pink; */
}

.date_box :hover {
  opacity: 0.8;
}

.date_box .fake_border {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.date_box .info {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.pulse_fail_count,
.mark_fail_count {
  position: relative;
  padding-left: 15px;
  font-size: 12px;
  /* white-space: nowrap; */
}

.pulse_fail_count::before,
.mark_fail_count::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
  width: 4px;
  height: 4px;
  border-radius: 2px;
}

.pulse_fail_count::before {
  background-color: #ab1738;
}

.mark_fail_count::before {
  background-color: #eea63f;
}

.current_date {
  background-color: #7f74b4 !important;
  color: #fff;
}
</style>
