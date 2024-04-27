import express, { response } from "express";
import routes from "./routes/index.js"
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

app.use("/", routes);
