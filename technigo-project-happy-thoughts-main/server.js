import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import thoughtsRoutes from './routes/thoughts.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.use('/thoughts', thoughtsRoutes);

app.get('/', (req, res) => {
  res.send('Happy Thoughts API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on https://nathalie-happy-thoughts-api.onrender.com:${10000}`);
});

