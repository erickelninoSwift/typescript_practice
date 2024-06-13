import express from "express";
import bodyParser from "body-parser";
import http from "http";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";

const app = express();
const PORT = 8080;
app.use(
  cors({
    credentials: true,
  })
);

app.use(express.json());
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log("server is running very well ");
});
