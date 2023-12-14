import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from './db/database';
import express from 'express';
import astrologerRoute from "./routes/astrologerRoute"

// COnfigure env
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/api", astrologerRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});