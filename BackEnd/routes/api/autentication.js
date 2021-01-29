const router = require("express").Router();
const postgresClient = require("../../conn");
const crypto = require("crypto");
var jwt = require("jsonwebtoken");
var log4js = require("log4js");
var logger = log4js.getLogger();

logger.level = "debug";

router.post("/login", async (req, resp) => {
  //create hash of the password
  const hash = crypto.createHmac("sha256", req.body.password).digest("hex");
  logger.info("Email", req.body.email);
  logger.info("Hash", hash);

  const client = await postgresClient.connect();

  try {
    const response = await client.query(
      `SELECT name, id_usuario from db_usuario where email = '${req.body.email}' and password_hash = '${hash}'`
    );
    if (!response.rows[0]) {
      return resp.status(403).send("Invalid Login");
    }
    logger.debug("Response from sql Login:", response.rows[0]);
    //generete the jwt Token
    var token = jwt.sign({ id: response.rows[0].id_usuario }, "segredo", {
      expiresIn: 3600, // expires in 1 hour
    });
    return resp.send({
      name: response.rows[0].name,
      token: token,
    });
  } catch (err) {
    logger.error(err.stack);
    return resp.status(400).send("Error");
  } finally {
    client.release();
  }
});

router.get("/logout", function (req, resp) {
  resp.status(200).send({ token: null });
});

module.exports = router;
