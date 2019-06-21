import passport from 'passport';
import userLoader from './user.api';
import loginLoader from './login.api';
import userRoleLoader from './userRole.api';

const expressLoader = 'express';
const userApiValidatorLoader = '../../validator/user.api.validator';
const loginApiValidatorLoader = '../../validator/login.api.validator';

export default new Promise((async (asyncExport) => {
  const result = await Promise.all([
    import(expressLoader),
    userLoader,
    import(userApiValidatorLoader),
    import(loginApiValidatorLoader),
    loginLoader,
    userRoleLoader,
  ]);

  const [{ default: Router }, user, { default: userApiValidator }, { default: loginApiValidator }, login, userRole] = result;
  const router = Router();

  function routerFn(db) {
    router.use('/user', userApiValidator, user(db));
    router.use('/login', loginApiValidator, passport.authenticate('local', { session: false }), login(db));
    router.use('/userRole', userRole(db));
    return router;
  }
  asyncExport(routerFn);
  return true;
}));
