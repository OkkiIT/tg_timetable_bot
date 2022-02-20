import User from '../models/User.js';
import emptyObjectDetection from '../helpers/emptyObjectDetection.js';

class UserService {
  users = User;

  async findUser(params) {
    return this.users.findOne(params);
  }

  async saveUserToDB(user) {
    try {
      await user.save();
    } catch (err) {
      console.log('User not saved:', err);
    }
  }

  async saveNewUserToDB(currentUser) {
    const newUser = emptyObjectDetection(await this.findUser({ chatID: currentUser.chatID }));
    if (!newUser) {
      return;
    }
    currentUser.numberOfUsage += 1;

    try {
      await this.saveUserToDB(currentUser);
    } catch (err) {
      console.log('New user not save:', err);
    }
  }
}

const userService = new UserService();
export default userService;
