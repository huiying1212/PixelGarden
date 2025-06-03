// 基础星期数组
const BASE_WEEKDAYS = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

// 日期工具函数
export const DateUtils = {
  // 获取今天在星期数组中的索引 (0-6, 周一为0)
  getTodayIndex: () => {
    const today = new Date().getDay();
    return today === 0 ? 6 : today - 1;
  },

  // 根据索引获取完整日期字符串
  getDateByIndex: (index: number): string => {
    const now = new Date();
    const todayIndex = DateUtils.getTodayIndex();
    const offset = index - todayIndex;
    const targetDate = new Date(now);
    targetDate.setDate(targetDate.getDate() + offset);
    return targetDate.toISOString();
  },

  // 获取显示的日期字符串数组 (M-D格式)
  getDisplayDates: () => {
    const dates = [];
    const now = new Date();
    const todayIndex = DateUtils.getTodayIndex();
    
    for (let i = 0; i < 7; i++) {
      const offset = i - todayIndex;
      const date = new Date(now);
      date.setDate(date.getDate() + offset);
      dates.push(`${date.getMonth() + 1}-${date.getDate()}`);
    }
    return dates;
  },

  // 获取星期显示数组
  getWeekDays: () => {
    const todayIndex = DateUtils.getTodayIndex();
    return BASE_WEEKDAYS.map((day, index) => 
      index === todayIndex ? '今天' : day
    );
  }
}; 