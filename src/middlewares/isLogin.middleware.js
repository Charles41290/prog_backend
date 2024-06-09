import { request, response } from "express"

export const isLogin = async (req = request, res = response, next) => {
    // req.session.user devuelve true or false
    if (req.session.user){
        next()
    } else {
        res.json({status:401 , msg:"No hay sesión activa"});
    }
}