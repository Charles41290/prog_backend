import { request, response } from "express";
import passport from "passport";

// recibe la estrategia que hayamos definido en passport.config
/* export const passportCall = (strategy) => {
    //request and response de passport
    return async (req = request, res = response, next) => {
        // error, user, info -> viene de done(error, user, message)
        passport.authenticate(strategy, {session:false}, (error, user, info) => {
            if(error) return next(error);
            if(!user) return res.json({status:401, msg:info.msg ? info.msg : info.toString()});
            console.log("passport call "+user.cart);
            console.log("passport call "+req.user);
            req.user = user;
            next();
        })(req,res,next);
    }
} */

export const passportCall = (strategy) => {
    return async (req = request, res = response, next) => {
      passport.authenticate(strategy, { session: false }, (error, user, info) => {
        if (error) return next(error);
        if (!user) return res.status(401).json({ status: "error", msg: info.message ? info.message : info.toString() });
        
        console.log("passport call "+user.cart);
        console.log("passport call "+req.user);

        req.user = user;
  
        next();
      })(req, res, next);
    };
  };

// creamos una funcion para verificar el role
export const authorization = (role) => {
    return async (req = request, res = response, next) => {
        // verificamos si existe un usuario en la sesion
        if(!req.user) return res.json({status:401, msg:"No autorizado"});
        if(req.user.role !== role) return res.json({status:403, msg:"No tienes permiso"});
        next();
    }
}