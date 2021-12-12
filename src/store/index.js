import { createStore } from 'vuex';

import dayjs from 'dayjs';

export default createStore({
  state: {
    currentMoth: '',
    currentTimeStamp: '',
    currentStamp: 0,
    currentSide: true
  },
  mutations: {
    setCurrentMoth(state, payload) {
      state.currentMoth = payload;
    },
    setCurrentTimeStamp(state, payload) {
      state.currentTimeStamp = payload;
    },
    setCurrentStamp(state, payload) {
      state.currentStamp = dayjs(payload).valueOf();
    },
    subCurrentStamp(state, payload) {
      state.currentStamp -= payload;
    },
    addCurrentStamp(state, payload) {
      state.currentStamp += payload;
    },
    setCurrentSide(state, payload) {
      state.currentSide = payload;
    }
  },
  actions: {},
  modules: {}
});
