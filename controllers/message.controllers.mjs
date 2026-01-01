import Message from "../models/message.model.mjs";
import { serverError, customError, notFound } from "../src/utils/errorHandling.mjs";
import { validationResult, matchedData } from "express-validator";

export const getMessage = (req, res) => {
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            customError(result, 400, 'Bad Request');
        }

        const { name, mail, message } = matchedData(req);

        const newMessage = Message.create({
            name: name,
            mail: mail,
            message: message
        })

        return res.status(201).send({msg : " We Recieved Your Message !"});
    }
    catch (err) {
        console.log("Error inside getMessage : folder - /controllers");
        return serverError(res);
    }

}
export const showMessages = async (req, res) => {
    try {
        const messageData = await Message.findAll();
        if (!messageData || messageData.length === 0) {
            return notFound(res, "No Data Found On The Database. Good Things Takes Tiem Bruhh. just wait !!");
        }
        return res.status(200).send({ MessageDatas: messageData });
    } catch (err) {
        console.log(`Error : ${err.message}`)
    }
}
