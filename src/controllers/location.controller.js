import userService from '../services/user.service.js';
import busStopService from '../services/busStop.service.js';
import findTimetableAndSendItToUser from '../helpers/findTimetableAndSendItToUser.js';

const locationController = async msg => {
  const {
    chat: { id: chatID },
    from: { username: nickName, first_name: firstName },
    location: { longitude: currentLongitude, latitude: currentLatitude },
  } = msg;

  const currentUser = await userService.findUser({ chatID });
  await userService.updateUserInformation(currentUser, nickName, firstName);
  const twoClosestBusStops = await busStopService.findTwoClosestBusStops(currentLatitude, currentLongitude);

  try {
    await findTimetableAndSendItToUser(twoClosestBusStops[0], chatID);
    await findTimetableAndSendItToUser(twoClosestBusStops[1], chatID);
  } catch (err) {
    console.log(err);
  }
};

export default locationController;
