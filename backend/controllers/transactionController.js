const transaction = require("../models/transactionModel");

exports.receiveStock = async (req, res) => {

    try {

        const {
            item_id,
            reference,
            quantity,
            remarks,
            created_by
        } = req.body;

        // Validation
        if (
            !item_id ||
            !quantity ||
            !created_by
        ) {
            return res.status(400).json({
                success: false,
                message: "Required fields are missing."
            });
        }

        await transaction.receiveStock(req.body);

        res.status(201).json({
            success: true,
            message: "Stock received successfully."
        });

    } catch (err) {

        console.error("Transaction Error:", err.message);

        res.status(500).json({
            success: false,
            message: "Unable to receive stock."
        });

    }

};

exports.issueStock = async (req, res) => {

    try {

        const {
            item_id,
            reference,
            quantity,
            remarks,
            created_by
        } = req.body;

        // Validation
        if (!item_id || !quantity || !created_by) {
            return res.status(400).json({
                success: false,
                message: "Required fields are missing."
            });
        }

        // Quantity should be positive
        if (quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be greater than zero."
            });
        }

        // Check current stock
        const stock = await transaction.getCurrentStock(item_id);

        if (stock.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Item not found."
            });
        }

        if (Number(stock[0].current_stock) < Number(quantity)) {
            return res.status(400).json({
                success: false,
                message: "Insufficient stock."
            });
        }

        await transaction.issueStock({
            item_id,
            reference,
            quantity,
            remarks,
            created_by
        });

        res.status(201).json({
            success: true,
            message: "Stock issued successfully."
        });

    } catch (err) {

        console.error("Transaction Error:", err.message);

        res.status(500).json({
            success: false,
            message: "Unable to issue stock."
        });

    }

};

exports.getTransactionHistory = async (req, res) => {

    try {

        const history = await transaction.getTransactionHistory(
            req.params.itemId
        );

        res.status(200).json({
            success: true,
            count: history.length,
            data: history
        });

    } catch (err) {

        console.error("Transaction Error:", err.message);

        res.status(500).json({
            success: false,
            message: "Unable to fetch transaction history."
        });

    }

};