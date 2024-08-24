//import productDao from "../dao/mongoDao/product.dao.js";
import productService from "../services/product.service.js";
import err from "../errors/customsErrors.js"
import { logger } from "../utils/logger.js";

const getAllProducts = async (req, res) => {
    try {
        //recibo 
        const {limit, page, sort,category,status } = req.query;
        const options = {
            limit:limit || 10, // si no hay limit por defecto es 10
            page: page || 1, // si no hay page for defecto es 1
            sort:{price: sort === "asc" ? 1 : -1}, // por defecto toma el orden descendente(-1)
            lean:true // propiedad que solicita el mongoose-paginate
        }

        // si tengo el category y el status definido
        if (category) {
            //const products = await productDao.getAll({category:category})
            const products = await productService.getAllProducts({category:category})
            return res.json({status:200,payload:products})
        }

        if (status) {
            //const products = await productDao.getAll({status:status})
            const products = await productService.getAllProducts({status:status})
            return res.json({status:200,payload:products})
        }

        // en caso que no haya category/status en recibe un objeto vacio {}
        //const products = await productDao.getAll({}, options);
        const products = await productService.getAllProducts({}, options);
        return res.json({status:200, response: products} )
    } catch (error) {
        logger.error(`${error}`);
    }
}

const getProductById = async (req, res, next) => { // agregamos el param next
    try {
        // tengo que obtener del request el param/query pid
        const {pid} = req.params;
        //const product =  await productManager.getProductById(parseInt(pid));
        //const product =  await productDao.getById(pid);
        const product =  await productService.getProductById(pid);
        // si el product NO existe me lanza un error que toma el catch
        /* if (!product) {
            const error = new Error("Product Not Found");
            error.status = 404;
            throw error;
        } */
        return res.json({status:200, response: product} )
    } catch (error) {
        //return res.json({status: error.status, response:error.message})
        next(error); // ejecuta el errorHandle configurado en el app.js
    } 
}

const createProduct = async (req, res, next) => {
    try {
        const product = req.body;
        const newProduct  = await productService.createProduct(product);
        //if(!newProduct) throw error.missingInfo(msg);
        return res.json({status:201, response: newProduct});
    } catch (error) {
        //error = {...error,status:400}
        //error = {status:400,...error}
        error = err.missingInfo();
        next(error);
    }
}

const updateProduct =  async (req, res) => {
    try {
        const {pid} = req.params;
        const product = req.body;
        //const updatedProduct = await productManager.updateProduct(parseInt(pid), product);
        //const updatedProduct = await productDao.update(pid, product);
        const updatedProduct = await productService.updateProduct(pid, product);
        if (updatedProduct) {
            return res.json({status:201, response: updatedProduct});
        }
        const error = new Error("Product Not Found");
        error.status = 404;
        throw error;
    } catch (error) {
        logger.error(`${error}`)
        return res.json({
            status: error.status,
            response: error.message
        });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const {pid} = req.params;
        //const deletedProduct = await productManager.deleteProduct(parseInt(pid));
        //const deletedProduct = await productDao.deleteOne(pid);
        const deletedProduct = await productService.deleteProduct(pid);
        if (deletedProduct) {
            return res.json({status:201, response: deletedProduct});
        }
        const error = new Error("Product Not Found");
        error.status = 404;
        throw error;
    } catch (error) {
        return res.json({
            status: error.status,
            response: error.message
        });
    }
}

export default {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}