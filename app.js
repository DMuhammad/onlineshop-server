const express = require("express");
require("dotenv").config();
const { cliLogger } = require("./src/services/logger.service");

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  cliLogger.info(`Server started on port ${PORT} 🚀🚀🚀`);
});
