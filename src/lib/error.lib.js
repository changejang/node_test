import status from "http-status";

class ApiError extends Error {
  constructor(statusCode, message, isOperational = true) {
    super(message);
    this.name = status[this.statusCode];
    Object.setPrototypeOf(this, new.target.prototype);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this);
  }
}

// 404 error middleware
const error404 = (req, res, next) => {
  const error = new ApiError(404, "404 Not Found1");
  error.status = 404;
  next(error);
};

// UnauthorizedError and client Error middleware
const errorMiddleware = (err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    return res.status(err.status).send({ message: err.message }).end();
  }
  if (req.xhr) {
    return res.status(500).send({ error: "Something failed!" });
  }
  return next(err);
};

const errorHandler = (err, req, res) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
    },
  });
};

export { ApiError, errorMiddleware, errorHandler, error404 };
