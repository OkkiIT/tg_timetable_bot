import { busMatches } from '../helpers/busMatches.js';

const filterMatchedTimetables = (busStopsWithTimetables, currentHour, currentMin) => {
  const filteredArr = [];
  busStopsWithTimetables.forEach(route => {
    const { name, globalName } = route;
    const matchedTimeTables = route.timetables.filter(({ timing }) => {
      return busMatches(timing, currentHour, currentMin);
    });
    filteredArr.push({ name, globalName, matchedTimeTables });
  });
  return filteredArr;
};

export default filterMatchedTimetables;
