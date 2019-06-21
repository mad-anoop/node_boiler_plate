import userQueries from '../queries/user.queries';
import catchEm from '../utility/asyncLoader';
import successBuilderLoader from '../builders/success.builder';
import failureBuilderLoader from '../builders/failure.builder';
import throwCustomError from '../utility/customError';
import { hashValue } from '../utility/bycriptUtils';
import { jwtSign } from '../utility/commonUtility';
import config from '../config/config';
import { userDataTemplate } from '../utility/dataTemplate/user';

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
        try {
          const [userExistErr, userResult] = await catchEm(
            userQueries.init(db).getUserByParams({ email }),
          );
          if (userExistErr) {
            throw throwCustomError(userExistErr).setInfo('Unknown Error', 401);
          }
          if (userResult) {
            throw throwCustomError().setInfo('User Already exists', 409);
          }
          const [hashErr, hashPassword] = await catchEm(
            hashValue(password, 10),
          );
          if (hashErr) {
            throw throwCustomError(hashErr).setInfo('Unkown Error', 401);
          }
          const [registrationErr, registrationResult] = await catchEm(
            userQueries.init(db).createRegistration(email, hashPassword, firstName, lastName),
          );
          if (registrationErr) {
            throw throwCustomError(registrationErr).setInfo('Registration Error', 401);
          }
          if (!registrationResult) {
            throw throwCustomError().setInfo('Registration Error', 401);
          }
          successBuilder
            .setObserver(observer)
            .setData({ email })
            .setMessage('Please check your email to complete the registration')
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

    static loginCb(userData, reqBody, db) {
      return async function observerCb(observer) {
        try {
          debugger;
          const {
            dataValues: {
              email,
            },
          } = userData;

          // userRole not implemented
          const [jwtSignErr, jwtSignResult] = await catchEm(
            jwtSign({ email }, config.JWT_SECRET, config.JWT_ALGORITHM),
          );
          if (jwtSignErr) {
            throw throwCustomError(jwtSignErr).setInfo('Internal sever Error', 500);
          }
          const [userDetailErr, userDetails] = await catchEm(
            userQueries.init(db).getUserDetailsWithCredentials({ email }),
          );
          if (userDetailErr) {
            throw throwCustomError(userDetailErr).setInfo('Internal sever Error', 500);
          }
          debugger;
          const {
            dataValues:{
              person:{
                dataValues:personInfo
              }
            }
          } = userDetails;
          debugger;

          const responseData = {
            ...userDataTemplate(personInfo),
            accessToken: jwtSignResult,
          };
          successBuilder
            .setObserver(observer)
            .setData(responseData)
            .setMessage('Login Success')
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

    createUser(email, password, firstName, lastName, db) {
      return Observable.create(this.constructor.createUserCb(email, password, firstName, lastName, db));
    }

    login(user, reqBody, db) {
      return Observable.create(this.constructor.loginCb(user, reqBody, db));
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
