
import userDao from "../dao/mongoDao/user.dao.js";
import { createHash, isValidPassord } from "../utils/hashPassword.js";
import { createToken, verifyToken } from "../utils/jwt.js";

const createUser = async (req, res) => {
    try {
        res.json({status:201, payload:"Usuario creado"})  
    } catch (error) {
        console.log(error);
        res.json({status:500, msg:"Error interno en el servidor"})
    }
}

const userLogin = async (req, res) => {
    try {
        res.json({status:201, payload:req.user})
    } catch (error) {
        console.log(error);
        res.json({status:500, msg:"Error interno en el servidor"});
    }
}

const loginGoogle = async (req, res) => {
    try {
        res.json({status:201, payload:req.user})
    } catch (error) {
        console.log(error);
        res.json({status:500, msg:"Error interno en el servidor"});
    }
}

const userLoginJWT = async (req,res) => {
    try {
        // obtengo email y password desde el body
        const {email, password} = req.body;
        // busco el usuario por email
        const user = await userDao.getByEmail(email);
        // si el usuario NO existe o si la contraseña NO es válida
        if (!user || !isValidPassord(user, password)) {
            return res.json({status:401, msg:"Email o contraseña no válidos"});
        }
        // si existe el usuario y la password es correcta
        const token = createToken(user);

        //el token creado se almacena en una cookie llamada cookie
        // cont httpOnly me aseguro que la única forma de acceder a la cookie sea mediante http
        res.cookie("token", token, {httpOnly:true});

        res.json({status:201, payload:user,token});
    } catch (error) {
        console.log(error);
        res.json({status:500, msg:"Error interno en el servidor"});
    }
}

const getCurrentSession = (req, res) => {
    try {
        //const {token} = req.body;
        // en lugar de recibir el token desde el body lo obtenemos desde una cookie
        const token = req.cookies.token;

        const checkToken = verifyToken(token);
        if(!checkToken){
            return res.json({status:403, msg:"Token inválido"});
        }
        res.json({status:201, payload:checkToken});
    } catch (error) {
        console.log(error);
        res.json({status:500, msg:"Error interno en el servidor"});
    }
}

const logout = async (req, res) => {
    try {
        req.session.destroy();
        res.json({status:200, payload:"Sesión cerrada con éxito"})
    } catch (error) {
        console.log(error);
        res.json({status:500, msg:"Error interno en el servidor"});
    }
}

export default {
    createUser,
    userLogin,
    loginGoogle,
    userLoginJWT,
    getCurrentSession,
    logout
}