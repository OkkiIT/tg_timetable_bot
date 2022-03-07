import Timetable from '../models/Timetable.js';

class TimetableService {
  timeTables = Timetable;

  async findTimetables(route, params) {
    const timetables = await this.timeTables.find(params, 'timing').lean();
    return { ...route, timetables };
  }

  async saveNewTimetables(arr) {
    await this.timeTables.remove();
    await this.timeTables.insertMany(arr);
  }
}

const timetableService = new TimetableService();
export default timetableService;
