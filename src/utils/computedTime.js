import dayjs from 'dayjs';

// 計算當週date
export function currentWeekFn(stamp) {
  const weekDate = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const currentWeekArr = [];
  const startDate = dayjs(stamp).startOf('week').add(0, 'day').valueOf();
  for (let i = 0; i < 7; i++) {
    // 每日時段(30min)
    const pespeakInfo = [];
    const aDateStamp = dayjs(startDate).valueOf();
    for (let i = 0; i < 48; i++) {
      pespeakInfo.push({
        time: dayjs(aDateStamp + i * 1800000).format('hh:mma'),
        content: ''
      });
    }

    // week
    currentWeekArr.push({
      date: dayjs(startDate + 86400000 * i).format('DD'),
      weekDate: weekDate[i],
      fullDate: dayjs(startDate + 86400000 * i).format('YYYY/M/D'),
      pespeakInfo: pespeakInfo
    });
  }
  return currentWeekArr;
}

// export function halfHourFn() {
//   const format = dayjs().format('YYYY/MM/DD');

// }
