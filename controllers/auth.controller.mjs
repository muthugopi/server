import User from "../models/user.model.mjs";
import Admin from "../models/admin.model.mjs";
import db from "../src/utils/db.mjs";
import { customError, serverError, notFound } from "../src/utils/errorHandling.mjs";
import bcrypt from 'bcrypt';
//import { Strategy as LocalStrategy } from "passport-local";

//check if the user is valid or not !

export const checkUser = async (req, res, next) => {
  try {
    const { name, password } = req.body;

    const validUser = await User.scope(null).findOne({
      where: { name }
    });

    if (!validUser) {
      return notFound(res);
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      validUser.password
    );

    if (!isPasswordValid) {
      return customError(res, 400, "Invalid password");
    }
    req.user = validUser;

    next();
  } catch (err) {
    console.error("Error inside checkUser:", err);
    return serverError(res);
  }
};

export const isLogined = (req, res, next) => {
    if (req.session.isLogined) {
        next();
    }
    customError(res, 400, "Login Required");
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


