const { httpLogger } = require("../services/logger.service");
const formatHTTPLoggerResponse = require("../utils/format-http-logger-response");

const responseInterceptor = (req, res, next) => {
  const requestStartTime = Date.now();
  const originalSend = res.send;
  let responseSent = false;

  res.send = function (body) {
    if (!responseSent) {
      if (res.statusCode < 400) {
        httpLogger.info(
          "Request completed successfully",
          formatHTTPLoggerResponse(req, res, body, requestStartTime)
        );
      } else {
        httpLogger.error(
          body.message,
          formatHTTPLoggerResponse(req, res, body, requestStartTime)
        );
      }

      responseSent = true;
    }

    return originalSend.call(this, body);
  };

  next();
};

module.exports = responseInterceptor;
