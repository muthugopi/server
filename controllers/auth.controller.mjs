import db from "../src/utils/db.mjs";
import { customeError, serverError, notFound } from "../src/utils/errorHandling.mjs";
import bcrypt from 'bcrypt';

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
            return customeError(res, 400, "Password does not match");
        }

        req.userData = {id:user.id,name:user.name}
        next();
    });
};

export const isLogined = (req, res, next) => {
    if(req.session.isLogined) {
        return res.status(200).send({
            success:true,
            message:"login done via the session buddy !!"
        });
    }
    next();
}


export const isAdmin = (req, res, next) => {
    const { name } = req.body;
    const query = 'SELECT * FROM admins WHERE name = ?';
    
    db.query(query, [name], (err, result) => {
        if (err) {
            return serverError(res); 
        } 
        if (result.length === 0) {
            return notFound(res, "You're not an admin buddy!!");
        }
        console.log("access garented")
        next();
    });
}


