import jwt from 'jsonwebtoken';

export const login = (req, res) => {
    const {id, name} = req.userData;
    const token = jwt.sign(
            { id:id, name: name },
            "secret",
            { expiresIn: "1d" }
        );

        req.session.isLogined = true;

        return res.status(200).send({
            success: true,
            msg: "Access Granted. Logged in!"
        });
};