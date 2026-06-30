const db = require("../config/db");

const getForecast = async () => {

    const [rows] = await db.query(`

        SELECT

            i.item_id,
            i.item_name,
            i.current_stock,
            i.minimum_stock,
            i.unit,

            IFNULL(
                SUM(
                    CASE
                        WHEN t.transaction_type='ISSUED'
                        THEN t.quantity
                        ELSE 0
                    END
                ),
                0
            ) AS totalIssued,

            GREATEST(
                DATEDIFF(CURDATE(), MIN(t.transaction_date)),
                1
            ) AS totalDays

        FROM inventory_items i

        LEFT JOIN inventory_transactions t
        ON i.item_id=t.item_id

        WHERE i.is_active=TRUE

        GROUP BY i.item_id

        ORDER BY i.item_name;

    `);

    return rows;

};

module.exports = {
    getForecast
};