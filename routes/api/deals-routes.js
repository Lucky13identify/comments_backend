const express = require("express");
const deals = require("../../controllers/deals-controller");

const router = express.Router();

router.get("/", deals.getDeals);

module.exports = router;
