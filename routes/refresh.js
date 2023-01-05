const express = require("express");
const router = express.Router();
const refreshTokenController = require("../controllers/refreshTokenController");

//This is /refresh
router.get("/", refreshTokenController.handleRefreshToken);

module.exports = router;
