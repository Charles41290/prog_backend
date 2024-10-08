import { request, response } from "express";
import passport from "passport";
import customsErrors from "../errors/customsErrors.js";

export const passportCall = (strategy) => {
    return async (req = request, res = response, next) => {
      passport.authenticate(strategy, { session: false }, (error, user, info) => {
        if (error) return next(error);
        if (!user) return res.status(401).json({ status: "error", msg: info.message ? info.message : info.toString() });
        
        req.user = user;
  
        next();
      })(req, res, next);
    };
  };

// creamos una funcion para verificar el role
export const authorization = (roles) => {
    return async (req = request, res = response, next) => {
        try {
          if(!req.user) throw customsErrors.notFoundError("User not found");
          const roleAuthorized = roles.includes(req.user.role);
          if(!roleAuthorized) throw customsErrors.unauthorizedError("Usuario no autorizado");
          next();
        } catch (error) {
          next(error);
        }
    }  
}