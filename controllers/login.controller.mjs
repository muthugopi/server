import jwt from "jsonwebtoken";

export const login = (req, res) => {
    const { id, name } = req.user;
    console.log("to check whether the git is work or not")

    const token = jwt.sign(
        { id, name },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1d" }
    );
   
    req.session.isLogined = true;
    req.session.token = token;

    return ok(res, 200, {
        success: true,
        msg: "Access Granted. Logged in!"
    });
};
