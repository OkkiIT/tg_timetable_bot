import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BusesIDSchema = new Schema({
  ID: String,
});

const BusesIds = mongoose.model('BusesID', BusesIDSchema);
export default BusesIds;
