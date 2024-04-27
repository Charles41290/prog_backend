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
app.get("/api/products", async (req, res) => {
    try {
        const {limit} = req.query;
        const products =  await productManager.getProducts(limit);
        return res.json({status:200, response: products} )
    } catch (error) {
        console.log(error);
    }
});

//utilizo req.params para obtener un producto según id
app.get("/api/products/:pid", async (req, res) => {
    try {
        // tengo que obtener del request el param/query pid
        const {pid} = req.params;
        const product =  await productManager.getProductById(parseInt(pid));
        // si el product NO existe me lanza un error que toma el catch
        if (!product) {
            const error = new Error("Product Not Found");
            error.status = 404;
            throw error;
        }
        return res.json({status:200, response: product} )
    } catch (error) {
        return res.json({status: error.status, response:error.message})
    }
});

app.post("/api/products", async (req, res) => {
    try {
        const product = req.body;
        const newProduct  = await productManager.addProduct(product);
        return res.json({status:201, response: newProduct});
    } catch (error) {
        console.log(error);
        return res.json({
            status: error.status,
            response: error.message
        });
    }
});

app.put("/api/products/:pid", async (req, res) => {
    try {
        const {pid} = req.params;
        const product = req.body;
        const updatedProduct = await productManager.updateProduct(parseInt(pid), product);
        if (updatedProduct) {
            return res.json({status:201, response: updatedProduct});
        }
        const error = new Error("Product Not Found");
        error.status = 404;
        throw error;
    } catch (error) {
        console.log(error);
        return res.json({
            status: error.status,
            response: error.message
        });
    }
})

app.delete("/api/products/:pid", async (req, res) => {
    try {
        const {pid} = req.params;
        const deletedProduct = await productManager.deleteProduct(parseInt(pid));
        if (deletedProduct) {
            return res.json({status:201, response: deletedProduct});
        }
        const error = new Error("Product Not Found");
        error.status = 404;
        throw error;
    } catch (error) {
        console.log(error);
        return res.json({
            status: error.status,
            response: error.message
        });
    }
})