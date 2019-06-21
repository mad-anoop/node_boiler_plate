import requestCountry from 'request-country';

class Logger {
  #res = {
    executed_at: null,
    execution_time: null,
    req_ip: null,
    method: null,
    original_url: null,
    country: null,
    status_code: null,
    error: null,
    message: null,
  };

  #logger;

  setLogger(logger) {
    this.#logger = logger;
    return this;
  }

  setRequest(req) {
    this.#res.executed_at = req.startAt;
    this.#res.execution_time = Date.now() - req.startAt;
    this.#res.req_ip = req.ip;
    this.#res.method = req.method;
    this.#res.original_url = req.originalUrl;
    this.#res.country = requestCountry(req);
    return this;
  }

  setStatusCode(statusCode) {
    this.#res.status_code = statusCode || 500;
    return this;
  }

  setError(error) {
    this.#res.error = error;
    return this;
  }

  setMessage(message) {
    this.#res.message = message;
    return this;
  }

  execute() {
    this.#logger.errorLog(this.#res);
    return false;
  }
}
export default new Logger();
