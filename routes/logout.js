const express = require("express");
const router = express.Router();
const logoutController = require("../controllers/logoutController");

//This is /logout
router.get("/", logoutController.handleLogout);

module.exports = router;
