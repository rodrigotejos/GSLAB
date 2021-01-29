var jwt = require("jsonwebtoken");
var log4js = require("log4js");
var logger = log4js.getLogger();

logger.level = "debug";

const verifyJWT = (req, resp, next) => {
  var token = req.cookies["token"];

  if (req.url === "/login") next(); //dont validate in login
  if (!token) {
    logger.error("No token provided.");
    resp.redirect("/login");
  }

  jwt.verify(token, "segredo", (err, decoded) => {
    // if error in validating send back to login
    if (err) {
      logger.error("Failed to authenticate token");
      resp.redirect("/login");
    }

    req.userID = decoded.id;
    logger.info("Token OK");
    next();
  });
};

module.exports = { verifyJWT };
