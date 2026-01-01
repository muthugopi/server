export function send(
  res,
  statusCode = 200,
  success = true,
  message = "",
  data = null
) {
  return res.status(statusCode).json({
    success,
    message,
    data,
  });
}



export const ok = (res, data = null, message = "Success") =>
  send(res, 200, true, message, data);

export const created = (res, data = null, message = "Created") =>
  send(res, 201, true, message, data);

export const fail = (res, statusCode = 400, message = "Error") =>
  send(res, statusCode, false, message, null);

export const notFound = (res, message = "Not Found") =>
  fail(res, 404, message);

export const serverError = (res, message = "Internal Server Error") =>
  fail(res, 500, message);
