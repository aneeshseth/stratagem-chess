const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");
const auth = require("../Middleware/auth");

router.route("/signup").post(userController.signUp);
router.route("/login").post(userController.login);
router.route("/verify").get(auth.verify, userController.checkLogin);

module.exports = router;
