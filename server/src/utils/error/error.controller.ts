import AppError from "../appError";

const handleCastErrorDB = (err: any) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};
const handleDuplicateFieldsDB = (err: any) => {
  const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  // console.log(value);
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleDuplicateTxIdDB = (err: any) => {
  const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  // console.log(value);
  const message = `TxId of ${value} already exists!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err: any) => {
  const errors = Object.values(err.errors).map((el: any) => el.message);
  let message;
  if (errors.length > 1) {
    message = "Invalid fields on your request: ";
    message += `${errors.join(". ")}`;
  } else {
    message = errors[0];
  }
  // const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const sendErrDev = (err: any, res: any) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const handleJWTError = () => {
  return new AppError("Invalid token. Please login again!", 401);
};
const handleJWTExpiredError = () => {
  return new AppError("Your token has expired, please login again!", 401);
};
// const handleCastError = (err) => {
//   return new AppError(`${err.value} in not a valid ${err.kind}`, 401);
// };

const sendErrorProd = (err: any, res: any) => {
  // Operational, truested error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // Programming or other unknown
  } else {
    // 1) LOG error
    console.error("ERROR 💥", err);
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};

const globalErrorHandler = (err: any, req: any, res: any, next: any) => {
  // console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrDev(err, res);
  } else {
    let error;
    error = err;
    if (err.name === "CastError") error = handleCastErrorDB(err);
    if (err.code === 11000) error = handleDuplicateFieldsDB(err);
    if (err.code === 11000 && err.keyPattern["transactionDetails.txId"] === 1) error = handleDuplicateTxIdDB(err);
    if (err.name === "ValidationError") error = handleValidationErrorDB(err);
    if (err.name === "JsonWebTokenError") error = handleJWTError();
    if (err.name === "TokenExpiredError") error = handleJWTExpiredError();
    // if (err.name === "CastError") error = handleCastError(err);
    sendErrorProd(error, res);
  }

  next();
};

export default globalErrorHandler;
