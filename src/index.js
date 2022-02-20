import App from './services/app.service.js';
import 'dotenv/config';

const app = new App();
app.connectDataBase();
app.launchBot();
