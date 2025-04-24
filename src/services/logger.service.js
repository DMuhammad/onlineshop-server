const winston = require("winston");
const { randomBytes } = require("crypto");
const DailyRotateFile = require("winston-daily-rotate-file");

const { label, colorize, combine, timestamp, json, printf } = winston.format;
const timestampFormat = "MMM-DD-YYYY HH:mm:ss";
const appVersion = process.env.npm_package_version;
const generateLogId = () => randomBytes(16).toString("hex");

const httpLogger = winston.createLogger({
  format: combine(
    timestamp({ format: timestampFormat }),
    json(),
    printf(({ timestamp, level, message, ...data }) => {
      const response = {
        level,
        logId: generateLogId(),
        timestamp,
        appInfo: {
          appVersion,
          environment: process.env.NODE_ENV,
          processId: process.pid,
        },
        message,
        data,
      };

      return JSON.stringify(response);
    })
  ),
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      filename: "logs/rotating-logs-%DATE%.log",
      datePattern: "MMMM-DD-YYYY",
      zippedArchive: false,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});

const cliLogger = winston.createLogger({
  format: combine(
    label({ label: appVersion }),
    timestamp({ format: timestampFormat }),
    colorize({ level: true }),
    printf(
      ({ level, message, label, timestamp }) =>
        `[${timestamp}] ${level} (${label}): ${message}`
    )
  ),
  transports: [new winston.transports.Console()],
});

module.exports = {
  httpLogger,
  cliLogger,
};
