import Admin from "../models/admin.model.mjs";
import db from "../src/utils/db.mjs";
import { customError, serverError, notFound } from "../src/utils/errorHandling.mjs";
import bcrypt from 'bcrypt';
//import { Strategy as LocalStrategy } from "passport-local";

//check if the user is valid or not !

export const checkUser = (req, res, next) => {
    const { name, password } = req.body;

    const query = 'SELECT * FROM users WHERE name = ?';

    db.query(query, [name], async (err, data) => {

        if (err) return serverError(res);

        if (data.length === 0) {
            return notFound(res, "User not found");
        }

        const user = data[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return customError(res, 400, "Password does not match");
        }

        req.userData = { id: user.id, name: user.name }
        next();
    });
};
export const isLogined = (req, res, next) => {
    if (req.session.isLogined) {
        return res.status(200).send({
            success: true,
            message: "login done via the session buddy !!"
        });
    }
    next();
}


export const isAdmin = async (req, res, next) => {

    if (req.session.isadmin === true) {
        console.log("Access Granted Via Session Buddy !");
        next();
    } else {

        const { name } = req.body;
        if (!name)
            return customError(res, 400, { Msg: "Provide Admin Name !" })
        const admin = await Admin.findOne({
            where: { name },
        })
        if (!admin) {
            return notFound(res, { msg: "Access Denied" })
        }
        req.session.isadmin = true;
        console.log("Access Granted")
        next();
    }
}


