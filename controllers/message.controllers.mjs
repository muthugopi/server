
import db from "../src/utils/db.mjs";
import { serverError, customError } from "../src/utils/errorHandling.mjs";
import { validationResult, matchedData } from "express-validator";
import { server_datas } from "./data.controller.mjs";

export const getMessage = (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()) {
        customError(result, 400, 'Bad Request');
    }

    const {name, mail, message} = matchedData(req);

    const query = 'INSERT INTO message (name, mail, message) VALUES (?, ?, ?)';
    db.query(query, [name, mail, message], (err, result) => {
        if(err) {
            return serverError(res);
        }
        else {
            server_datas.messages += 1;
            server_datas.requests += 1;
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
        else {
            server_datas.admin_visits += 1;
            res.status(200).send(data);
    }
    })
}