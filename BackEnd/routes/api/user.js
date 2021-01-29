const router = require("express").Router();
const postgresClient = require("../../conn");
const crypto = require("crypto");

var log4js = require("log4js");
var logger = log4js.getLogger();

logger.level = "debug";

router.post("/user", async (req, resp) => {
  const hash = crypto.createHmac("sha256", req.body.password).digest("hex");
  const client = await postgresClient.connect();
  //first verify if email exist
  try {
    const res = await client.query(
      `SELECT email from db_usuario where email = '${req.body.email}'`
    );
    logger.debug("Reponse from sql verify email:", res.rows[0]);
    logger.debug("Hello value", !(res.rows.length > 0));

    if (!(res.rows.length > 0)) {
      const values = [req.body.name, hash, req.body.email];

      logger.debug("data for user to create:", values);

      // async/await
      try {
        const res = await client.query(
          "insert into db_usuario (name,password_hash,email) values ($1,$2,$3)",
          values
        );
        return resp.send(true);
      } catch (err) {
        logger.error(err.stack);
        return resp.send(false);
      } finally {
        client.release();
      }
    } else {
      logger.error("email ja existe");
      return resp.status(400).send("email já existe");
    }
  } catch (err) {
    logger.error(err.stack);
    return resp.send(false);
  } finally {
    client.release();
  }
});

module.exports = router;
