

export function sendError(res, code, message) {
    return res.status(code).send({
        success:false,
        error : message
    })
}


export function notFound(res, message="Not Found") {
    return sendError(res, 404, message);
}

export function serverError(res, message="Internel Server Error") {
    return sendError(res, 500, message);
}

export function customError(res, code, message) {
    return sendError(res, code, message);
}