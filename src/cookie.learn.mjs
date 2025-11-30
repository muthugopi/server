
export function myCookie(req, res, next) {
    res.cookie("user", "admin", {maxAge: 1000*60, signed: true});
    const cookie = req.signedCookies.user;
    console.log(cookie);
    next();
}