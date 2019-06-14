import uuidv4 from 'uuid/v4';
import userQueries from '../queries/user.queries';
import catchEm from '../utility/asyncLoader';
import successBuilderLoader from '../builders/success.builder';
import failureBuilderLoader from '../builders/failure.builder';
import { hashValue } from '../utility/hashData';

const rxjsLoader = 'rxjs';

export default new Promise((async (asyncExport) => {
  const [{ Observable }, successBuilder, failureBuilder] = await Promise.all([
    import(rxjsLoader),
    successBuilderLoader,
    failureBuilderLoader,
  ]);
  class UserController {
    // create user
    static createUserCb(email, password, firstName, lastName, db) {
      return async function observerCb(observer) {
        const [hashErr, hashPassword] = await catchEm(
          hashValue(password, 10),
        );
        const [err, result] = await catchEm(
          userQueries.init(db).createRegistration(email, hashPassword, firstName, lastName),
        );
        if (err) {
          failureBuilder
            .setObserver(observer)
            .setError(err)
            .setMessage('query error')
            .setStatusCode(500)
            .done();
          return false;
        }
        successBuilder
          .setObserver(observer)
          .setData({ email })
          .setMessage('Please check your email to complete the registration')
          .setStatusCode(200)
          .done();
        const [, isNewRecord] = result;
        if (isNewRecord) {
          // send email
        }
        return true;
      };
    }

    createUser(email, password, firstName, lastName, db) {
      return Observable.create(this.constructor.createUserCb(email, password, firstName, lastName, db));
    }

    createJWTRegistration(userId){
      
    }

   
    completeRegistration = () => {

    };

    forgotPassword = () => {};

    restPassword = () => {};

    changePassword = () => {};
  }

  asyncExport(new UserController());
  return true;
}));
