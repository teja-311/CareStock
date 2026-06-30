const express = require("express");

const router = express.Router();

const transactionController = require("../controllers/transactionController");

router.post("/receive", transactionController.receiveStock);

router.post("/issue", transactionController.issueStock);

router.get("/:itemId", transactionController.getTransactionHistory);

module.exports = router;