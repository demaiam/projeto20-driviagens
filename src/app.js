import cors from "cors";
import dotenv from "dotenv";
import express, { json } from "express";
import "express-async-errors";
import router from './routes/index.routes.js';
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

dotenv.config();
app.use(json());
app.use(cors());
app.use(router);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`)
});