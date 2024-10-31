const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router
  .route("/users")
  .post(userController.createUsers)
  .get(userController.getAllUsers);

router.route("/users/length").get(userController.getTotalLength);

module.exports = router;
