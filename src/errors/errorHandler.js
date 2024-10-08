import { logger } from "../utils/logger.js";

export const errorHandler = (err, req, res, next) => {
    const status = err.status || 500; // si no es posible determinar el status por defecto toma el 500
    // si el status es 500 devuelve el mensaje Internal server error
    const msg = status === 500 ? "Internal server error" : err.message
    if(status === 500) { // me interesa loggear este error ya que el cliente unicamente ve un internal server error
        logger.log("error", `${err.path || ""}-${err.message}`);
    }
    res.status(status).json({
        error:{
            msg, // equivale a message:message
            status, // equivale a status:status
        }
    });
};