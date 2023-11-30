const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/comments-controller");
const { upload } = require("../../middlewares");

router.get("/", ctrl.getComments);

router.post(
  "/",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "picture", maxCount: 1 },
  ]),
  ctrl.postComment
);

module.exports = router;
