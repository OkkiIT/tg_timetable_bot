import routeService from '../services/route.service.js';
import isWeekend from './isWeekend.js';
import DAY_TYPE from '../constants/dayType.js';
import timetableService from '../services/timetable.service.js';
import filterMatchedTimetables from '../utils/filterMatchedTimetables.js';
import getFinalResult from '../utils/getFinalResult.js';
import getFinalMessageForUser from '../utils/getFinalMessageForUser.js';
import { bot } from '../app.js';

const findTimetableAndSendItToUser = async (busStop, chatId) => {
  const { ID: busStopID, name: busStopName } = busStop;
  const busStopRoutes = await routeService.findeRoute({ busStopsIDs: busStopID });
  const date = new Date();
  let currentHour = date.getHours();
  let currentMin = date.getMinutes();
  let typeOfTheDay = isWeekend() ? DAY_TYPE.WEEKDAY : DAY_TYPE.WEEKEND;

  const busStopRoutesWithTimeTable = [];

  if (currentHour > 23) {
    currentHour -= 24;
  }

  for (let route of busStopRoutes) {
    busStopRoutesWithTimeTable.push(
      await timetableService.findTimetables(route, {
        busStopID: busStopID,
        busID: route.busID,
        type: typeOfTheDay,
      }),
    );
  }

  const filteredRoutes = filterMatchedTimetables(busStopRoutesWithTimeTable, currentHour, currentMin);
  const matchedRoutes = getFinalResult(filteredRoutes);
  const resultMessage = getFinalMessageForUser(matchedRoutes);
  await bot.sendMessage(
    chatId,
    `Остановка - ${busStopName}
  ${resultMessage}`,
  );
};

export default findTimetableAndSendItToUser;
