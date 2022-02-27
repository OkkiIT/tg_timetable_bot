import { bot } from '../app.js';
import User from '../models/User.js';
import { START_SCRIPTS } from '../constants/sctipts.js';
import userService from '../services/user.service.js';

const startController = async msg => {
  const {
    chat: { id: chatID },
    from: { username: nickName, first_name: firstName },
  } = msg;
  const currentUser = new User({ firstName, nickName, chatID });
  await userService.saveNewUserToDB(currentUser);

  START_SCRIPTS.forEach(script => {
    const { params, text } = script;
    if (params) {
      bot.sendMessage(chatID, text, params);
      return;
    }
    bot.sendMessage(chatID, text);
  });
};

export default startController;
