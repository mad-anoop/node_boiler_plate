const failureGeneratorLoader = '../utility/failiure';
const errorHandlerLoader = '../utility/errorHandler';

export default new Promise((async (asyncExport) => {
  const [
    { default: failureGenerator },
    { default: errorHandler },
  ] = await Promise.all([
    import(failureGeneratorLoader),
    import(errorHandlerLoader),
  ]);

  class Failure {
    #observer;

    #error;

    #message;

    #statusCode;

    setObserver(observer) {
      this.#observer = observer;
      return this;
    }

    setError(error) {
      this.#error = error;
      return this;
    }

    setMessage(message) {
      this.#message = message;
      return this;
    }

    setStatusCode(statusCode) {
      this.#statusCode = statusCode;
      return this;
    }

    done() {
      const resp = failureGenerator(
        errorHandler(this.#error),
        this.#statusCode,
        this.#message,
      );
      this.#observer.error(resp);
    }
  }
  asyncExport(new Failure());
}));
