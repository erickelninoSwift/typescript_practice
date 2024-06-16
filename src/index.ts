import express from "express";
import bodyParser from "body-parser";
import http from "http";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import {
  registerRoute,
  loginRoute,
  AlluserControllerRoutes,
  deleteControllerRoutes,
} from "./routes/index";

dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(registerRoute());
app.use(loginRoute());
app.use(AlluserControllerRoutes());
app.use(deleteControllerRoutes());

const server: http.Server = http.createServer(app);

server.listen(PORT, () => {
  console.log("Connected to server on PORT : ", PORT);
});

mongoose.Promise = Promise;
mongoose.connect(process.env.URI).then(() => {
  console.log("Connected to DB ");
});
mongoose.connection.on("erro", (error: Error) => {
  console.log(`Error found while connecting to mongoDB ${error}`);
});
