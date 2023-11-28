const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/auth-controller");
// const { isUserInTableLogin } = require("../../middlewares");

// SignUp
router.post("/register", ctrl.register);

// SignIn
router.post("/login", ctrl.login);

// Logout
router.post("/logout", ctrl.logout);

module.exports = router;
