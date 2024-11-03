import express from 'express';
import dotenv from 'dotenv';
import router from './routes/route';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(router)

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
