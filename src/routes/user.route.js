const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();
const loginAuth = require("../middlewares/loginAuth");

router.post("/", userController.create);
router.put("/", loginAuth, userController.update);
router.delete("/", loginAuth, userController.delete);

module.exports = router;
