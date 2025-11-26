import { data } from "framer-motion/client";
import db from "../src/utils/db.mjs";
import { serverError, customeError } from "../src/utils/errorHandling.mjs";
import { validationResult, matchedData } from "express-validator";

export const getMessage = (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()) {
        customeError(result, 400, 'Bad Request');
    }

    const {name, mail, message} = matchedData(req);

    const query = 'INSERT INTO message (name, mail, message) VALUES (?, ?, ?)';
    db.query(query, [name, mail, message], (err, result) => {
        if(err) {
            return serverError(res);
        }
        else {
            return res.status(201).send({msg:"success"});
        }
    })
}

export const showMessages = (req, res) => {
    const query = 'SELECT * FROM message';

    db.query(query, (err, data)=> {
        if(err) {
            serverError(res); 
        }
        else [
            res.status(200).send(data)
        ]
    })
}