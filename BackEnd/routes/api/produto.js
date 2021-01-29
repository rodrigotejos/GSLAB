const router = require("express").Router();
const postgresClient = require("../../conn");
const crypto = require("crypto");
const { verifyJWT } = require("../../utils/autorization");

var log4js = require("log4js");
var logger = log4js.getLogger();

const yup = require("yup");

logger.level = "debug";

//get specific porduto
router.get("/produto", async (req, resp) => {
  //validation
  const { nome } = req.query;

  const data = {
    nome,
  };

  const schema = yup.object().shape({
    nome: yup.string().required("Falta o nome"),
  });

  await schema.validate(data, { abortEarly: false });
  //end of validation

  const client = await postgresClient.connect();
  try {
    const response = await client.query(
      `select nome,descri,valor from db_produto where nome = '${nome}' `
    );
    logger.debug("Response :::: ", response.rows[0]);
    return resp.send(response.rows[0]);
  } catch (err) {
    logger.error(err.stack);
    return resp.status(500).send("error");
  } finally {
    client.release();
  }
});
router.get("/produto/all", async (req, resp) => {
  const client = await postgresClient.connect();
  try {
    const response = await client.query(
      `select nome,descri,valor from db_produto`
    );
    logger.debug("Response :::: ", response.rows);
    return resp.send(response.rows);
  } catch (err) {
    logger.error(err.stack);
    return resp.status(500).send("error");
  } finally {
    client.release();
  }
});
router.post("/produto", async (req, resp) => {
  //validation
  const { nome, descri, valor } = req.body;

  const data = {
    nome,
    descri,
    valor,
  };

  const schema = yup.object().shape({
    nome: yup.string().required("Falta o nome"),
    descri: yup.string().required("Falta o descri"),
    valor: yup.string().required("Falta o valor"),
  });

  await schema.validate(data, { abortEarly: false });
  //end of validation

  const client = await postgresClient.connect();
  const values = [req.body.nome, req.body.descri, req.body.valor];
  try {
    const response = await client.query(
      `insert into db_produto (nome,descri,valor) values($1,$2,$3)`,
      values
    );
    return resp.send(true);
  } catch (err) {
    logger.error(err.stack);
    return resp.send(false);
  } finally {
    client.release();
  }
});

router.put("/produto/descri", async (req, resp) => {
  //validation
  const { nome, descri } = req.body;

  const data = {
    nome,
    descri,
  };

  const schema = yup.object().shape({
    nome: yup.string().required("Falta o nome"),
    descri: yup.string().required("Falta o descri"),
  });

  await schema.validate(data, { abortEarly: false });
  //end of validation

  const client = await postgresClient.connect();
  const values = [req.body.nome, req.body.descri];
  try {
    const response = await client.query(
      `update db_produto SET descri = $2 where nome = $1`,
      values
    );
    return resp.send(true);
  } catch (err) {
    logger.error(err.stack);
    return resp.send(false);
  } finally {
    client.release();
  }
});
router.put("/produto/valor", async (req, resp) => {
  //validation
  const { nome, valor } = req.body;

  const data = {
    nome,
    valor,
  };

  const schema = yup.object().shape({
    nome: yup.string().required("Falta o nome"),
    valor: yup.string().required("Falta o valor"),
  });

  await schema.validate(data, { abortEarly: false });
  //end of validation

  const client = await postgresClient.connect();
  const values = [req.body.nome, req.body.valor];
  try {
    const response = await client.query(
      `update db_produto SET valor = $2 where nome = $1`,
      values
    );
    return resp.send(true);
  } catch (err) {
    logger.error(err.stack);
    return resp.send(false);
  } finally {
    client.release();
  }
});
router.delete("/produto", async (req, resp) => {
  //validation
  const { nome } = req.body;

  const data = {
    nome,
  };

  const schema = yup.object().shape({
    nome: yup.string().required("Falta o nome"),
  });

  await schema.validate(data, { abortEarly: false });
  //end of validation

  const client = await postgresClient.connect();
  const values = [req.body.nome];
  try {
    const response = await client.query(
      `delete from db_produto where nome = $1`,
      values
    );
    return resp.send(true);
  } catch (err) {
    logger.error(err.stack);
    return resp.send(false);
  } finally {
    client.release();
  }
});
module.exports = router;
