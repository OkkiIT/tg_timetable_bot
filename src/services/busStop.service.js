import BusStops from '../models/BusStops.js';
import findDistanceOfBusStop from '../helpers/findDistanceOfBusStop.js';

class BusStopService {
  busStops = BusStops;

  async findAllBusStops() {
    return this.busStops.find({}).lean();
  }

  async findTwoClosestBusStops(currentLatitude, currentLongitude) {
    const busStops = await this.busStops.find({}).lean();
    const busStopsWithDistance = busStops.map(stop => {
      return {
        ...stop,
        distance: findDistanceOfBusStop(currentLatitude, currentLongitude, stop.latitude, stop.longitude),
      };
    });
    return busStopsWithDistance.sort((a, b) => a.distance - b.distance).slice(0, 2);
  }

  async saveNewBusStops(arr) {
    await this.busStops.remove();
    await this.busStops.insertMany(arr);
  }
}

const busStopService = new BusStopService();
export default busStopService;
