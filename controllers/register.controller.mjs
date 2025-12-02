import { matchedData, validationResult } from "express-validator";
import bcrypt from 'bcrypt';
import db from "../src/utils/db.mjs";
import { serverError, notFound, customeError } from "../src/utils/errorHandling.mjs";

const regQuery = 'INSERT INTO users (name, password, phone) VALUES (?, ?, ?)';
const logQuery = 'SELECT * FROM users WHERE (name, password) = (?, ?)';

export const register = async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return customError(res, 400, "Mismatched Schema !");
    }

    const { name, password, phone } = matchedData(req);
    const saltsRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltsRounds);

    db.query(regQuery, [name, hashedPassword, phone], (err) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                return customError(res, 409, "Duplicate entry (phone or name)");
            }
            return serverError(res, err);
        }

        return res.status(201).send({ success: true, msg: "Registered successfully!" });
    });
}

export const login = (req, res, next) => {
    const { name, password } = req.body;

    const logQuery = 'SELECT * FROM users WHERE name = ? AND password = ?';

    db.query(logQuery, [name, password], (err, data) => {

        if (err) {
            console.error(err);
            return customeError(res, 500, "Database error");
        }

        if (data.length === 0) {
            return customeError(res, 404, "Invalid name or password!");
        }

        res.status(200).send("Access Granted. Logged in!");
        next();
    });
};



