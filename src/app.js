const express = require("express");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandler");
const router = require("./routes");
const responseInterceptor = require("./middlewares/response-interceptor");
require("dotenv").config();

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());

// app.use((req, res, next) => {
//   const ApiError = require("./utils/ApiError");
//   next(new ApiError(404, "Resource not found"));
// });
app.use(errorHandler);
app.use(responseInterceptor);

app.use("/api", router);

module.exports = app;
