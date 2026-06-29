const transaction = require("../models/transactionModel");

exports.receiveStock = async (req, res) => {

    try {

        const {
            item_id,
            source,
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