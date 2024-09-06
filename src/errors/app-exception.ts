// eslint-disable-next-line linebreak-style
class AppException extends Error {
  public status: number;
  public message: string;
  public details: any;

  constructor(status: number, message: string, details?: any) {
    super(message);
    this.status = status;
    this.details = details;
    this.message = message;
  }
}

export default AppException;
