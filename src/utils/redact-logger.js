const SensitiveKeys = require("../constants/logger/sensitive-keys.const");
const SpecialMessages = require("../constants/messages/special-messages.const");

const sensitiveKeysList = Object.values(SensitiveKeys);

const redactLogData = (data) => {
  if (typeof data === "object" && !data.constructor.name.startsWith("model")) {
    if (Array.isArray(data)) {
      return data.map((item) => redactLogData(item));
    }

    const redactedData = {};

    for (const key in data) {
      if (sensitiveKeysList.includes(key)) {
        redactedData[key] = SpecialMessages.Redacted;
      } else {
        redactedData[key] = redactLogData(data[key]);
      }
    }

    return redactedData;
  } else {
    return data;
  }
};

module.exports = redactLogData;
