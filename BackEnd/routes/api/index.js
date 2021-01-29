const router = require("express").Router();

//api import
const autenticationAPI = require("./autentication");
const produtoAPI = require("./produto");
const userAPI = require("./user");

//router use apis
router.use(autenticationAPI);
router.use(produtoAPI);
router.use(userAPI);

module.exports = router;
