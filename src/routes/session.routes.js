import Router from "express";
import userDao from "../dao/mongoDao/user.dao.js";
import { createHash, isValidPassord } from "../utils/hashPassword.js";

const router = Router();

// utilizo post ya que vamos a recibir datos del usuario
router.post("/register", async (req, res) => {
    try {
        const {first_name, last_name, email, age, password} = req.body;
        // se crea un nuevo objeto con la clave encriptada
        const newUser = {
            first_name, 
            last_name,
            email,
            age,
            password: createHash(password)
        }
        // guardamos ese usuario en Mongo
        const user = await userDao.create(newUser);
        if(!newUser){
            return res.json({status:400, msg:"No se pudo crear el usuario"})
        }
        res.json({status:201, payload:newUser})
        
    } catch (error) {
        console.log(error);
        res.json({status:500, msg:"Error interno en el servidor"})
    }
});

// creamos un endpoint de login
// usamos post porque estamos enviando info al server
router.post("/login", async (req, res) => {
    try {
        // recibimos email y pass del cuerpo del body
        const {email, password} = req.body;
        // verificamos si el usuario es administrador
        // si se cumple guardamos un session
        if(email === "adminCoder@coder.com" && password === "adminCod3r123"){
            req.session.user = {
                email,
                role:"admin"
            }
            return res.json({status:201, payload:req.session.user})
        }
        // si no es administrador
        // busco un usuario por mail
        const user = await userDao.getByEmail(email);
        // verfico si encontro el usuario(se busca por email) 
        // o si la contraseña no corresponde con la del usuario
        if(!user || !isValidPassord(user,password)){
            return res.json({status:401, msg:"Email o contraseña no válidos"});
        }

        // creamos la session del usuario
        req.session.user = {
            email,
            role:"user"
        }

        res.json({status:201, payload:req.session.user})
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