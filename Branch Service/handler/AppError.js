class AppError {
  constructor(statusCode = 500, errMessage = "Internal server error") {
    this.statusCode = statusCode;
    this.errMessage = errMessage;
    this.causedBy = "";
  }
}

class DuplicateKeyError extends AppError {
  constructor(causedBy) {
    super(400, "Duplicate Key Error");
    this.causedBy = causedBy;
  }
}

class NotFoundError extends AppError {
  constructor(causedBy) {
    super(404, "Not Found Error");
    this.causedBy = causedBy;
  }
}

class BadRequestError extends AppError {
  constructor(causedBy) {
    super(400, "Bad Request Error");
    this.causedBy = causedBy;
  }
}

class ValidationError extends AppError {
  constructor(causedBy) {
    super(400, "Validation Error");
    this.causedBy = causedBy;
  }
}

module.exports = {
  DuplicateKeyError,
  NotFoundError,
  BadRequestError,
  ValidationError,
};
