const db = require("../config/db");

const getSummary = async () => {

    const [[totalItems]] = await db.query(`
        SELECT COUNT(*) AS totalItems
        FROM inventory_items
        WHERE is_active = TRUE;
    `);

    const [[lowStock]] = await db.query(`
        SELECT COUNT(*) AS lowStock
        FROM inventory_items
        WHERE current_stock <= minimum_stock
        AND is_active = TRUE;
    `);

    const [[nearExpiry]] = await db.query(`
        SELECT COUNT(*) AS nearExpiry
        FROM inventory_items
        WHERE expiry_date IS NOT NULL
        AND expiry_date <= DATE_ADD(CURDATE(), INTERVAL expiry_alert_days DAY)
        AND is_active = TRUE;
    `);

    const [[receivedToday]] = await db.query(`
        SELECT COUNT(*) AS receivedToday
        FROM inventory_transactions
        WHERE transaction_type='RECEIVED'
        AND DATE(transaction_date)=CURDATE();
    `);

    const [[issuedToday]] = await db.query(`
        SELECT COUNT(*) AS issuedToday
        FROM inventory_transactions
        WHERE transaction_type='ISSUED'
        AND DATE(transaction_date)=CURDATE();
    `);

    return {
        totalItems: totalItems.totalItems,
        lowStock: lowStock.lowStock,
        nearExpiry: nearExpiry.nearExpiry,
        receivedToday: receivedToday.receivedToday,
        issuedToday: issuedToday.issuedToday
    };

};

const getLowStockItems = async () => {

    const [rows] = await db.query(`
        SELECT
            item_id,
            item_name,
            current_stock,
            minimum_stock,
            unit
        FROM inventory_items
        WHERE current_stock <= minimum_stock
        AND is_active = TRUE
        ORDER BY current_stock ASC;
    `);

    return rows;

};

const getNearExpiryItems = async () => {

    const [rows] = await db.query(`
        SELECT
            item_id,
            item_name,
            expiry_date,
            current_stock,
            unit
        FROM inventory_items
        WHERE expiry_date IS NOT NULL
        AND expiry_date <= DATE_ADD(CURDATE(), INTERVAL expiry_alert_days DAY)
        AND is_active = TRUE
        ORDER BY expiry_date ASC;
    `);

    return rows;

};

module.exports = {
    getSummary,
    getLowStockItems,
    getNearExpiryItems
};