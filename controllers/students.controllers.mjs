import db from "../src/utils/db.mjs";
import { notFound, customeError, serverError } from "../src/utils/errorHandling.mjs";
import { validationResult, matchedData } from "express-validator";


db.getConnection((err, connection) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Database connected successfully!");
        connection.release();
    }
});

export const getAllStudents = (req, res) => {
    const query = "SELECT * FROM students";

    db.query(query, (err, result) => {
        if (err) {
            return serverError(res, "Internel Server Error");
        }
        else {
            res.status(200).send({ data: result });
        }
    })

}

export const createStudent = (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return customeError(res, 422, "Bad Request ! ");
    }
    const {name, age, marks, roles} =matchedData(req);
    const query = "INSERT INTO students (name, age, marks, roles) VALUES (?, ?, ?, ?) ";
    db.query(query, [name, age, marks, roles], (err, data) => {
        if (err) {
            serverError(res);
        }
        else {
            res.status(201).send("data inserted sucessfull");
        }
    })
}

