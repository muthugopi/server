import { matchedData, validationResult } from "express-validator";
import bcrypt from 'bcrypt';
import { serverError } from "../src/utils/errorHandling.mjs";
import User from "../models/user.model.mjs";


export const register = async (req, res) => {
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return customError(res, 400, "Mismatched Schema !");
        }

        const { name, password, phone } = matchedData(req);
        const saltsRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltsRounds);

        const newUser = await User.create({
            name: name,
            password: hashedPassword,
            phone: phone
        });
        req.session.isLogined = true;
        req.session.user = {
            id: newUser.id,
            name: newUser.name
        };

        return ok(res, 200,{ msg: "registration completed !!" });
    }
    catch (err) {
        console.log("error inside the register API endpoint !");
        return serverError(res);
    }

}




