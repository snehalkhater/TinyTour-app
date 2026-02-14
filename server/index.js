import express from 'express';
import cors from 'cors';
import connectDB from './db.js';
import dotenv from 'dotenv';

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Tiny Tours API',
  });
});

app.get('/health',(req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is healthy',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});