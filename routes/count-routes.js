const express = require("express");
const countController = require("../controllers/count-controller");

const router = express.Router();

router.get("/users-listings-count", countController.listingsAndUsersCount);

module.exports = router;
