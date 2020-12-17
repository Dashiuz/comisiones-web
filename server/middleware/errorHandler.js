class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, res) => {
  const { statusCode, message } = err;
  res.status(statusCode).send({
    name: "Error",
    status: statusCode,
    msg: message,
  });
};

module.exports = {
  ErrorHandler,
  handleError,
};
