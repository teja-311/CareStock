const db = require("../config/db");

const receiveStock = async (data) => {

    const connection = await db.getConnection();

    try {

        await connection.beginTransaction();

        await connection.query(
            `INSERT INTO inventory_transactions
            (item_id, transaction_type, source, quantity, remarks, created_by)
            VALUES (?, 'RECEIVED', ?, ?, ?, ?)`,
            [
                data.item_id,
                data.reference,
                data.quantity,
                data.remarks,
                data.created_by
            ]
        );

        await connection.query(
            `UPDATE inventory_items
             SET current_stock = current_stock + ?
             WHERE item_id = ?`,
            [data.quantity, data.item_id]
        );

        await connection.commit();

    } catch (err) {

        await connection.rollback();
        throw err;

    } finally {

        connection.release();

    }

};

const getCurrentStock = async (itemId) => {

    const [rows] = await db.query(
        `
        SELECT current_stock
        FROM inventory_items
        WHERE item_id = ?
        AND is_active = TRUE;
        `,
        [itemId]
    );

    return rows;

};

const issueStock = async (data) => {

    const connection = await db.getConnection();

    try {

        await connection.beginTransaction();

        await connection.query(
            `
            INSERT INTO inventory_transactions
            (
                item_id,
                transaction_type,
                reference,
                quantity,
                remarks,
                created_by
            )
            VALUES
            (
                ?,
                'ISSUED',
                ?,
                ?,
                ?,
                ?
            )
            `,
            [
                data.item_id,
                data.reference,
                data.quantity,
                data.remarks,
                data.created_by
            ]
        );

        await connection.query(
            `
            UPDATE inventory_items
            SET current_stock=current_stock-?
            WHERE item_id=?;
            `,
            [
                data.quantity,
                data.item_id
            ]
        );

        await connection.commit();

    }
    catch(err){

        await connection.rollback();

        throw err;

    }
    finally{

        connection.release();

    }

};

const getTransactionHistory = async (itemId) => {

    const [rows] = await db.query(
        `
        SELECT
            transaction_id,
            transaction_type,
            reference,
            quantity,
            remarks,
            transaction_date
        FROM inventory_transactions
        WHERE item_id = ?
        ORDER BY transaction_date DESC;
        `,
        [itemId]
    );

    return rows;

};

module.exports = {
    receiveStock,
    getCurrentStock,
    issueStock,
    getTransactionHistory
};