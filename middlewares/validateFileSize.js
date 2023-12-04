const validateFileSize = (req, res, next) => {
  const fileSize = req.files.file ? req.files.file[0].size : 0;
  if (fileSize > 100 * 1024) {
    return res.status(400).json({ error: "File size exceeds 100 KB." });
  }
  next();
};

module.exports = validateFileSize;
