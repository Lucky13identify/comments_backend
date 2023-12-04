const fse = require("fs-extra");
const {
  ctrlWrapper,
  uploadCloudinary,
  imageProcessing,
  HttpError,
  generateToken,
  eventEmitter,
} = require("../helpers");
const db = require("../config/db");
const comment = require("../models/comments");

const getComments = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 25;

  const startIndex = (page - 1) * pageSize;

  if (!req.query.page || !req.query.pageSize) {
    const sqlAllComments = "SELECT * FROM comments";

    db.query(sqlAllComments, function (err, result) {
      if (err) {
        throw HttpError(500, "Internal Server Error");
      }

      res.status(200).json({ comments: result });
    });
    return;
  }

  const sql = `SELECT * FROM comments LIMIT ${pageSize} OFFSET ${startIndex}`;

  db.query(sql, function (err, result) {
    if (err) {
      throw HttpError(500, "Internal Server Error");
    }

    res.status(200).json({
      comments: result,
      page,
      pageSize,
      totalComments: result.length,
    });
  });
};

const postComment = async (req, res) => {
  const { user, email, homePage, text } = req.body;

  const isImage = req.files.picture
    ? await imageProcessing(req.files.picture[0])
    : "";

  const isFile = req.files.file
    ? await uploadCloudinary(`./temp/${req.files.file[0].originalname}`)
    : "";

  await comment.validateAsync({ user, email, homePage, text });

  const sql =
    "INSERT INTO comments (user, email, homePage, text, date, imageURL, fileTXT) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [user, email, homePage, text, new Date(), isImage, isFile];

  try {
    await db.query(sql, values, function (err) {
      if (err) {
        throw HttpError(500, err.message);
      }

      fse.emptyDirSync("temp");

      const token = generateToken({ user, email });

      eventEmitter.emit("commentPosted", {
        user,
        email,
        homePage,
        text,
        imageURL: isImage,
        fileTXT: isFile,
        token,
      });

      res.json({
        user,
        email,
        homePage,
        text,
        imageURL: isImage,
        fileTXT: isFile,
        token,
      });
    });
  } catch (error) {
    console.error(error);

    throw HttpError(400, error.message);
  }
};

module.exports = {
  getComments: ctrlWrapper(getComments),
  postComment: ctrlWrapper(postComment),
};
