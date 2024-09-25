
//import userDao from "../dao/mongoDao/user.dao.js";
import { createHash, isValidPassord } from "../utils/hashPassword.js";
import { createToken, verifyToken } from "../utils/jwt.js";
import userRepository from "../persistences/mongo/repositories/user.repository.js";
import { userResponseDto } from "../dto/user-response.dto.js";
import { logger } from "../utils/logger.js";

const createUser = async (req, res) => {
    try {
        res.json({status:201, payload:"Usuario creado"})  
    } catch (error) {
        logger.error(`${error}`);
        res.json({status:500, msg:"Error interno en el servidor"})
    }
}

// const userLogin = async (req, res) => {
//     try {
//         res.json({status:201, payload:req.user})
//     } catch (error) {
//         logger.error(`${error}`);
//         res.json({status:500, msg:"Error interno en el servidor"});
//     }
// }

// se modifico lo anterior para que el token se almacene en una cookie
const userLogin = async (req, res) => {
    try {
      const user = req.user;
      const token = createToken(user);
      // Guardamos el token en una cookie
      res.cookie("token", token, { httpOnly: true });
      const userDto = userResponseDto(user);
      return res.status(200).json({ status: "success", payload: userDto, token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Error", msg: "Internal Server Error" });
    }
  };

const loginGoogle = async (req, res) => {
    try {
        res.json({status:201, payload:req.user})
    } catch (error) {
        logger.error(`${error}`);
        res.json({status:500, msg:"Error interno en el servidor"});
    }
}

const userLoginJWT = async (req,res) => {
    try {
        // obtengo email y password desde el body
        const {email, password} = req.body;
        // busco el usuario por email
        const user = await userRepository.getByEmail(email);
        // si el usuario NO existe o si la contraseña NO es válida
        if (!user || !isValidPassord(user, password)) {
            return res.json({status:401, msg:"Email o contraseña no válidos"});
        }
        // si existe el usuario y la password es correcta
        const token = createToken(user);

        //el token creado se almacena en una cookie llamada cookie
        // cont httpOnly me aseguro que la única forma de acceder a la cookie sea mediante http
        res.cookie("token", token, {httpOnly:true});
        const userDto = userResponseDto(user);
        res.json({status:201, payload:userDto,token});
    } catch (error) {
        logger.error(`${error}`);
        res.json({status:500, msg:"Error interno en el servidor"});
    }
}

const getCurrentSession = (req, res) => {
    try {
        //const {token} = req.body;
        // en lugar de recibir el token desde el body lo obtenemos desde una cookie
        const token = req.cookies.token;
        const user = userResponseDto(req.user);
        const checkToken = verifyToken(token);
        if(!checkToken){
            return res.json({status:403, msg:"Token inválido"});
        }
        res.json({status:201, payload:user});
    } catch (error) {
        logger.error(`${error}`);
        res.json({status:500, msg:"Error interno en el servidor"});
    }
}

const logout = async (req, res) => {
    try {
        req.session.destroy();
        res.json({status:200, payload:"Sesión cerrada con éxito"})
    } catch (error) {
        logger.error(`${error}`);
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