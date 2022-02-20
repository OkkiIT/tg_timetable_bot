import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RouteSchema = new Schema({
  busID: Number,
  name: String,
  globalName: String,
  busStopsIDs: Array,
});

const Route = mongoose.model('Route', RouteSchema);
export default Route;
