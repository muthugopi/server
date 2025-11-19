import db from "../src/utils/db.mjs";
import { notFound, customeError, serverError } from "../src/utils/errorHandling.mjs";
import { validationResult, matchedData } from "express-validator";



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
    const { name, age, marks, roles } = matchedData(req);
    const query = "INSERT INTO students (name, age, marks, roles) VALUES (?, ?, ?, ?) ";
    db.query(query, [name, age, marks, roles], (err, data) => {
        if (err) {
            return serverError(res);
        }
        else {
            res.status(201).send("data inserted sucessfull");
        }
    })
}

export const modifyStudent = (req, res) => {
    const { name, marks } = req.body;
    const query = "UPDATE students SET marks = ? WHERE name = ?"

    db.query(query, [marks, name], (err, data) => {

        if (err) {
            serverError(res);
        }
        else {
            res.status(201).send({ msg: "update successfully !!" });
        }
    })
}

export const deleteStudent = (req, res) => {
    const { name } = req.body;

    const query = "DELETE FROM students WHERE name = ?";
    db.query(query, [name], (err, result) => {
        if (err) {
            return notFound(res, "User Not Found");
        } else {
            res.status(200).send({ msg: "Deleted successfully!" });
        }
    });
}
