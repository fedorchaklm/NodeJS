export class HttpError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class UnauthorizedError extends HttpError {
  constructor() {
    super(401, "Unauthorized");
  }
}

export class NotFoundError extends HttpError {
  constructor() {
    super(404, `Product is not found`);
  }
}
