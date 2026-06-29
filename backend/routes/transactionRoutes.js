const express = require("express");

const router = express.Router();

const transactionController = require("../controllers/transactionController");

router.post("/receive", transactionController.receiveStock);

module.exports = router;