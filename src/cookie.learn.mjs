import { serverError } from "./utils/errorHandling.mjs";


export function myCookie(req, res, next) {
    res.cookie("user", "admin", {maxAge: 1000*60, signed: true});
    const cookie = req.signedCookies.user;
    console.log(req.session.id)
    req.sessionStore.get(req.session.id, (e, data) => {
        if(!e) {
            return console.log(data);
        }
        return serverError(res)
    })
    next();
}