const notFoundError = (msg = "Not found") => {
    const error = new Error(msg);
    error.status = 404;
    return error;
};

const badRequestError = (msg = "Bad Request") => {
    const error = new Error(msg);
    error.status = 400;
    return error
};

const unauthorizedError = (msg = "Unauthorized") => {
    const error = new Error(msg);
    error.status = 401;
    return error
};

const forbiddenError = (msg = "Forbbiden" ) => {
    const error = new Error(msg);
    error.status = 403;
    return error
}

export default {
    notFoundError,
    badRequestError,
    unauthorizedError,
    forbiddenError
}