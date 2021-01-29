const serverConfig = require("./init");

const startapp = (app) => {
  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log("running on port " + port);
  });
};

const init = (dirname) => (app) => {
  serverConfig(app, dirname);
  startapp(app);
};

module.exports = init;
