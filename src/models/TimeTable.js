import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const timeTableSchema = new Schema({
  timing: String,
  type: String,
  busStopID: String,
  busID: String,
});

const TimeTable = mongoose.model('timeTable', timeTableSchema);
export default TimeTable;
