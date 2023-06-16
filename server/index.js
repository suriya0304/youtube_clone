import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';
import commentRouter from './routes/comments.js';
import videoRouter from './routes/videos.js';
import authRouter from './routes/auth.js';
import cookieParser from 'cookie-parser';
const app = express();
dotenv.config();
const connect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => console.log('connected to db'))
    .catch((err) => console.log('error occured ', err));
};
app.use(cookieParser());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/comments', commentRouter);

app.use('/api/videos', videoRouter);
app.use('/api/auth', authRouter);
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'something went wrong';
  return res.status(status).json({
    status,
    message,
  });
});
app.listen(5000, () => {
  connect();
  console.log('Connected to port 5000');
  console.log('new build');
});
