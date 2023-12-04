const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const token = jwt.sign({ user }, process.env.SECRET_KEY, {
    expiresIn: "23h",
  });
  return token;
};

module.exports = generateToken;
