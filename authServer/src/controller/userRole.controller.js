/* eslint-disable indent */
import userRoleQueries from '../queries/userRole.queries';
import catchEm from '../utility/asyncLoader';
import successBuilderLoader from '../builders/success.builder';
import failureBuilderLoader from '../builders/failure.builder';
import throwCustomError from '../utility/customError';

const rxjsLoader = 'rxjs';

export default new Promise((async (asyncExport) => {
  const [{ Observable }, successBuilder, failureBuilder] = await Promise.all([
    import(rxjsLoader),
    successBuilderLoader,
    failureBuilderLoader,
  ]);
  class UserRoleController {
    static createUserRoleCb(userRole, db) {
      return async function observerCb(observer) {
        try {
        const [createuserErr, createUserSuccess] = await catchEm(userRoleQueries.init(db).createUserRole(userRole));
            if (createuserErr) {
                throw throwCustomError(createuserErr).setInfo('Unknown Error', 401);
            }
            if (!createUserSuccess) {
                throw throwCustomError(createuserErr).setInfo('Unknown Error', 401);
            }
            successBuilder
            .setObserver(observer)
            .setData({ createUserSuccess })
            .setMessage('User role creation sucess')
            .setStatusCode(200)
            .done();
        } catch (err) {
          const { desciption, statusCode } = err;
          failureBuilder
            .setObserver(observer)
            .setError(err)
            .setMessage(desciption)
            .setStatusCode(statusCode)
            .done();
        }
      };
    }

    createUserRole(useRole, db) {
        return Observable.create(this.constructor.createUserRoleCb(useRole, db));
    }
  }
  asyncExport(new UserRoleController());
  return true;
}));
