const formatResponse = (success, status, message, data) => {
  return {
    success,
    status: status || null,
    message,
    data,
  };
};

module.exports = formatResponse;
