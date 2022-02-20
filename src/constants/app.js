import TelegramBot from 'node-telegram-bot-api';
import 'dotenv/config';
const token = process.env._TOKEN;
const bot = new TelegramBot(token, { polling: true });

export default bot;
