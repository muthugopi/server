import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mysql from "mysql2/promise";
import { body, validationResult } from "express-validator";

dotenv.config();

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

const db = await mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const PORT = process.env.PORT || 5000;

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Unauthorized" });
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        res.status(403).json({ message: "Forbidden" });
    }
};

const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message || "Server Error" });
};

app.get("/", (req, res) => {
    res.json({ message: "API Running" });
});

app.post("/api/register", 
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        const { email, password } = req.body;
        const hashed = await bcrypt.hash(password, 10);
        try {
            const [user] = await db.query("SELECT * FROM users WHERE email=?", [email]);
            if (user.length) return res.status(400).json({ message: "User exists" });
            await db.query("INSERT INTO users (email,password) VALUES (?,?)", [email, hashed]);
            res.status(201).json({ message: "User registered" });
        } catch (err) {
            next(err);
        }
    }
);

app.post("/api/login",
    body("email").isEmail(),
    body("password").exists(),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        const { email, password } = req.body;
        try {
            const [users] = await db.query("SELECT * FROM users WHERE email=?", [email]);
            if (!users.length) return res.status(400).json({ message: "Invalid credentials" });
            const match = await bcrypt.compare(password, users[0].password);
            if (!match) return res.status(400).json({ message: "Invalid credentials" });
            const token = jwt.sign({ id: users[0].id, email: users[0].email }, process.env.JWT_SECRET, { expiresIn: "1h" });
            res.json({ token });
        } catch (err) {
            next(err);
        }
    }
);

app.get("/api/users", authMiddleware, async (req, res, next) => {
    try {
        const [users] = await db.query("SELECT id,email FROM users");
        res.json(users);
    } catch (err) {
        next(err);
    }
});

app.get("/api/users/:id", authMiddleware, async (req, res, next) => {
    try {
        const [user] = await db.query("SELECT id,email FROM users WHERE id=?", [req.params.id]);
        if (!user.length) return res.status(404).json({ message: "User not found" });
        res.json(user[0]);
    } catch (err) {
        next(err);
    }
});

app.put("/api/users/:id", authMiddleware,
    body("email").optional().isEmail(),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        const { email, password } = req.body;
        try {
            const [user] = await db.query("SELECT * FROM users WHERE id=?", [req.params.id]);
            if (!user.length) return res.status(404).json({ message: "User not found" });
            const updates = [];
            const values = [];
            if (email) { updates.push("email=?"); values.push(email); }
            if (password) { const hashed = await bcrypt.hash(password, 10); updates.push("password=?"); values.push(hashed); }
            if (!updates.length) return res.status(400).json({ message: "No updates provided" });
            values.push(req.params.id);
            await db.query(`UPDATE users SET ${updates.join(",")} WHERE id=?`, values);
            res.json({ message: "User updated" });
        } catch (err) {
            next(err);
        }
    }
);

app.delete("/api/users/:id", authMiddleware, async (req, res, next) => {
    try {
        await db.query("DELETE FROM users WHERE id=?", [req.params.id]);
        res.json({ message: "User deleted" });
    } catch (err) {
        next(err);
    }
});

app.get("/api/products", authMiddleware, async (req, res, next) => {
    try {
        const [products] = await db.query("SELECT * FROM products");
        res.json(products);
    } catch (err) {
        next(err);
    }
});

app.post("/api/products", authMiddleware,
    body("name").exists(),
    body("price").isFloat({ gt: 0 }),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        const { name, price } = req.body;
        try {
            await db.query("INSERT INTO products (name,price) VALUES (?,?)", [name, price]);
            res.status(201).json({ message: "Product added" });
        } catch (err) {
            next(err);
        }
    }
);

app.get("/api/products/:id", authMiddleware, async (req, res, next) => {
    try {
        const [products] = await db.query("SELECT * FROM products WHERE id=?", [req.params.id]);
        if (!products.length) return res.status(404).json({ message: "Product not found" });
        res.json(products[0]);
    } catch (err) {
        next(err);
    }
});

app.put("/api/products/:id", authMiddleware,
    body("name").optional(),
    body("price").optional().isFloat({ gt: 0 }),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        const { name, price } = req.body;
        try {
            const updates = [];
            const values = [];
            if (name) { updates.push("name=?"); values.push(name); }
            if (price) { updates.push("price=?"); values.push(price); }
            if (!updates.length) return res.status(400).json({ message: "No updates provided" });
            values.push(req.params.id);
            await db.query(`UPDATE products SET ${updates.join(",")} WHERE id=?`, values);
            res.json({ message: "Product updated" });
        } catch (err) {
            next(err);
        }
    }
);

app.delete("/api/products/:id", authMiddleware, async (req, res, next) => {
    try {
        await db.query("DELETE FROM products WHERE id=?", [req.params.id]);
        res.json({ message: "Product deleted" });
    } catch (err) {
        next(err);
    }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
