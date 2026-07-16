const inventory = require("../models/inventoryModel");

// GET
exports.getItems = async(req,res)=>{

    try{

        const includeInactive = req.query.includeInactive === "true";

        const data=await inventory.getAllItems(includeInactive);

        res.status(200).json({
            success: true,
            count: data.length,
            data
        });

    }catch(err){

        console.error("Inventory Error:", err.message);

        res.status(500).json({
            message:"Failed to fetch inventory."
        });

    }

};

// POST
exports.createItem = async (req, res) => {
    try {

        const {
            item_name,
            category_id,
            unit,           
            minimum_stock
        } = req.body;

        if (
            !item_name ||
            !category_id ||
            !unit ||           
            minimum_stock == null
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields."
            });
        }

        const result = await inventory.addItem(req.body);

        res.status(201).json({
            success: true,
            message: "Item added successfully.",
            itemId: result.insertId
        });

    } catch (err) {

        console.error("Inventory Error:", err.message);

        res.status(500).json({
            success: false,
            message: "Unable to add item."
        });

    }
};

// PUT
exports.updateItem=async(req,res)=>{

    try{

        await inventory.updateItem(req.params.id,req.body);

        res.json({
            message:"Item updated."
        });

    }catch(err){

        console.error("Inventory Error:", err.message);

        res.status(500).json({
            message:"Update failed."
        });

    }

};

// PATCH
exports.deactivateItem=async(req,res)=>{

    try{

        await inventory.deactivateItem(req.params.id);

        res.json({
            message:"Item deactivated."
        });

    }catch(err){

        console.error("Inventory Error:", err.message);

        res.status(500).json({
            message:"Unable to deactivate."
        });

    }

};