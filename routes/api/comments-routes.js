const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/comments-controller");

router.get("/", ctrl.getComments);

router.post("/", ctrl.postComment);

module.exports = router;
