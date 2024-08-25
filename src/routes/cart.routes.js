import { Router, response } from "express";
//import cartManager from "../dao/fsManagers/CartManager.js";
import cartDao from "../dao/mongoDao/cart.dao.js";
import productDao from "../dao/mongoDao/product.dao.js";
import passport from "passport";
import { passportCall,authorization } from "../middlewares/passport.middleware.js";
import cartController from "../controllers/cart.controller.js";
import { checkProductAndCart } from "../middlewares/checkProductAndCart.middleware.js";
import { isUserCart } from "../middlewares/isUserCart.middleware.js";

const router = Router();

/* //configuramos solicitudes
router.get("/api/cart", async (req, res) => {
    const {cid} = req.params;
    return res.json({status:200,msg:"Todo Flama",cid:cid});
}); */

// ruta para obtener el carrito según su id
router.get("/api/cart/:cid", cartController.getCartById);

// ruta para crear el carrito
router.post("/api/cart/", passportCall("jwt"),authorization("user"), cartController.createCart);

// ruta para agregar productos al carrito ya creado
// isUserCart -> verificamos que el cart pertenezca al user
router.post("/api/cart/:cid/product/:pid", passportCall("jwt"), authorization(["user","premium"]), checkProductAndCart, isUserCart ,cartController.addProductToCart);

//router.post("/:cid/product/:pid", passportCall("jwt"), authorization("user"), checkProductAndCart, isUserCart, cartsControllers.addProductToCart);

// ruta para modificar la cantidad de un producto que ya esté en carrito
router.put("/api/cart/:cid/product/:pid",passportCall("jwt"), authorization("user"), checkProductAndCart, cartController.updateProductQuantityInCart);

// ruta para descontar la quantity del producto en el carrito
router.delete("/api/cart/:cid/product/:pid",passportCall("jwt"), authorization(["user","premium"]), checkProductAndCart,cartController.deleteProductInCart);

// ruta para eliminar todos los productos del carrito
router.delete("/api/cart/:cid", passportCall("jwt"), authorization(["user","premium"]), cartController.deleteAllProductsInCart);

// ruta para actualizar el carrito con un array de productos
// TODO 
router.put("/api/cart/:cid", passportCall("jwt"), authorization("user"), cartController.updateCartById);

router.get("/api/cart/:cid/purchase", passportCall("jwt"), authorization(["user","premium"]), cartController.purchaseCart);
export default router;