import { Router, response } from "express";
import cartManager from "../managers/CartManager.js";

const router = Router();

/* //configuramos solicitudes
router.get("/api/cart", async (req, res) => {
    const {cid} = req.params;
    return res.json({status:200,msg:"Todo Flama",cid:cid});
}); */

//configuramos solicitudes getByID
router.get("/api/cart/:cid", async (req, res) => {
    try {
        const {cid} = req.params;
        const cart = await cartManager.getCartById(parseInt(cid))
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

router.post("/api/cart/", async (req, res) => {
    const {cid} = req.params;
    const newCart = await cartManager.addCart();
    return res.json({status:200,response:newCart});
});

router.post("/api/cart/:cid/product/:pid", async (req, res) => {
    try {
        const {cid,pid} = req.params;
        const cart = await cartManager.addProductToCart(parseInt(cid),parseInt(pid));
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


export default router;