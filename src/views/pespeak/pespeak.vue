<template>
  <!-- <m-header></m-header> -->
  <div class="pespeak">
    <pespeak-header
      :typeArr="typeArr"
      :selectBoxIndex="selectBoxIndex"
      @emitDateType="emitDateType"
    />
    <week-info />
    <pespeak-form :selectBoxIndex="selectBoxIndex" />
  </div>
  <div class="mask" v-show="isShowSelectBox" @click="clickMask"></div>
  <transition name="select_transition">
    <div class="select_wrap" v-show="isShowSelectBox">
      <ul class="select_list">
        <li
          v-for="(item, index) in typeArr"
          :key="item"
          class="select_item"
          :class="{ current_select_item: selectBoxIndex === index }"
          @click="chooseSelectItem(index)"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

// component
import PespeakHeader from './cpns/pespeakHeader.vue';
import WeekInfo from './cpns/weekInfo.vue';
import PespeakForm from './cpns/pespeakForm.vue';

export default {
  components: {
    PespeakHeader,
    WeekInfo,
    PespeakForm
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    // 判斷url是否帶有query
    if (route.query.stamp === undefined || route.query.stamp === null)
      router.push('/main');

    if (store.state.currentTimeStamp === '')
      store.commit('setCurrentTimeStamp', route.query.stamp);
    store.commit('setCurrentStamp', route.query.stamp);
    const typeArr = ['日檢視', '週檢視'];
    const selectList = ref([]);
    const isShowSelectBox = ref(false);
    const selectBoxIndex = ref(0);
    const emitDateType = (type) => {
      if (type === 'date') {
        selectList.value = typeArr;
        isShowSelectBox.value = !isShowSelectBox.value;
      }
    };
    const chooseSelectItem = (index) => {
      selectBoxIndex.value = index;
      isShowSelectBox.value = !isShowSelectBox.value;
    };

    const clickMask = () => {
      isShowSelectBox.value = !isShowSelectBox.value;
    };
    return {
      typeArr,
      isShowSelectBox,
      selectBoxIndex,
      emitDateType,
      clickMask,
      chooseSelectItem
    };
  }
};
</script>

<style lang="less" scoped>
@import './less/pespeak.less';
</style>
