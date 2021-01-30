const router = require("express").Router();
const postgresClient = require("../../conn");
const crypto = require("crypto");
const { verifyJWT } = require("../../utils/autorization");

var log4js = require("log4js");
var logger = log4js.getLogger();

const yup = require("yup");

logger.level = "debug";

//get specific porduto
router.get("/produto", verifyJWT, async (req, resp) => {
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
router.get("/produto/all", verifyJWT, async (req, resp) => {
  const client = await postgresClient.connect();
  try {
    const response = await client.query(
      `select id_produto, nome, descri, valor from db_produto`
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
router.post("/produto", verifyJWT, async (req, resp) => {
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

router.put("/produto", verifyJWT, async (req, resp) => {
  //validation
  const { id_produto, nome, descri, valor } = req.body;

  const data = {
    id_produto,
    nome,
    descri,
    valor,
  };

  const schema = yup.object().shape({
    id_produto: yup.string().required("Falta o id_produto"),
    nome: yup.string().required("Falta o nome"),
    descri: yup.string().required("Falta o descri"),
    valor: yup.string().required("Falta o valor"),
  });

  await schema.validate(data, { abortEarly: false });
  //end of validation

  const client = await postgresClient.connect();
  const values = [
    req.body.id_produto,
    req.body.nome,
    req.body.descri,
    req.body.valor,
  ];
  try {
    const response = await client.query(
      `update db_produto SET nome = $2, descri = $3, valor= $4 where id_produto = $1`,
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
router.delete("/produto", verifyJWT, async (req, resp) => {
  logger.info("to delete::::::", req.body);
  //validation
  const { id_produto } = req.body;

  const data = {
    id_produto,
  };

  const schema = yup.object().shape({
    id_produto: yup.string().required("Falta o id_produto"),
  });

  await schema.validate(data, { abortEarly: false });
  //end of validation

  const client = await postgresClient.connect();
  const values = [req.body.id_produto];
  try {
    const response = await client.query(
      `delete from db_produto where id_produto = $1`,
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
