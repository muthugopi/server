import db from '../src/utils/db.mjs';
import { serverError, customError, sendError } from '../src/utils/errorHandling.mjs';;
import { validationResult, matchedData } from 'express-validator';

export const getAllUsers = (req, res) => {
    const query = "SELECT name, phone FROM users";
    db.query(query, (err, data) => {
        if(err) { serverError(res);}
        else {
            return res.status(418).send(data);
        }
    })
}

export const createUser = (req, res) => {
    //const {name, password, phone} = req.body;
    //if ( !(name && password && phone) ) {
    //    customeError(res, 400, "Bad Request !");
    //}
    const result = validationResult(req);
    if(!result.isEmpty()) {
        return customError(res, 400, "Bad Request")
    }
    const {name, phone} = matchedData(req);
    const query = "INSERT INTO users (name, phone) values (?, ?)";
    db.query(query, [name, phone], (err, data) => {
        if(err) {
            serverError(res);
        }
        else {
            return res.status(201).send({status:"Success", Message:"Added !"});
        }
    } )
}

export const  deleteUser = (req, res) => {
    const query = "DELETE FROM users WHERE name = ?";
    const {name} = req.body
    db.query(query, [name], (err) => {
        if(err) {
            return serverError(res);
        }
        return res.status(200).send("User Deleted SuccessfullY !!");
    })
}