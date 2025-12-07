import jwt from "jsonwebtoken";

export const login = (req, res) => {
    const { id, name } = req.user;

    const token = jwt.sign(
        { id, name },
        "secret",
        { expiresIn: "1d" }
    );
    req.session.isLogined = true;
    req.session.token = token;

    return res.status(200).send({
        success: true,
        msg: "Access Granted. Logged in!" 
    });
};
