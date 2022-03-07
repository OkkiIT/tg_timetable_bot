import coordinates from '../mocks/coordinates.js';
import { getTimeTableKey, TIME_TABLE_KEYS } from '../helpers/timeTablesCases.js';
import getTimetables from '../helpers/getTimetables.js';

const timetablesParser = (busStopArr, urlPageDOM, arrBusStopsID, arrBusStopsName, counterForCoordinates, busID) => {
  const timeTablesContainers = urlPageDOM.querySelectorAll('.rasp');
  const res = [];
  for (const [index, value] of arrBusStopsID.entries()) {
    const [latitude, longitude] = coordinates[counterForCoordinates][index];
    const newBusStops = [
      {
        ID: value,
        name: arrBusStopsName[index],
        latitude,
        longitude,
      },
    ];
    const busStop = newBusStops[0];
    busStopArr.push(busStop);

    let timeTables = [];
    const { key, multiplier } = getTimeTableKey(timeTablesContainers, arrBusStopsID);
    const props = { items: timeTablesContainers, initialValue: newBusStops, index, multiplier, busID };
    switch (key) {
      case TIME_TABLE_KEYS.weekdays:
      case TIME_TABLE_KEYS.weekdaysAndWeekends:
      case TIME_TABLE_KEYS.weekdaysAndDifferentWeekends:
        timeTables = getTimetables(props);
        break;
    }
    res.push(...timeTables);
  }
  return res;
};

export default timetablesParser;


