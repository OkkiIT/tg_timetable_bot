import timetablesParser from './timetablesParser.js';

const busStopsAndTimetableParser = (urlPageDOM, counterForCoordinates, busID, busStopArr) => {
  const regOnlyNumbers = /\d+/;
  const busStops = urlPageDOM.querySelectorAll('div.name> a');
  const arrBusStopsID = [];

  busStops.forEach(item => {
    arrBusStopsID.push(item.getAttribute('href').match(regOnlyNumbers)[0]);
  });

  const busStopsName = urlPageDOM.querySelectorAll('div.name> a');
  const arrBusStopsName = [];

  busStopsName.forEach(item => {
    arrBusStopsName.push(item.textContent);
  });

  return timetablesParser(busStopArr, urlPageDOM, arrBusStopsID, arrBusStopsName, counterForCoordinates, busID);
};

export default busStopsAndTimetableParser;
