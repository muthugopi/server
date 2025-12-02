import db from "../src/utils/db.mjs";
import { customeError, serverError, notFound } from "../src/utils/errorHandling.mjs";

export const checkUser = (req, res, next) => {
    const { name, password } = req.body;

    const query = 'SELECT * FROM users WHERE name = ?';
    db.query(query, [name], (err, data) => {

        if (err) {
            return serverError(res);
        }


        if (data.length === 0) {
            return notFound(res, "User not found");
        }

        const user = data[0];

        if (user.password !== password) {
            return customeError(res, 400, `Password doesn't matched : ${[...data]}`);
        }
        next()
    });
};


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


