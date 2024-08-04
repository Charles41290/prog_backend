import jwt from "jsonwebtoken";

// defino 2 funciones para crear el token y verificar el token
export const createToken = (user) => {
    // obtengo el id y email del user
    const {_id, email, role, cart} = user;
    
    //const token = jwt.sign({_id, email, role:"user"}, "secret12345", {expiresIn:"1m"});
    const token = jwt.sign({_id, email, role, cart}, "secret12345", {expiresIn:"10m"});
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

