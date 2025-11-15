import exp from "express";
import morgan from "morgan";
import cors from "cors";
import fs from "fs";
import mysql from "mysql2";
import { createUserValidationSchema } from "./utils/validationSchemas.mjs";
import { validationResult, matchedData, checkSchema } from "express-validator";


const app = exp();
app.use(cors());
app.use(exp.json());
app.use(morgan("dev"));


// log
app.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
        const duration = Date.now() - start;
        console.log(` ${req.method} ${req.originalUrl} - ${duration}ms`);
    });
    next();
});

const PORT = 3000;


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "MUTHU#gopi08",
    database: "muthugopi"
});

db.connect((err) => {
    if (err) {
        console.log("Error while connecting:", err);
    } else {
        console.log("Connected!");
    }
});


// data
let users = [
    { id: 1, name: "muthu"},
    { id: 2, name: "gopi" },
    { id: 3, name: "emirates" },
    { id: 4, name: "muthugopi" }
];

let products = [
    { id: 1, name: "laptop" },
    { id: 2, name: "headphone" },
    { id: 3, name: "earbuds" }
];

let s_names = [
    { id: 1, s_name: "muthugopi" },
    { id: 2, s_name: "emirates" },
    { id: 3, s_name: "ayaan" }
];

// 
const saveData = (filename, data) => {
    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
};

//Middleware-Get user by ID
const getUserById = (req, res, next) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).send({ msg: "Invalid ID!" });

    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex === -1) return res.status(404).send({ msg: "User not found!" });

    req.userIndex = userIndex;
    req.userId = id;
    next();
};

//  authentication middleware
const auth = (req, res, next) => {
    const token = req.headers.authorization;
    if (token === "Bearer seithur-secret") next();
    else res.status(401).send({ msg: "Unauthorized Access" });
};

// root
app.get("/home", (req, res) => {
    res.status(200).send({
        message: "MuthuGopi's API",
        available_routes: {
            users: "/api/users",
            products: "/api/products",
            students: "/api/student_names",
            secret: "/api/secret (Protected)"
        },
        developer: "Muthugopi",
        version: "1.1.0"
    });
});

// Home
app.get("/", (req, res) => res.redirect("/home"));


app.get("/api/users", (req, res) => {
    const { filter, value, sortBy = "id", order = "asc", page = 1, limit = 5 } = req.query;
    let result = [...users];

    if (filter && value) {
        result = result.filter((user) =>
            user[filter]?.toString().toLowerCase().includes(value.toLowerCase())
        );
    }

    // Sort
    result.sort((a, b) => {
        if (order === "desc") return a[sortBy] > b[sortBy] ? -1 : 1;
        return a[sortBy] > b[sortBy] ? 1 : -1;
    });

    const start = (page - 1) * limit;
    const paginated = result.slice(start, start + parseInt(limit));

    res.status(200).send({
        total: result.length,
        page: parseInt(page),
        limit: parseInt(limit),
        data: paginated
    });
});


app.get("/api/products", (req, res) => {
    const { filter, value } = req.query;
    let result = [...products];
    if (filter && value) {
        result = result.filter((p) => p[filter]?.toString().toLowerCase().includes(value.toLowerCase()));
    }
    res.status(200).send(result);
});

//  Get student names
app.get("/api/student_names", (req, res) => {
    const { filter, value } = req.query;
    if (filter && value) {
        return res
            .status(200)
            .send(s_names.filter((s) => s[filter]?.toString().toLowerCase().includes(value.toLowerCase())));
    } else if (filter || value) {
        return res.status(400).send({ msg: "Bad request" });
    }
    return res.status(200).send(s_names);
});


app.get("/api/products/:id", (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).send({ msg: "Invalid product ID" });

    const product = products.find((p) => p.id === id);
    if (!product) return res.status(404).send({ msg: "Product not available" });

    res.status(200).send(product);
});


app.get("/api/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find((u) => u.id === id);
    if (!user) return res.status(404).send({ msg: "User Not Found!" });
    res.status(200).send(user);
});

// Add user
app.post("/api/user", (req, res) => {
    const { body } = req;
    const exist = users.find((u) => u.name === body.name);
    if (exist) return res.status(409).send({ msg: "User already exists!" });

    const newUser = { id: users[users.length - 1].id + 1, ...body };
    users.push(newUser);
    saveData("users.json", users);

    res.status(201).send(newUser);
});


// Update full user
app.put("/api/user/:id", getUserById, (req, res) => {
    const { body } = req;
    users[req.userIndex] = { id: req.userId, ...body };
    saveData("users.json", users);
    res.status(200).send({ msg: "User updated successfully!" });
});

//  Patch 
app.patch("/api/user/:id", getUserById, (req, res) => {
    const { body } = req;
    users[req.userIndex] = { ...users[req.userIndex], ...body };
    saveData("users.json", users);
    res.status(200).send({
        msg: "User updated successfully!",
        updatedUser: users[req.userIndex]
    });
});

// delete user
app.delete("/api/users/:id", getUserById, (req, res) => {
    users.splice(req.userIndex, 1);
    saveData("users.json", users);
    console.log("User deleted successfully!");
    res.status(200).send({ msg: "User deleted successfully!" });
});

// protected
app.get("/api/secret", auth, (req, res) => {
    res.send({ msg: " You have accessed a protected route!" });
});

app.get('/students', (req, res) => {
    const query = 'SELECT * FROM students';
    db.query(query, (err, data) => {
        if (err) {
            res.status(500).send('internel server error' + err);
        } else {
            res.status(200).json(data);
        }
    })
});

app.post('/add_student',
    checkSchema(createUserValidationSchema),
     (req, res) => {
        const result = validationResult(req);

        if ( !result.isEmpty()) {
            return res.status(422).send({msg:"bad request !!"});
        }
    const {name, age, marks, roles} =matchedData(req.body);
    const query = "INSERT INTO students (name, age, marks, roles) VALUES (?, ?, ?, ?) "
    db.query(query, [name, age, marks, roles], (err, data) => {
        if (err) {
            res.status(500).send("internel server error !!");
            console.log("error : ", err)
        }
        else {
            res.status(201).send("data inserted sucessfull");
        }
    })
})


app.delete('/delete_student/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) 
        return res.status(400).send({ msg: "Bad request!" });

    const query = "DELETE FROM students WHERE id = ?";
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ msg: "Something went wrong :(" });
        } else {
            res.status(200).send({ msg: "Deleted successfully!" });
        }
    });
});

app.patch('/modify/:id', (req, res) => {
    const id = req.params.id;
    const {marks} = req.body;
    const query = "UPDATE students SET marks = ? WHERE ?"

    db.query(query, [marks, id], (err, data) => {

        if (err) {
            res.status(500).send({msg:"sorry error while updating !"})
        }
        else {
            res.status(201).send({msg:"update successfully !!"});
        }
    })
})


// Invalid route
app.use((req, res) => {
    res.status(404).send({ msg: "Invalid URL Bruhh " });
});

//  Centralized error handler
app.use((err, req, res, next) => {
    console.error(" Error:", err.message);
    res.status(err.status || 500).send({
        msg: err.message || "Internal Server Error"
    });
});

app.listen(PORT, () => {
    console.log(` Server running at http://localhost:${PORT}`);
});
