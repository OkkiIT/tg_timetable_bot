import needle from 'needle';
import busStopIDsService from '../services/busStopIDs.service.js';
import { JSDOM } from 'jsdom';
import routeParser from '../parsers/routeParser.js';
import removeDuplicates from '../helpers/removeDuplicates.js';
import busStopService from '../services/busStop.service.js';
import routeService from '../services/route.service.js';
import timetableService from '../services/timetable.service.js';
import busStopsAndTimetableParser from '../parsers/busStopsAndTimetableParser.js';

const refreshDBController = async msg => {
  const {
    chat: { id: userID },
  } = msg;
  const adminID = process.env._ADMIN_ID;
  if (userID !== Number(adminID)) {
    return;
  }
  const { ID: busesIDs } = await busStopIDsService.getAllBusesID();
  const arrOfBusIDs = busesIDs.split(',');
  let counterForCoordinates = 0;
  const busStopsArr = [];
  const timetableArr = [];
  const routesArr = [];

  for (let id of arrOfBusIDs) {
    const URL = `https://mlife.by/raspisanie/avtobus/${id}/`;
    const response = await needle('get', URL);
    const urlPageDOM = new JSDOM(response.body.toString(), {
      querySelector: true,
    }).window.document;

    routesArr.push(routeParser(urlPageDOM, id));
    const timeTables = busStopsAndTimetableParser(urlPageDOM, counterForCoordinates, id, busStopsArr);
    timetableArr.push(...timeTables);
    counterForCoordinates++;

    urlPageDOM.close;
  }
  const filteredBusStops = removeDuplicates(busStopsArr);

  try {
    await busStopService.saveNewBusStops(filteredBusStops);
    await routeService.saveNewRoute(routesArr);
    await timetableService.saveNewTimetables(timetableArr);
  } catch (err) {
    console.log('cannt update DB', err);
  }
};

export default refreshDBController;
