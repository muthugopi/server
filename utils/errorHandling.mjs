
const errorHandle = (req, res, code, message) => {
    console.log("error handlin js is running")
    if (code &&  message) {
        return res.status(code).send(`${message}`)
    }
    else {
        return res.send(500).send("internel server error !! :(");
    }
}

export default errorHandle;