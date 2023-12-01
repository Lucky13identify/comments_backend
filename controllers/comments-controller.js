const { ctrlWrapper, uploadCloudinary } = require("../helpers");
const db = require("../config/db");
const fse = require("fs-extra");
const comment = require("../models/comments");

const getComments = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 25;

  const startIndex = (page - 1) * pageSize;

  if (!req.query.page || !req.query.pageSize) {
    const sqlAllComments = "SELECT * FROM comments";
    db.query(sqlAllComments, function (err, result) {
      if (err) {
        res.status(500).json({ message: "Ошибка выполнения GET-запроса" });
        return;
      }

      res.status(200).json({ comments: result });
    });
    return;
  }

  const sql = `SELECT * FROM comments LIMIT ${pageSize} OFFSET ${startIndex}`;

  db.query(sql, function (err, result) {
    if (err) {
      res.status(500).json({ message: "Ошибка выполнения GET-запроса" });
      return;
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
    ? await uploadCloudinary(`./temp/${req.files.picture[0].originalname}`)
    : null;

  const isFile = req.files.file
    ? await uploadCloudinary(`./temp/${req.files.file[0].originalname}`)
    : null;

  if (isFile) {
    const fileSize = req.files.file[0].size;
    if (fileSize > 100 * 1024) {
      return res.status(400).json({ message: "Размер файла превышает 100 КБ" });
    }
  }

  await comment.validateAsync({ user, email, homePage, text });

  const sql = `INSERT INTO comments (user, email, homePage, text, date, imageURL, fileTXT) VALUES ('${user}', '${email}', '${homePage}', '${text}', '${new Date()}', '${isImage}', '${isFile}')`;

  try {
    await db.query(sql, function (err) {
      if (err) {
        throw err;
      }

      fse.emptyDirSync("temp");

      res.json({
        user,
        email,
        homePage,
        text,
        imageURL: isImage,
        fileTXT: isFile,
      });
    });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: "Ошибка валидации данных", error: error.message });
  }
};

module.exports = {
  getComments: ctrlWrapper(getComments),
  postComment: ctrlWrapper(postComment),
};
