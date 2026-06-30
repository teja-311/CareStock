const express = require("express");

const router = express.Router();

const dashboardController = require("../controllers/dashboardController");

router.get("/summary", dashboardController.getSummary);

router.get("/low-stock", dashboardController.getLowStockItems);

router.get("/near-expiry", dashboardController.getNearExpiryItems);

module.exports = router;