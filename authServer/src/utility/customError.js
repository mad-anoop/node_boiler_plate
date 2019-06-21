class CustomError extends Error {
  constructor(message) {
    super(message);
    this.customError = true;
  }

  setInfo(desciption, statusCode) {
    this.statusCode = statusCode;
    this.desciption = desciption;
    return this;
  }
}

function customError(error = '') {
  return new CustomError(error);
}

export default customError;
