const category = require("../models/categoryModel");

// GET
exports.getCategories = async (req, res) => {

    try {

        const data = await category.getAllCategories();

        res.status(200).json({
            success: true,
            count: data.length,
            data
        });

    } catch (err) {

        console.error("Category Error:", err.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch categories."
        });

    }

};