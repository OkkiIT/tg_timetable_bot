import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  nickName: String,
  numberOfUsages: {
    type: Number,
    default: 0,
  },
  firstTimeUsed: {
    type: Date,
    default: Date.now(),
  },
  chatID: Number,
});

const User = mongoose.model('User', userSchema);
export default User;
