import jwt from "jsonwebtoken";

// defino 2 funciones para crear el token y verificar el token
export const createToken = (user) => {
    // obtengo el id y email del user
    const {_id, email} = user;
    const token = jwt.sign({_id, email}, "secret12345", {expiresIn:"1m"});
    return token 
}

export const verifyToken = (token) => {
    try {
        const decode = jwt.verify(token, "secret12345")
        return decode; // retorna la info decodificada
    } catch (error) {
        return null
    }
}