import Router from "express";
import userDao from "../dao/mongoDao/user.dao.js";

const router = Router();

// utilizo post ya que vamos a recibir datos del usuario
router.post("/register", async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await userDao.create(userData);
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
        // verfico si encontro el usuario o si la 
        if(!user || user.password !== password){
            return res.json({status:401, msg:"Email o contraseña no válidos"});
        }

        res.json({status:201, payload:{email, password}})
        
    } catch (error) {
        console.log(error);
        res.json({status:500, msg:"Error interno en el servidor"})
    }
});



export default router;