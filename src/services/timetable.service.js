import Timetable from '../models/Timetable.js';

class TimetableService {
  timeTables = Timetable;

  async findTimetables(route, params) {
    const timetables = await this.timeTables.find(params, 'timing').lean();
    return { ...route, timetables };
  }
}

const timetableService = new TimetableService();
export default timetableService;
