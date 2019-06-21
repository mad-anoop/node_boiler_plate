import errorLogger from './config/elasticSearch';
import logger from './utility/logger';
import server from './app';
import config from './config/config';
import Db from './config/db';

async function initProcess() {
  const result = await Db.init();
  const db = result.connection();
  const app = await server(db, errorLogger);
  app.listen(config.PORT, () => logger(`Listening on port ${config.PORT}!`, config));
}

initProcess();

// memwatch.on('leak', () => {
//   heapdump.writeSnapshot();
// });
