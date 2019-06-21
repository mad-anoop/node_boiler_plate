import resourceLoader from '../../utility/routeHandler';
import userControllerLoader from '../../controller/user.controller';

const rxjsLoader = 'rxjs/operators';

export default new Promise(async (asyncExport) => {
  const [resource, userController, { take }] = await Promise.all([
    resourceLoader,
    userControllerLoader,
    import(rxjsLoader),
  ]);

  function login(db) {
    return resource({
      create(
        { body, user },
        res,
        next,
      ) {
        userController
          .login(user, body, db)
          .pipe(take(1))
          .subscribe(
            (value) => {
              res.status(value.statusCode).json(value);
            },
            (error) => {
              next(error);
            },
          );
      },
    });
  }
  asyncExport(login);
  return true;
});
