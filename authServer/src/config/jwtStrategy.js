import throwCustomError from '../utility/customError';
import { comparePassword } from '../utility/bycriptUtils';

const passportLoader = 'passport';
const LocalStrategyLoader = 'passport-local';
const FacebookTokenStrategyLoader = 'passport-facebook-token';
const GoogleStrategicLoader = 'passport-token-google';
const passportJWTLoader = 'passport-jwt';
const userQueriesLoader = '../queries/user.queries';
const asyncLoader = '../utility/asyncLoader';
const configLoader = './config';


export default new Promise((async (asyncExport) => {
  const result = await Promise.all([
    import(passportLoader),
    import(LocalStrategyLoader),
    import(FacebookTokenStrategyLoader),
    import(GoogleStrategicLoader),
    import(userQueriesLoader),
    import(asyncLoader),
    import(configLoader),
    import(passportJWTLoader),
  ]);
  const [
    { default: passport },
    { default: LocalStrategy },
    { default: FacebookTokenStrategy },
    { default: GoogleStrategic },
    { default: userQueries },
    { default: catchEm },
    { default: config },
    {
      default: { ExtractJwt, Strategy: JwtStrategy },
    },
  ] = result;
  const GoogleStrategy = GoogleStrategic.Strategy;
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: config.JWT_SECRET,
    algorithms: config.JWT_ALGORITHM,
  };

  function defineStrategy(app, db) {
    passport.use(
      new JwtStrategy(jwtOptions, (jwtPayload, next) => {
        const user = jwtPayload.token;
        next(null, user);
      }),
    );

    passport.use(
      new LocalStrategy(
        {
          usernameField: 'email',
          passwordField: 'password',
        },
        (async (email, password, done) => {
          try {
            const [error, user] = await catchEm(
              userQueries.init(db).getUserByParams({ email }),
            );
            if (error) {
              throw throwCustomError(error).setInfo('Internal sever Error', 500);
            }
            if (!user) {
              throw throwCustomError().setInfo('User does not exist', 400);
            }
            const [passMatchErr, isMatch] = await catchEm(
              comparePassword(password, user.password),
            );
            if (passMatchErr) {
              throw throwCustomError(passMatchErr).setInfo('Internal sever Error', 500);
            }
            if (!isMatch) {
              throw throwCustomError().setInfo('Invalid Password', 400);
            }
            return done(null, user);
          } catch (err) {
            return done(err);
          }
        }),
      ),
    );

    if (config.FACEBOOK_APP_ID) {
      passport.use(
        new FacebookTokenStrategy(
          {
            clientID: config.FACEBOOK_APP_ID,
            clientSecret: config.FACEBOOK_APP_SECRET,
            profileFields: ['id', 'emails', 'name'],
          },
          ((_accessToken, _refreshToken, user, done) => {
            if (!user.emails || !user.emails[0].value) {
              return done(null, false);
            }
            return done(null, user);
          }),
        ),
      );
    }

    if (config.GOOGLE_CLIENT_ID) {
      passport.use(
        new GoogleStrategy(
          {
            clientID: config.GOOGLE_CLIENT_ID,
            clientSecret: config.GOOGLE_CLIENT_SECRET,
          },
          ((_accessToken, _refreshToken, user, done) => {
            if (!user.emails || !user.emails[0].value) {
              return done(null, false);
            }
            return done(null, user);
          }),
        ),
      );
    }
    app.use(passport.initialize());
  }
  asyncExport(defineStrategy);
}));
