import { request, response } from "express";
import productService from "../services/product.service.js";
import cartService from "../services/cart.service.js";

export const checkProductAndCart = async (req = request, res = response, next) => {
    const {cid,pid} = req.params;
    // verificar -> si el producto existe, pero no está en el cart tira error
    const product = await productService.getProductById(pid);
    const cart = await cartService.getCartById(cid);

    if (!cart) return res.json({status:"Error", msg: `Cart with id:${cid} Not Found`})
    if(!product) return res.json({status:"Error", msg: `Product with id:${pid} Not Found`});

    next();
}

