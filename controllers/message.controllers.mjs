
import db from "../src/utils/db.mjs";
import Message from "../models/message.model.mjs";
import { serverError, customError, notFound } from "../src/utils/errorHandling.mjs";
import { validationResult, matchedData } from "express-validator";

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
            return res.status(201).send({msg:"success"});
        }
    })
}
export const testingGetMessage = async (req, res) => {
    try {
        const messageData = await Message.findAll();
        if(!messageData || messageData.length() ===0 ) {
            return notFound(res, "No Data Found On The Database. Good Things Takes Tiem Bruhh. just wait !!");
        }
        return res.status(200).send({MessageDatas : messageData});
    } catch(err) {
        console.log(`Error : ${err.message}`)
    }
}

export const showMessages = async (req, res) => {
    try {
        const messageData = await Message.findAll();
         
        if(!messageData || messageData.length === 0 ) {
            return notFound(res, "No Data Found On The Database. Good Things Takes Tiem Bruhh. just wait !!");
        }
        return res.status(200).send({MessageDatas : messageData});
    } catch(err) {
        console.log(`Error : ${err.message}`);
    }
}