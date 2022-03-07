import BusesIds from '../models/BusStopsID.js';

class BusStopIDsService {
  busStopIDs = BusesIds;

  async getAllBusesID() {
    return this.busStopIDs.findOne({}).lean();
  }
}

const busStopIDsService = new BusStopIDsService();
export default busStopIDsService;
