import { Router, response } from "express";
//import cartManager from "../dao/fsManagers/CartManager.js";
import cartDao from "../dao/mongoDao/cart.dao.js";
import productDao from "../dao/mongoDao/product.dao.js";

const router = Router();

/* //configuramos solicitudes
router.get("/api/cart", async (req, res) => {
    const {cid} = req.params;
    return res.json({status:200,msg:"Todo Flama",cid:cid});
}); */

// ruta para obtener el carrito según su id
router.get("/api/cart/:cid", async (req, res) => {
    try {
        const {cid} = req.params;
        //const cart = await cartManager.getCartById(parseInt(cid))
        const cart = await cartDao.getByID(cid)
        if (!cart) {
            const error = new Error("Cart Not Found");
            error.status = 404;
            throw error;
        }
        return res.json({status:200,response:cart});
    } catch (error) {
        return res.json({status: error.status, response:error.message});
    }
});

// ruta para crear el carrito
router.post("/api/cart/", async (req, res) => {
    //const newCart = await cartManager.addCart();
    const newCart = await cartDao.create();
    return res.json({status:200,response:[]});
});

// ruta para agregar productos al carrito ya creado
router.post("/api/cart/:cid/product/:pid", async (req, res) => {
    try {
        const {cid,pid} = req.params;
        //const cart = await cartManager.addProductToCart(parseInt(cid),parseInt(pid));
        const cart = await cartDao.addProductToCart(cid,pid);
        if(cart.cart == false){
            const error = new Error(`Cart with id:${cid} Not Found`);
            error.status = 404;
            throw error;
        }
        if(cart.prod == false){
            const error = new Error(`Product with id:${pid} Not Found`);
            error.status = 404;
            throw error;
        }
        return res.json({status:200,payload:cart});
    } catch (error) {
        return res.json({status: error.status, response:error.message});
    }
});

// ruta para modificar la cantidad de un producto que ya esté en carrito
router.put("/api/cart/:cid/product/:pid", async (req, res) => {
    try {
        const {pid,cid} = req.params;
        const {quantity} = req.body;
        const cart = await cartDao.updateProductQuantityInCart(pid,cid,quantity)
        if(cart.product == false){
            const error = new Error(`Product with id:${pid} Not Found`);
            error.status = 404;
            throw error;
        }
        if (cart.cart == false) {
            const error = new Error(`Cart with id:${cid} Not Found`);
            error.status = 404;
            throw error;
        }
        return res.json({status:200,payload:cart});
    } catch (error) {
        return res.json({status: error.status, response:error.message})
    }

});

// ruta para descontar la quantity del producto en el carrito
router.delete("/api/cart/:cid/product/:pid", async (req,res) => {
    try {
        const {cid,pid}=req.params;
        const cart = await cartDao.deleteProductInCart(cid, pid);
        if(cart.prod == false){
            const error = new Error(`Product with id:${pid} Not Found`);
            error.status = 404;
            throw error;
        }
        if (cart.cart == false) {
            const error = new Error(`Cart with id:${cid} Not Found`);
            error.status = 404;
            throw error;
        }
        return res.json({status:200,payload:cart});
    } catch (error) {
        res.json({status:error.status,msg:error.message})
    }
});

// ruta para eliminar todos los productos del carrito
router.delete("/api/cart/:cid", async (req,res) => {
    try {
        const {cid,pid}=req.params;
        const cart = await cartDao.deleteAllProductsInCart(cid);
        if (cart.cart == false) {
            const error = new Error(`Cart with id:${cid} Not Found`);
            error.status = 404;
            throw error;
        }
        return res.json({status:200,payload:cart});
    } catch (error) {
        res.json({status:error.status,msg:error.message})
    }
});

// ruta para actualizar el carrito con un array de productos
// TODO 
router.put("/api/cart/:cid", async (req, res) =>{
    try {
        const {cid} = req.params;
        const data = req.body;
        const cart = await cartDao.updateCartById(cid,data);
        if(!cart){return res.json({status:400, msg:"Cart Not Found"})}
        return res.json({status:200,payload:cart});
    } catch (error) {
        return res.json({status: error.status, response:error.message})
    }
})

export default router;