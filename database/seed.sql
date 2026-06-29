USE carestock_db;

-- =====================================================
-- USERS
-- =====================================================

INSERT INTO users (full_name, email, password_hash, role)
VALUES
(
'Administrator',
'admin@carestock.com',
'$2b$10$abcdefghijklmnopqrstuv123456789012345678901234567890',
'admin'
),
(
'NGO Staff',
'staff@carestock.com',
'$2b$10$abcdefghijklmnopqrstuv123456789012345678901234567890',
'staff'
);

-- =====================================================
-- INVENTORY CATEGORIES
-- =====================================================

INSERT INTO inventory_categories (category_name)
VALUES
('Food'),
('Medicine'),
('Hygiene'),
('Education'),
('Cleaning'),
('Clothing'),
('Stationery'),
('Other');

-- =====================================================
-- INVENTORY ITEMS
-- =====================================================

INSERT INTO inventory_items
(item_name, category_id, unit, current_stock, minimum_stock, expiry_date, expiry_alert_days, notes)
VALUES

('Rice',1,'kg',120,30,NULL,30,'Main food supply'),

('Wheat Flour',1,'kg',80,20,NULL,30,''),

('Cooking Oil',1,'litres',45,15,'2026-12-20',30,''),

('Paracetamol 500mg',2,'strips',55,20,'2026-09-15',60,''),

('Bandages',2,'boxes',25,10,'2027-03-10',60,''),

('Adult Diapers',3,'pieces',90,30,NULL,30,''),

('Soap',3,'pieces',150,50,'2028-01-10',30,''),

('Notebooks',4,'pieces',60,20,NULL,30,''),

('Pens',7,'pieces',100,25,NULL,30,''),

('Floor Cleaner',5,'litres',18,8,'2027-05-01',30,'');

-- =====================================================
-- INVENTORY TRANSACTIONS
-- =====================================================

INSERT INTO inventory_transactions
(item_id, transaction_type, quantity, source, remarks, created_by)
VALUES

(1,'IN',100,'Rotary Club','Food Donation',1),
(1,'OUT',15,'Kitchen','Weekly Consumption',2),

(2,'IN',80,'Local Donor','Monthly Donation',1),

(3,'IN',30,'Purchased','Invoice #101',1),
(3,'OUT',5,'Kitchen','Cooking Use',2),

(4,'IN',50,'Apollo Pharmacy','Medicine Donation',1),
(4,'OUT',8,'Medical Room','Patient Usage',2),

(6,'IN',100,'Lions Club','Donation',1),
(6,'OUT',10,'Residents','Daily Use',2),

(8,'IN',40,'School Volunteers','Education Kit',1),

(10,'IN',20,'Purchased','Cleaning Supplies',1);