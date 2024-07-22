import express, { response } from "express";
import routes from "./routes/index.js"
import viewRoutes from "./routes/views.routes.js"
import handlebars from "express-handlebars";
import __dirname from "./dirname.js";
import { connectMongoDb } from "./config/mongoDb.config.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import initializePassword from "./config/passport.config.js"
import cookieParser from "cookie-parser";
import env from "./config/env.config.js"

// establecemos conexión con mongoDB
connectMongoDb();

// creo una aplicacion/servidor de express
const app = express();

// para inicializar la app de express necesito config
// puerto
const port = 8080;
const ready = console.log("server listening on port: "+port);

// para inicializar el servidor
app.listen(port, ready);

// configuro el server con otras funcionalidades (Middleware)
app.use(express.json()); // para devolver archivos json
app.use(express.urlencoded({extended:true})); // para leer params (mediante postman??)
// configuro la session con mongo -> de la creacion y eliminacion de la sesion 
// se encarga mongo
// por defecto se crea una session collection
app.use(session({
    store:MongoStore.create({
        mongoUrl:"mongodb+srv://admin:admin12345@e-commerce.hvkblbb.mongodb.net/ecommerce",
        ttl:15 // tiempo de duración 15 mins
    }),
    secret:"coder12345",
    resave:true,
    saveUninitialized:true
}));
// configuramos los middleware para usar passport
app.use(passport.initialize());
app.use(passport.session());
initializePassword();

//configuro el middleware para cookieParser
app.use(cookieParser("secret"));

// config de hadlebars 
app.engine("handlebars", handlebars.engine()); //inicio el motor  de plantilla
app.set("views", __dirname+"/views"); // especifico la ruta de donde dispondrá los archivos(views) el motor de plantillas
app.set("view engine", "handlebars"); // indico el motor a utilizar

app.use("/", routes);
app.use("/",viewRoutes);

//console.log(env);
