const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerController");

//This is /register
router.post("/", registerController.handleNewUser);

module.exports = router;
