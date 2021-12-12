import dayjs from 'dayjs';

export function useMonth(nowTime, dateArr) {
  const dataArr = [];
  // 1.當月
  // 當前月份一個月有幾天
  const currentDate = new Date(nowTime);

  const currentMonthDate = dayjs(dayjs(nowTime).$d).daysInMonth();
  for (let i = 1; i <= currentMonthDate; i++) {
    // let pulseData = [];
    // let pulseCount = 0;
    // let markData = [];
    // let markCount = 0;
    // let currentDate = '';

    const currentDayString =
      currentDate.getFullYear() + '/' + (currentDate.getMonth() + 1) + '/' + i;
    // for (const item of failLogData) {
    //   if (item.day === i) {
    //     currentDate = item.currentDate;
    //     pulseData = item.pulseFail;
    //     markData = item.markFail;
    //     if (item.pulseFail.length > 0) {
    //       for (const pulseItem of item.pulseFail) {
    //         pulseCount += pulseItem.count;
    //       }
    //     }
    //     if (item.markFail.length > 0) {
    //       for (const markItem of item.markFail) {
    //         markCount += markItem.count;
    //       }
    //     }
    //   }
    // }

    dataArr.push({
      currentMonth: true,
      date: i,
      timeStamp: currentDayString,
      stamp: dayjs(currentDayString).valueOf()
      // info: {
      //   currentDate: currentDate,
      //   pulse: pulseData,
      //   mark: markData
      // }
    });
  }
  // 當月1日為星期幾
  const nowDate = dayjs(nowTime).format('YYYY-MM-DD').split('');
  nowDate.splice(8, 2, '0', '1');
  const firstWeek = dayjs(nowDate.join('')).day();

  // 2.前一個月
  // 前一個月共有幾天
  const beforeMonthInfo = dayjs(nowTime).subtract(1, 'month').$d;
  // const beforeMonth = dayjs(nowTime).subtract(1, 'month').$M + 1;
  const beforeMonthLastDate = dayjs(beforeMonthInfo).daysInMonth();
  // 前一個月的天數要loop幾次
  const beforeLoopMonthDate = 7 - (7 - firstWeek);

  // 記錄前一個月的日期
  let beforeMoth = '';
  if (currentDate.getMonth() + 1 === 1) {
    beforeMoth = currentDate.getFullYear() - 1 + '/' + 12 + '/';
  } else {
    beforeMoth = currentDate.getFullYear() + '/' + currentDate.getMonth() + '/';
  }
  for (let i = 0; i < beforeLoopMonthDate; i++) {
    dataArr.unshift({
      currentMonth: false,
      date: beforeMonthLastDate - i,
      timeStamp: beforeMoth + (beforeMonthLastDate - i)
    });
  }

  // 3.下一個月
  // const afterMonth = dayjs(nowTime).add(1, 'month').$M + 1;
  if (dataArr.length > 35) {
    const popCount = dataArr.length - 35;
    for (let i = 0; i < popCount; i++) {
      dataArr.pop();
    }
  } else {
    const pushCount = 35 - dataArr.length;
    let afterMoth = '';
    if (currentDate.getMonth() + 1 === 12) {
      afterMoth = currentDate.getFullYear() + 1 + '/' + 1 + '/';
    } else {
      afterMoth =
        currentDate.getFullYear() + '/' + currentDate.getMonth() + 1 + '/';
    }
    for (let i = 1; i <= pushCount; i++) {
      dataArr.push({
        currentMonth: false,
        date: i,
        timeStamp: afterMoth + i
      });
    }
  }

  // 將array分成五個禮拜
  for (let i = 0; i < 5; i++) {
    const weekArr = dataArr.splice(0, 7);
    dateArr.push(weekArr);
  }
}
