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
            return customeError(res, 400, `Password doen't matchedm : ${data}`);
        }
        next()
    });
};


export const isAdmin = (req, res) => {
    const {name} = req.body;
    const query = 'SELECT * FROM admins WHERE name = ?';
    db.query(query, name, (err, res) => {
        if(err) {
            return serverError(res);
        }
        else if(data.length == 0) {
            return notFound(res, "Your Not A Admin Buddy !!");
        }
        
    })
}

