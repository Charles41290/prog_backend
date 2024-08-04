import passport from "passport";
import local from "passport-local";
import jwt from "passport-jwt"
//import userDao from "../dao/mongoDao/user.dao.js";
import userRepository from "../persistences/mongo/repositories/user.repository.js";
import google from "passport-google-oauth20";
import { createHash, isValidPassord } from "../utils/hashPassword.js";

//configuramos la estrategia local,de google y passport-jwt
const LocalStrategy = local.Strategy;
const GoogleStrategy = google.Strategy;
const JWTStrategy = jwt.Strategy;
// necesitamos extraer el token de la cookie creada en 
// session.routes .post(login/jwt)
const ExtractJWT = jwt.ExtractJwt; // .ExtractJwt nos permite extraer info de la request

// creamos una funcion para extraer la cookie
const CookieExtractor = (req) =>{
    let token = null;
    // verificamos que haya una request y que tenga una cookie
    if(req && req.cookies){
        token = req.cookies.token; // la cookie tiene el nombre de token
    }
    return token;
}

// creamos una función para inicializar las estrategias
const initializePassword = () => {
    // con passport.use definimos la strategy a utilizar -> register
    // passport recibe 2 propiedades del usuario: username y password
    // defino como username el email -> usernameField:email
    // passReqToCallback:true -> me permite pasar al callback el arg req y asi acceder a este
    // done es la función que se llama cuando se termina de procesar la autenticación
    passport.use(
        "register",
        new LocalStrategy(
            {passReqToCallback:true, usernameField:"email"},
            async (req, username, password, done) => {
                try {
                    const user = await userRepository.getByEmail(username);
                    const {first_name, last_name, email, age, role} = req.body;
                    // si el usuario ya existe retono un mensaje
                    // done es un metodo interno llamado internamente por la 
                    // implementación de la estrategia
                    // false -> indica que la autenticación falló 
                    if(user) return done(null,false,{msg:"El usuario ya existe"});

                    //generamos un nuevo usuario
                    const newUser = {
                        first_name, 
                        last_name,
                        email,
                        age,
                        password: createHash(password),
                        role
                    }
                    // si el usuario no existe lo creo y lo retorno mediante done
                    const createdUser = await userRepository.create(newUser);
                    // null indica que no ha ocurrido error
                    return done(null, createdUser);
                } catch (error) {
                    // en caso de haber error 
                    return done(error);
                }
            }
        )
    )

    // serializeUser determina cual data del usuario debería ser almacenado en la session
    // esta disponible en req.session.passport.user
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    // el id es el que fue almacenado mediante serializeUser() -> done(null, user._id)
    // deserializeUser -> recuperamos el user mediante el identificador unico configurado(id)
    // en serializeUser() -> el identificador unico puede ser cualquier atributo del user
    passport.deserializeUser(async (id, done) => {
        const user = await userRepository.getById(id);
        done(null, user);
    });

    // defino una estrategia para el login
    passport.use(
        "login",
        new LocalStrategy(
            {usernameField:"email"},
            async (username, password, done) => {
                try {
                    const user = await userRepository.getByEmail(username);
                    if (!user || !isValidPassord(user, password)) {
                        return done(null, false, {msg:"Email o password inválido"});
                    }
                    return done(null, user);
                } catch (error) {
                    done(error)
                }
            }
        )
    );

    // definimos una estrategia google 
    /* passport.use(
        "google",
        new GoogleStrategy(
            {
                clientID: "",
                clientSecret: "",
                callbackURL: "http://localhost:8080/api/session/login/google" // direccion del endpoint donde se va a conectar nuestra estrategia 
            },
            async (accessToken, refreshToke, profile, cb) => {
                try {
                    // el profile lo obtengo de la api de google
                    const {id, name, emails, username} = profile;
                    const user = {
                        // givenName y familyName son atributos del objeto name que está en profile
                        first_name: name.givenName,
                        last_name: name.familyName,
                        email:emails[0].value // emails en un array
                    }
                    // verifico si existe el usuario
                    const existUser = await userDao.getByEmail(emails[0].value);
                    if(existUser) return cb(null, existUser); // paso el usuario para que sea serializado
                    // si el usuario no existe lo creo
                    const newUser = await userDao.create(user);
                    cb(null, newUser);
                } catch (error) {
                    cb(error);
                }
            }
        )
    ) */

    //configuramos la estrategia
    passport.use("jwt", 
        new JWTStrategy(
            {
                jwtFromRequest: ExtractJWT.fromExtractors([CookieExtractor]) , //extrae la info de la request -> recibe como arg un array de las funciones para extraer la cookie
                secretOrKey: "secret12345" // coinicide con el secret config en utils/jwt.js
            },
            async (jwt_payload, done) => { // en payload está el token
                try {
                    return done(null, jwt_payload)
                } catch (error) {
                    return done(error)
                }
            }
        )
    );
}

export default initializePassword;