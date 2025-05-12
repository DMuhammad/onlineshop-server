const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const router = require("./routes");
const responseInterceptor = require("./middlewares/response-interceptor");
require("dotenv").config();

const app = express();

// middlewares
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN || "http://localhost:5173",
  })
);
app.use(cookieParser());
app.use(errorHandler);
app.use(responseInterceptor);

app.use("/api", router);

module.exports = app;
