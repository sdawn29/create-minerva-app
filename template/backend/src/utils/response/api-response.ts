export class SuccessResponse<T> {
  public status: string;
  public data: T;

  constructor(data: T, message: string = "Success") {
    this.status = "success";
    this.data = data;
  }

  public send(res: any) {
    res.status(200).json(this);
  }
}

export class ErrorResponse {
  public status: string;
  public error: { name: string; message: string };

  constructor(error: Error, message?: string) {
    this.status = "error";
    this.error = {
      name: error.name,
      message: error.message,
    };
  }

  public send(res: any) {
    let statusCode: number;
    switch (this.error.name) {
      case "NotFoundError":
        statusCode = 404;
        break;
      case "ValidationError":
        statusCode = 400;
        break;
      default:
        statusCode = 500;
        break;
    }
    res.status(statusCode).json(this);
  }
}
