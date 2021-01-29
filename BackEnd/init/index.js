const bodyParser = require("body-parser");
//const express = require("express");
//const path = require("path");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
//const { verifyJWT } = require("../utils/autorization");

const __ = require("express-async-errors");
const errorHandler = require("../errors/handler");

var log4js = require("log4js");
var logger = log4js.getLogger();

logger.level = "debug";

const middleware = (app) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(helmet());
  app.use(errorHandler);
};

const routes = (app) => {
  const apis = require("../routes/api");
  app.use("/api", apis);
  //app.get("/", (req, res, next) => next());
};

/*const iniServerConfig = (app, dirname) => {
  app.use(express.static(path.join(dirname, "./build")));
  // app.get("/", (req, res) =>);
};*/

const init = (app) => {
  middleware(app);
  routes(app);
};

module.exports = init;
