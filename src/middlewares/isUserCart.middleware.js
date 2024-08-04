import { request, response } from "express"

export const isUserCart = async (req = request, res = response, next) => {
    // tomo de params el cid
    const {cid} = req.params;

    // req.user.cart -> la obtiene de la cookie
    if(req.user.cart !== cid) return res.json({status:401, msg:"Cart ID doesnt match with user's cart"});
    next();
}