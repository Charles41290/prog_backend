export const errorHandler = (err, req, res, next) => {
    const status = err.status || 500; // si no es posible determinar el status por defecto toma el 500
    // si el status es 500 devuelve el mensaje Internal server error
    const msg = status === 500 ? "Internal server error" : err.message

    res.status(status).json({
        error:{
            msg, // equivale a message:message
            status, // equivale a status:status
        }
    });
};