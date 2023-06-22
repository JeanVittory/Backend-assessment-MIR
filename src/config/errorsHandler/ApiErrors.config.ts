export class ApiError extends Error {
  readonly status: number;
  readonly message: string;
  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }

  static BadRequest(message?: string) {
    return new ApiError(400, `${message || 'Bad request.'}`);
  }

  static Unauthorized(message?: string) {
    return new ApiError(401, `${message || 'Authentication credential failed.'}`);
  }

  static Forbbiden(message?: string) {
    return new ApiError(403, `${message || 'Authorization denied.'}`);
  }

  static NotFound(message?: string): ApiError {
    return new ApiError(404, `${message || 'Not Found.'}`);
  }

  static Internal(message: string): ApiError {
    return new ApiError(500, `${message || 'Internal server error.'}`);
  }
}
