const { ctrlWrapper } = require("../helpers");
const db = require("../config/db");

const getDeals = async (req, res) => {
  const sql = "SELECT * FROM dealsInfo";

  db.query(sql, function (err, result) {
    if (err) {
      res.status(500).json({ message: "Ошибка выполнения SQL-запроса" });
      return;
    }

    res.status(200).json({ deals: result });
  });
};

module.exports = {
  getDeals: ctrlWrapper(getDeals),
};
