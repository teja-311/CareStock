const dashboard = require("../models/dashboardModel");

exports.getSummary = async (req, res) => {

    try {

        const summary = await dashboard.getSummary();

        res.status(200).json({
            success: true,
            data: summary
        });

    } catch (err) {

        console.error("Dashboard Error:", err.message);

        res.status(500).json({
            success: false,
            message: "Unable to load dashboard summary."
        });

    }

};

exports.getLowStockItems = async (req, res) => {

    try {

        const items = await dashboard.getLowStockItems();

        res.status(200).json({
            success: true,
            count: items.length,
            data: items
        });

    } catch (err) {

        console.error("Dashboard Error:", err.message);

        res.status(500).json({
            success: false,
            message: "Unable to fetch low stock items."
        });

    }

};

exports.getNearExpiryItems = async (req, res) => {

    try {

        const items = await dashboard.getNearExpiryItems();

        res.status(200).json({
            success: true,
            count: items.length,
            data: items
        });

    } catch (err) {

        console.error("Dashboard Error:", err.message);

        res.status(500).json({
            success: false,
            message: "Unable to fetch near expiry items."
        });

    }

};