import userLoader from './user.api';
import loginLoader from './login.api';

const expressLoader = 'express';
const userApiValidatorLoader = '../../validator/user.api.validator';

export default new Promise((async (asyncExport) => {
  const result = await Promise.all([
    import(expressLoader),
    userLoader,
    import(userApiValidatorLoader),
    loginLoader,
  ]);

  const [{ default: Router }, user, { default: userApiValidator }, login] = result;
  const router = Router();

  function routerFn(db) {
    router.use('/user', userApiValidator, user(db));
    router.use('/login', userApiValidator, login(db));
    return router;
  }
  asyncExport(routerFn);
  return true;
}));
