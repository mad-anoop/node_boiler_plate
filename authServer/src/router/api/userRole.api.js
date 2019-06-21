import resourceLoader from '../../utility/routeHandler';
import userRoleControllerLoader from '../../controller/userRole.controller';

const rxjsLoader = 'rxjs/operators';

export default new Promise(async (asyncExport) => {
  const [resource, userRoleController, { take }] = await Promise.all([
    resourceLoader,
    userRoleControllerLoader,
    import(rxjsLoader),
  ]);

  function userRole(db) {
    return resource({
      create(
        req,
        res,
        next,
      ) {
          debugger;
        userRoleController
          .createUserRole(req.body.userRole, db)
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
  asyncExport(userRole);
  return true;
});
