const formatResponse = (success, message, data) => {
  return {
    success,
    message,
    data,
  };
};

module.exports = formatResponse;
