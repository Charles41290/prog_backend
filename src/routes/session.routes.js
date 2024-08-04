import Router from "express";
//import userDao from "../dao/mongoDao/user.dao.js";
import { createHash, isValidPassord } from "../utils/hashPassword.js";
import passport from "passport";
import { createToken, verifyToken } from "../utils/jwt.js";
import { passportCall, authorization } from "../middlewares/passport.middleware.js";
//import { authorization } from "../middlewares/passport.middleware.js";
import sessionController from "../controllers/session.controller.js";
import { sendMail } from "../utils/sendMails.js";

const router = Router();

// utilizo post ya que vamos a recibir datos del usuario
// configuramos el passport.authenticate con la estrategia register definida en
// passport.config.js -> en este archivo esta toda la lógica para registrar el nuevo usuario
router.post("/register", passport.authenticate("register") , sessionController.createUser);

// creamos un endpoint de login
// usamos post porque estamos enviando info al server
// delegamos la funcion de login a "login" strategy en passport.config
router.post("/login", passport.authenticate("login"), sessionController.userLogin);

// ruta para acceder mediante google
router.get("/login/google", 
    passport.authenticate("google",{
        scope:["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"],
        session:false
    }),
    sessionController.loginGoogle
);

// ruta para loguearse usando jwt
router.post("/login/jwt",sessionController.userLoginJWT);

// obtengo el usuario por token
//router.get("/current",passportCall("jwt"), authorization("user") , sessionController.getCurrentSession);
router.get("/current",passportCall("jwt"), sessionController.getCurrentSession);

// ruta para desloguearse
router.get("/logout", sessionController.logout);

router.get("/email", async (req, res)=> {
    await sendMail("carlosromero41290@gmail.com", "Test nodemailer", "Este es un mensaje de prueba");
    return res.json({status: "200", msg:"Email enviado"});
});

export default router;