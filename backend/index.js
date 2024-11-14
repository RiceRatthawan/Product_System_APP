const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 3000;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Allow cross-origin requests

//Connect db-mysql
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "mysql_db",
});

connection.connect((err) => {
    if (err) {
        console.error("Error connection to MySQL", err);
        return;
    }
    console.log("Connected to MySQL successfully");
});

//Start server
app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});

// API endpoint
app.get("/api/products", async (req, res) => {
    const query = "SELECT * FROM products";
    try {
        connection.query(query, (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json(results);
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
});

//Search by productname or category
app.get("/api/products/search", async (req, res) => {
    console.log("SERACH");
    const { productname, category } = req.query;

    let query = "SELECT * FROM products WHERE 1=1";
    const queryParams = [];

    if (productname) {
        query += " AND LOWER(product_name) LIKE LOWER(?)";
        queryParams.push(`%${productname.trim()}%`);
    }

    if (category) {
        query += " AND LOWER(category) LIKE LOWER(?)";
        queryParams.push(`%${category.trim()}%`);
    }

    // Debugging output for the query and parameters
    console.log("Executing Query: ", query);
    console.log("With Params: ", queryParams);

    try {
        connection.query(query, queryParams, (err, results) => {
            if (err) {
                console.log("Query Error: ", err);
                return res.status(400).send();
            }
            console.log("Query Results: ", results); // Log the results
            res.status(200).json(results);
        });
    } catch (err) {
        console.log("Internal Error: ", err);
        return res.status(500).send();
    }
});

//Get product by id
app.get("/api/products/:id", async (req, res) => {
    const id = req.params.id;
    const query = "SELECT * FROM products WHERE id = ?";
    try {
        connection.query(query, [id], (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json(results);
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
});

//Add new product
app.post("/api/products/insert", async (req, res) => {
    const { id, productname, category, price } = req.body;
    const query =
        "INSERT INTO products(id, product_name, category, price) VALUES (?,?,?,?)";
    try {
        connection.query(
            query,
            [id, productname, category, price],
            (err, results) => {
                if (err) {
                    console.log("Error while inserting data", err);
                    return res.status(400).send();
                }
                return res
                    .status(201)
                    .json({ msg: "New product successfully added" });
            }
        );
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
});

//Update/Modify product data
app.patch("/api/products/update/:id", async (req, res) => {
    const id = req.params.id; // Product ID from URL parameter
    const { productname, category, price } = req.body; //new data
    const query =
        "UPDATE products SET product_name = ?, category = ?, price = ? WHERE id=?";
    try {
        connection.query(
            query,
            [productname, category, price, id],
            (err, results) => {
                if (err) {
                    console.log(err);
                    return res
                        .status(400)
                        .json({ msg: "Failed to update product" });
                }
                if (results.affectedRows === 0) {
                    return res.status(404).json({ msg: "Product not found" });
                }
                return res
                    .status(200)
                    .json({ msg: "Product data updated successfully" });
            }
        );
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Internal server error" });
    }
});

//Delete product
app.delete("/api/products/delete/:id", async (req, res) => {
    const id = req.params.id;
    const query = "DELETE FROM products WHERE id = ?";
    try {
        connection.query(query, [id], (err, results) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ msg: "No product with this id" });
            }
            return res
                .status(200)
                .json({ msg: "Product deleted successfully" });
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
});
