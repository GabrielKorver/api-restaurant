class AppError {
  message: string;
  statusCode: number;

  constructor(massage: string, statusCode: number = 400) {
    this.message = massage;
    this.statusCode = statusCode;
  }
}

export { AppError };
