import { matchedData, validationResult } from "express-validator";
import bcrypt from 'bcrypt';

import db from "../src/utils/db.mjs";
import { serverError, customError } from "../src/utils/errorHandling.mjs";
import { server_datas } from "./data.controller.mjs";
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
        req.session.isLogined = true;
        server_datas.accounts += 1;
        server_datas.requests += 1;
        return res.status(201).send({ success: true, msg: "Registered successfully!" });
    });
}




