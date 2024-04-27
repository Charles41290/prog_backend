import { Router } from "express";
import productManager from "../ProductManager.js";

const router = Router();

// configuramos solicitudes
router.get("/api/products", async (req, res) => {
    try {
        const {limit} = req.query;
        const products =  await productManager.getProducts(limit);
        return res.json({status:200, response: products} )
    } catch (error) {
        console.log(error);
    }
});

//utilizo req.params para obtener un producto según id
router.get("/api/products/:pid", async (req, res) => {
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

router.post("/api/products", async (req, res) => {
    try {
        const product = req.body;
        const newProduct  = await productManager.addProduct(product);
        if (newProduct) {
            return res.json({status:201, response: newProduct});
        }
        const error = new Error("Todos los campos son obligatorios/ Codigo de producto ya existe");
        error.status = 400;
        throw error;
    } catch (error) {
        console.log(error);
        return res.json({
            status: error.status,
            response: error.message
        });
    }
});

router.put("/api/products/:pid", async (req, res) => {
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
});

router.delete("/api/products/:pid", async (req, res) => {
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
});

export default router;