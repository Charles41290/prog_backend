import express, { response } from "express";
import productManager from "./ProductManager.js"  ;


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

// configuramos solicitudes
app.get("/products", async (req, res) => {
    try {
        const {limit} = req.query;
       const products =  await productManager.getProducts(limit);
       return res.json({status:200, response: products} )
    } catch (error) {
        console.log(error);
    }
});

//utilizo req.params para obtener un producto según id
app.get("/products/:pid", async (req, res) => {
    try {
        // tengo que obtener del request el param/query pid
        const {pid} = req.params;
        const product =  await productManager.getProductById(parseInt(pid));
        if (!product) {
            const error = new Error("Not Found");
            error.status = 404;
            throw error;
        }
       return res.json({status:200, response: product} )
    } catch (error) {
        return res.json({status: error.status, response:error.message})
    }
});
