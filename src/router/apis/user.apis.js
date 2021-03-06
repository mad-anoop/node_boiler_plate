import resourceLoader from '../../utility/routeHandler';

export default new Promise(async (asyncExport) => {
  const resource = await resourceLoader;

  function user(db) {
    return resource({
      list(req, res) {
        res.send('yoki');
        console.log(db, req);
      },
    });
  }
  asyncExport(user);
  return true;
});
