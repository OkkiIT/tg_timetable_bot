export const TIME_TABLE_KEYS = {
  weekdays: 'weekdays',
  weekdaysAndWeekends: 'weekdaysAndWeekends',
  weekdaysAndDifferentWeekends: 'weekdaysAndDifferentWeekends',
};

export const TIME_TABLE_MULTIPLIERS = {
  1: TIME_TABLE_KEYS.weekdays,
  2: TIME_TABLE_KEYS.weekdaysAndWeekends,
  3: TIME_TABLE_KEYS.weekdaysAndDifferentWeekends,
};

export const getTimeTableKey = (timeTablesContainers, arrBusStopsID) => {
  const multiplier = timeTablesContainers.length / arrBusStopsID.length;
  return { key: TIME_TABLE_MULTIPLIERS[multiplier], multiplier };
};
