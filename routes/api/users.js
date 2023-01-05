const express = require("express");
const router = express.Router();
const path = require("path");
const usersController = require("../../controllers/usersController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  //Only users with Admin role can access this
  .get(verifyRoles(ROLES_LIST.Admin), usersController.getAllUsers)
  .post()
  .put(verifyRoles(ROLES_LIST.Admin), usersController.updateUser)
  .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser);

router.route("/:id").get();

module.exports = router;
