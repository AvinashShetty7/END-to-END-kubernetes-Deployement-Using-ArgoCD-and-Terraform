import dotenv from "dotenv";
dotenv.config();
import express from 'express'
import ticketroutes from "./routes/ticketroutes.js"
import userroutes from "./routes/userroutes.js"
import userpublic from "./routes/userpublic.js"
import cors from "cors"
import connectDB  from './db/db.js'
import { checkauth } from "./middleware/auth.js";
import cookieParser from "cookie-parser";

const app = express()
const port = process.env.PORT || 5000
app.use(cookieParser());
app.use(cors({ origin: true , credentials: true}));
console.log('nnnnnnnnnnnnnnnnnnnn');

app.use(express.json());
app.use('/api/userpublic',userpublic)
app.use(checkauth)
app.use('/api/user',userroutes)
app.use('/api/ticket',ticketroutes)


connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1); // stop app if DB connection fails
  });
