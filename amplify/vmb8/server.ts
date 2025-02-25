import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/db';
import userRoutes from './routes/userRoutes';
import adminRouter from "./routes/admin.router";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

connectDB();


app.use('/', userRoutes);
app.use("/admin", adminRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});