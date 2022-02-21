import App from './app.js';
import 'dotenv/config';

const app = new App();
app.connectDataBase();
app.launchBot();
