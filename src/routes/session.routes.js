import Router from "express";
import userDao from "../dao/mongoDao/user.dao.js";
import { createHash, isValidPassord } from "../utils/hashPassword.js";
import passport from "passport";

const router = Router();

// utilizo post ya que vamos a recibir datos del usuario
// configuramos el passport.authenticate con la estrategia register definida en
// passport.config.js -> en este archivo esta toda la lógica para registrar el nuevo usuario
router.post("/register", passport.authenticate("register") ,async (req, res) => {
    try {
        res.json({status:201, payload:"Usuario creado"})  
    } catch (error) {
        console.log(error);
        res.json({status:500, msg:"Error interno en el servidor"})
    }
});

// creamos un endpoint de login
// usamos post porque estamos enviando info al server
// delegamos la funcion de login a "login" strategy en passport.config
    router.post("/login", passport.authenticate("login"), async (req, res) => {
    try {
        res.json({status:201, payload:req.user})
    } catch (error) {
        console.log(error);
        res.json({status:500, msg:"Error interno en el servidor"});
    }
});

// ruta para desloguearse
router.get("/logout", async (req, res) => {
    try {
        req.session.destroy();
        res.json({status:200, payload:"Sesión cerrada con éxito"})
    } catch (error) {
        console.log(error);
        res.json({status:500, msg:"Error interno en el servidor"});
    }
})

export default router;