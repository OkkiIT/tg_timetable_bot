import mongoose from 'mongoose';
import { config } from 'dotenv';
import bot from '../constants/app.js';

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
    bot.onText(/\/start/, (msg) => startController(msg));
    bot.on('location',(msg) => locationController(msg));
    bot.onText(/\/refreshDB/,(msg) => refreshDBController(msg));
  }
}

export default App;
