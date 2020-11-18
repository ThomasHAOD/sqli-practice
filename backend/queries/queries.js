const Pool = require("pg").Pool;
const pool = new Pool({
    user: "thomasodonnell",
    host: "localhost",
    database: "shoe_store",
    password: "password",
    port: 5432
});

const getShoes = (request, response) => {
    pool.query("SELECT * FROM shoes ORDER BY id ASC", (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const getShoeById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query("SELECT * FROM shoes WHERE id = $1", [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const getShoesByName = (request, response) => {
    const name = request.params.name;

    if (name.length > 3) {
        pool.query(`SELECT * FROM shoes WHERE name = '${name}' `, (error, results) => {
            console.log(results);
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        });
    }
}

const updateShoeStockLevel = (request, response) => {
    const { id, newStockLevel } = request.body;
    if (newStockLevel >= 0) {
        pool.query(
            "UPDATE shoes SET stock = $2 WHERE id = $1 RETURNING stock",
            [id, newStockLevel],
            (error, results) => {
                if (error) {
                    throw error;
                }
                response.status(201).json(results.rows);
            }
        );
    } else {
        throw error;
    }
};

// Users

const getUsers = (request, response) => {
    pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const postUserEmail = (request, response) => {
    const { email, password } = request.body;
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (pattern.test(email)) {
        pool.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id",
            [email, password],
            (error, results) => {
                if (error) {
                    throw error;
                }

                response.status(201).send(results.rows);
            }
        );
    } else {
        response.status(500).send(results);
    }
};

const putUserDetails = (request, response) => {
    const { id, firstName, lastName, street, town, postCode } = request.body;

    pool.query(
        "UPDATE users SET(first_name, last_name, street, town, post_code) = ($2, $3, $4, $5, $6) WHERE id = $1",
        [id, firstName, lastName, street, town, postCode],
        (error, results) => {
            if (error) {
                throw error;
            }

            response.status(201).send(results.rows);
        }
    );
};

const getUsernames = (request, response) => {
    pool.query(
        "SELECT username, id FROM users ORDER BY id ASC",
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        }
    );
};

const getUserById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

// Orders
const getOrders = (request, response) => {
    pool.query("SELECT * FROM orders ORDER BY id ASC", (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const getUserOrders = (request, response) => {
    const userId = request.params.id;

    pool.query(
        "SELECT * FROM orders WHERE user_id = $1",
        [userId],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        }
    );
};

const postOrder = (request, response) => {
    const { userId, basket, clientPrice } = request.body;
    let price = 0;
    basket.forEach(shoe => {
        price += shoe.price;
    });

    const totalPrice = price.toFixed(2);
    if (totalPrice === clientPrice) {
        pool.query(
            "INSERT INTO orders (user_id, total_cost) VALUES ($1, $2) RETURNING id",
            [userId, totalPrice],
            (error, results) => {
                if (error) {
                    throw error;
                }

                response.status(201).send(results.rows);
            }
        );
    }
};

// Shoes_Orders
const getShoesOrders = (request, response) => {
    pool.query("SELECT * FROM shoes_orders ORDER BY id ASC", (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const postShoesOrder = (request, response) => {
    const { shoeId, orderId } = request.body;
    pool.query(
        "INSERT INTO shoes_orders (shoe_id, order_id) VALUES ($1, $2) RETURNING id",
        [shoeId, orderId],
        (error, results) => {
            if (error) {
                throw error;
            }

            response.status(201).send(results.rows);
        }
    );
};

module.exports = {
    getShoes,
    getShoeById,
    getShoesByName,
    updateShoeStockLevel,
    getUsers,
    postUserEmail,
    putUserDetails,
    getUsernames,
    getUserById,
    getOrders,
    getUserOrders,
    postOrder,
    getShoesOrders,
    postShoesOrder
};