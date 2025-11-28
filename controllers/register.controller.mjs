import { matchedData, validationResult } from "express-validator";
import db from "../src/utils/db.mjs";
import { serverError, notFound, customeError } from "../src/utils/errorHandling.mjs";

const regQuery = 'INSERT INTO users (name, password, phone) VALUE (?, ?, ?)';
const logQuery = 'SELECT * FROM users WHERE (name, password) = (?, ?)';

export const register = (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return customeError(res, 400, "Mismatched Schema !");
    }
    const { name, password, phone } = matchedData(req);
    db.query(regQuery, [name, password, phone], (err) => {

        if (err.code === "ER_DUP_ENTRY") {
            if (err) {
                return serverError(res, err);
            }
            return customeError(res, 418, "can't duplicate the phone number")
        }

        return res.status(201).send({ success: true, msg: "registerd successful !" });
    })
}

export const login = (req, res) => {
    const { name, password } = req.body;

    const logQuery = 'SELECT * FROM users WHERE name = ?';

    db.query(logQuery, [name], (err, data) => {

        if (err) {
            return customeError(res, 500, "Database error");

        }
        if (data.length === 0) {
            return customeError(res, 404, "User doesn't exist!");
        }
        const user = data[0];
        if (password !== user.password) {
            return customeError(res, 401, "Password doesn't match, try again!");
        }
        return res.status(200).send("Access Granted. Logged in!");
    });
};


