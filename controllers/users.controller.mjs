import db from '../src/utils/db.mjs';
import { notFound, serverError, customeError } from '../src/utils/errorHandling.mjs';;
import { validationResult, matchedData } from 'express-validator';

export const getAllUsers = (req, res) => {
    const query = "SELECT name, phone FROM users";
    db.query(query, (err, data) => {
        if(err) { serverError(res);}
        else {
            return res.status(200).send(data);
        }
    })
}

export const createUser = (req, res) => {
    const {name, password, phone} = req.body;
    if ( !(name && password && phone) ) {
        customeError(res, 400, "Bad Request !");
    }
    const query = "INSERT INTO users (name, password, phone) values (?, ?, ?)";
    db.query(query, [name, password, phone], (err, data) => {
        if(err) {
            serverError(res);
        }
        else {
            return res.status(201).send({status:"Success", Message:"Added !"});
        }
    } )
}