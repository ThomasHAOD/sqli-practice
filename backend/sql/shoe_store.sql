DROP TABLE shoes_orders;
DROP TABLE orders;
DROP TABLE shoes;
DROP TABLE users;

CREATE TABLE users
(
    ID SERIAL PRIMARY KEY,
    email VARCHAR(20),
    password VARCHAR(20),
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    street VARCHAR(30),
    town VARCHAR(15),
    post_code VARCHAR(10)
);

INSERT INTO users
    (email, password, first_name, last_name, street, town, post_code)
VALUES
    ('tam_od@yaya.ya', '123456', 'Tam', 'OD', '1 Street Road', 'Edinburgh', 'EH1 1CC'),
    ('jmikey@yaya.ya', 'Pa55word!', 'Jim', 'Michaels', '14 Fast Lane', 'London', 'W15 3UX'),
    ('jamesS@yaya.ya', 'qwertyqwerty', 'James', 'Stevenson', '234 Moon Cresent', 'Glasgow', 'G1 5UI');

CREATE TABLE shoes
(
    ID SERIAL PRIMARY KEY,
    name VARCHAR(30) not NULL,
    color VARCHAR(10) not NULL,
    size VARCHAR not NULL,
    brand VARCHAR(30) not NULL,
    type VARCHAR(10) not NULL,
    price VARCHAR not NULL,
    stock VARCHAR not NULL
);

INSERT INTO shoes
    (name, color, size, brand, type, price, stock)
VALUES
    ('Cool Air', 'White', '10', 'Psych', 'Trainer', '89.99', '3'),
    ('Cambridge', 'Black', '7', 'Clerks', 'Dress Shoe', '64.99', '1'),
    ('Still Here', 'Red', '5', 'Shoes Galore', 'Highheel', '129.99', '10'),
    ('Tiny Aligator', 'Greed', '13', 'Psych', 'Sandal', '35.99', '15');

CREATE TABLE orders
(
    ID SERIAL PRIMARY KEY,
    user_id INT8 REFERENCES users(id) ON DELETE SET NULL,
    order_date TIMESTAMP NOT NULL DEFAULT NOW(),
    total_cost REAL NOT NULL
);

INSERT INTO orders
    (user_id, total_cost)
VALUES
    (1, 139.99),
    (2, 222.77),
    (1, 85.44),
    (3, 66.66);

CREATE TABLE shoes_orders
(
    ID SERIAL PRIMARY KEY,
    shoe_id INT8 REFERENCES shoes(id) ON DELETE SET NULL,
    order_id INT8 REFERENCES orders(id) ON DELETE SET NULL
);

INSERT INTO shoes_orders
    (shoe_id, order_id)
VALUES
    (1, 3),
    (2, 4),
    (3, 3),
    (1, 1),
    (4, 2);