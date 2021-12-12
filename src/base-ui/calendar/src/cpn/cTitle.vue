<template>
  <div class="c_title" v-show="isShowTitle">
    <div class="title_wrap">
      <div class="date_context">{{ setTitleDate }}</div>
      <div class="control_mask" v-show="hideControl">
        <div class="sub_btn" @click="subClick"></div>
      </div>
      <div class="control_mask" v-show="hideControl">
        <div class="add_btn" @click="addClick"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import dayjs from 'dayjs';

export default {
  data() {
    return {};
  },
  props: {
    nowTime: {
      type: Number,
      required: true
    },
    hideControl: {
      type: Boolean,
      default: true
    },
    isShowTitle: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { emit }) {
    const store = useStore();
    const subClick = () => {
      emit('emitSubWeek');
    };
    const addClick = () => {
      emit('emitAddWeek');
    };

    if (!props.isShowTitle) {
      const currentMonth = dayjs(props.nowTime).format('YYYY / MM');
      store.commit('setCurrentMoth', currentMonth);
    }
    const setTitleDate = computed(() =>
      dayjs(props.nowTime).format('YYYY / MM')
    );
    const setCurrentChartBar = computed(() => {
      return function (index) {
        const resMonth = dayjs(props.nowTime).subtract(1, 'month').$M;
        return resMonth === index;
      };
    });
    return {
      subClick,
      addClick,
      setTitleDate,
      setCurrentChartBar
    };
  }
};
</script>

<style scoped>
.c_title {
  display: flex;
  justify-content: center;
  height: 28px;
  /* margin-bottom: 10px; */
  margin: 0 auto 10px;
}

.title_wrap {
  display: flex;
  align-items: center;
}

.date_context {
  width: 170px;
  text-align: center;
  font-size: 20px;
  font-size: 18px;
  color: #000;
}

.control_mask {
  position: relative;
  width: 20px;
  height: 22px;
  overflow: hidden;
}

.control_mask:last-child {
  margin-left: 8px;
}

.control_mask:hover {
  opacity: 0.7;
}

.sub_btn,
.add_btn {
  position: absolute;
  top: 3px;
  border-top: 8px solid transparent;
  border-right: 8px solid #505050;
  border-bottom: 8px solid #505050;
  border-left: 8px solid transparent;
  border-bottom-right-radius: 2px;
  border-top-right-radius: 4px;
  border-bottom-left-radius: 4px;
  cursor: pointer;
}

.sub_btn {
  left: 11px;
  transform: rotate(135deg);
}
.add_btn {
  left: -5px;
  transform: rotate(315deg);
}

.chart_bar {
  display: flex;
  align-items: flex-end;
  vertical-align: bottom;
}

.chart {
  height: 100%;
}

.bar {
  width: 5px;
  background-color: #686868;
  display: inline-block;
  margin-right: 1px;
}

.month_jan,
.month_dec {
  line-height: 17px;
  color: #999;
}

.month_jan {
  margin-right: 10px;
}

.month_dec {
  margin-left: 10px;
}

.current_bar {
  background-color: red;
}
</style>
