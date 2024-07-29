class ApiResponse {
  constructor(statusCode, data, message = "", status = "success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.status = status;
  }
}

export default ApiResponse;
