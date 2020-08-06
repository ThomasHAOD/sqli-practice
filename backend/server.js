const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 8000;
const db = require("./queries/queries");

app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );

    res.setHeader("Access-Control-Allow-Credentials", true);

    next();
});

app.get("/", (request, response) => {
    response.json({ info: "Node.js, Express, and Postgres API" });
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});

app.get("/shoes", db.getShoes);
app.get("/shoes/:id", db.getShoeById);
app.put("/shoes/:id/updatebasket", db.updateShoeStockLevel);
app.get("/shoes/search/:name", db.getShoesByName)

app.get("/users", db.getUsers);
app.put("/users/:id", db.putUserDetails);
app.post("/users", db.postUserEmail);
app.get("/users/usernames", db.getUsernames);
app.get("/users/:id", db.getUserById);

app.get("/orders", db.getOrders);
app.get("/orders/users/:id", db.getUserOrders);
app.post("/orders", db.postOrder);

app.get("/shoes-orders", db.getShoesOrders);
app.post("/shoes-orders", db.postShoesOrder);