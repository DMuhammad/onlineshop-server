const app = require("./src/app");
const { cliLogger } = require("./src/services/logger.service");
require("dotenv").config();

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  cliLogger.info(`Server started on port: ${PORT}`);
});
