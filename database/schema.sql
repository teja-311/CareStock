-- =====================================================
-- CARESTOCK DATABASE SCHEMA
-- =====================================================

DROP DATABASE IF EXISTS carestock_db;
CREATE DATABASE carestock_db;
USE carestock_db;

-- =====================================================
-- USERS
-- =====================================================

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin','staff') NOT NULL DEFAULT 'staff',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- INVENTORY CATEGORIES
-- =====================================================

CREATE TABLE inventory_categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE
);

-- =====================================================
-- INVENTORY ITEMS
-- =====================================================

CREATE TABLE inventory_items (
    item_id INT AUTO_INCREMENT PRIMARY KEY,

    item_name VARCHAR(150) NOT NULL,

    category_id INT NOT NULL,

    unit VARCHAR(30) NOT NULL,

    current_stock DECIMAL(10,2) NOT NULL DEFAULT 0,

    minimum_stock DECIMAL(10,2) NOT NULL DEFAULT 0,

    expiry_date DATE NULL,

    expiry_alert_days INT DEFAULT 30,

    notes TEXT,

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_category
        FOREIGN KEY(category_id)
        REFERENCES inventory_categories(category_id)
        ON DELETE RESTRICT
);

-- =====================================================
-- INVENTORY TRANSACTIONS
-- =====================================================

CREATE TABLE inventory_transactions (

    transaction_id INT AUTO_INCREMENT PRIMARY KEY,

    item_id INT NOT NULL,

    transaction_type ENUM('RECEIVED','ISSUED','ADJUSTMENT') NOT NULL,

    source ENUM('DONATION','PURCHASE','OTHER') DEFAULT 'OTHER',

    quantity DECIMAL(10,2) NOT NULL CHECK(quantity > 0),

    remarks TEXT,

    created_by INT NOT NULL,

    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_item
        FOREIGN KEY(item_id)
        REFERENCES inventory_items(item_id)
        ON DELETE RESTRICT,

    CONSTRAINT fk_user
        FOREIGN KEY(created_by)
        REFERENCES users(user_id)
        ON DELETE RESTRICT
);

-- =====================================================
-- INDEXES
-- =====================================================

CREATE INDEX idx_item_name
ON inventory_items(item_name);

CREATE INDEX idx_transaction_date
ON inventory_transactions(transaction_date);

CREATE INDEX idx_transaction_item
ON inventory_transactions(item_id);

CREATE INDEX idx_category
ON inventory_items(category_id);