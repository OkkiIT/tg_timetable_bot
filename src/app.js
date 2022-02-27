import mongoose from 'mongoose';
import TelegramBot from 'node-telegram-bot-api';
import 'dotenv/config';
import startController from './controllers/start.controller.js';
import locationController from './controllers/location.controller.js';
const token = process.env._TOKEN;
export const bot = new TelegramBot(token, { polling: true });

class App {
  dbUrl = process.env._DB_URL;

  async connectDataBase() {
    try {
      await mongoose.connect(this.dbUrl);
      console.log('DB connected');
    } catch (err) {
      console.log('DB is not connected :', err);
      throw new Error();
    }
  }

  async launchBot() {
    bot.onText(/\/start/, msg => startController(msg));
    bot.on('location', msg => locationController(msg));
    bot.onText(/\/refreshDB/, msg => refreshDBController(msg));
  }
}

export default App;
