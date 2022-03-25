const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.controller");
const loginAuth = require("../middlewares/loginAuth");

router.get("/", studentController.index);
router.get("/:id", studentController.show);
router.post("/", loginAuth, studentController.create);
router.put("/:id", loginAuth, studentController.update);
router.delete("/:id", loginAuth, studentController.delete);

module.exports = router;
