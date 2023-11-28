const jwt = require("jsonwebtoken");
const db = require("../config/db");

const { ctrlWrapper } = require("../helpers");

const { JWT_SECRET } = process.env;

// Login controller

const login = (req, res) => {
  const { email, password } = req.body;
  const sqlUser = `SELECT * FROM NewTable WHERE email = '${email}' AND password = '${password}'`;

  db.query(sqlUser, async function (err, userResult) {
    if (err) {
      throw err;
    }

    if (userResult.length !== 0) {
      const result = userResult[0];

      const passwordCompare = password === result.password;

      if (!passwordCompare) {
        return res.status(401).json({ error: "Email or password invalid" });
      }
      const payload = {
        id: result.id,
      };

      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
      res.json({
        email,
        token,
      });
    } else {
      return res.status(401).json({ error: "Email or password invalid" });
    }
  });
};

// Register controller

const register = async (req, res) => {
  const { email, password } = req.body;
  const payload = { email };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });

  const sqlUser = `SELECT * FROM NewTable WHERE email = '${email}'`;
  const sql = `INSERT INTO NewTable (email, password, token) VALUES ('${email}', '${password}', '${token}')`;

  try {
    const resultUser = await db.query(sqlUser, function (err, userResult) {
      if (err) {
        throw err;
      }

      if (userResult.length !== 0) {
        return res
          .status(409)
          .json({ error: "User with this email address already exists" });
      } else {
        db.query(sql);

        res.json({
          email,
          password,
          token,
        });
      }
    });
    return resultUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Logout controller

const logout = async (req, res) => {
  res.json({ message: "Logout success" });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
};
