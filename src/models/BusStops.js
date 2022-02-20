import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const busStopSchema = new Schema({
  ID: String,
  name: String,
  longitude: Number,
  latitude: Number,
});

const BusStop = mongoose.model('BusStop', busStopSchema);
export default BusStop;
