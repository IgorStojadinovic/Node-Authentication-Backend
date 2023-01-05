const express = require("express");
const router = express.Router();
const path = require("path");

// RegEx : must start with / and with / or /index(optional .html)
router.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

module.exports = router;
