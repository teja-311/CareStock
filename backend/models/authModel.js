const db = require("../config/db");

const findUserByEmail = async (email) => {

    const [rows] = await db.query(
        `
        SELECT
            user_id,
            full_name,
            email,
            password_hash,
            role,
            is_active
        FROM users
        WHERE email = ?;
        `,
        [email]
    );

    return rows;
};

module.exports = {
    findUserByEmail
};