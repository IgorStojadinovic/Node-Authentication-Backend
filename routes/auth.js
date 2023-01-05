const express = require("express");
const router = express.Router();
const authController = require("../controllers/authControllers");

//This is /auth
router.post("/", authController.handleLogin);

module.exports = router;
