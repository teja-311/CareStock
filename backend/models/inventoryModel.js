const db = require("../config/db");

// Get all active inventory items
const getAllItems = async (includeInactive = false) => {

    const whereClause = includeInactive ? "" : "WHERE i.is_active = TRUE";

    const [rows] = await db.query(`
        SELECT
            i.item_id,
            i.item_name,
            i.category_id,
            c.category_name,
            i.unit,
            i.current_stock,
            i.minimum_stock,
            i.expiry_date,
            i.expiry_alert_days,
            i.notes,
            i.is_active
        FROM inventory_items i
        JOIN inventory_categories c
            ON i.category_id = c.category_id
        ${whereClause}
        ORDER BY i.item_name;
    `);

    return rows;
};

// Add new inventory item
const addItem = async (item) => {

    const sql = `
        INSERT INTO inventory_items
        (
            item_name,
            category_id,
            unit,
            current_stock,
            minimum_stock,
            expiry_date,
            expiry_alert_days,
            notes
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        item.item_name,
        item.category_id,
        item.unit,
        item.current_stock,
        item.minimum_stock,
        item.expiry_date,
        item.expiry_alert_days,
        item.notes
    ];

    const [result] = await db.query(sql, values);

    return result;
};

// Update item
const updateItem = async (id, item) => {

    const sql = `
        UPDATE inventory_items
        SET
            item_name=?,
            category_id=?,
            unit=?,
            minimum_stock=?,
            expiry_date=?,
            expiry_alert_days=?,
            notes=?
        WHERE item_id=?;
    `;

    const values = [
        item.item_name,
        item.category_id,
        item.unit,
        item.minimum_stock,
        item.expiry_date,
        item.expiry_alert_days,
        item.notes,
        id
    ];

    const [result] = await db.query(sql, values);

    return result;
};

// Soft delete
const deactivateItem = async(id)=>{

    const [result]=await db.query(
        `
        UPDATE inventory_items
        SET is_active=FALSE
        WHERE item_id=?;
        `,
        [id]
    );

    return result;
};

module.exports={
    getAllItems,
    addItem,
    updateItem,
    deactivateItem
};