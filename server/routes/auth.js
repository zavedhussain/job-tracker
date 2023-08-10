const express = require("express");
const { authenticateUser, registerUser } = require("../controllers/auth");
const router = express.Router();

router.route("/login").post(authenticateUser);
router.route("/register").post(registerUser);
module.exports = router;
