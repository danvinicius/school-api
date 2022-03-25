const express = require("express");
const router = express.Router();
const tokenController = require("../controllers/token.controller");

router.post("/", tokenController.store);

module.exports = router;
