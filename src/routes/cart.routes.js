import { Router, response } from "express";
import { passportCall,authorization } from "../middlewares/passport.middleware.js";
import cartController from "../controllers/cart.controller.js";
import { checkProductAndCart } from "../middlewares/checkProductAndCart.middleware.js";
import { isUserCart } from "../middlewares/isUserCart.middleware.js";

const router = Router();

// ruta para obtener el carrito según su id
router.get("/:cid", cartController.getCartById);

// ruta para agregar productos al carrito ya creado
// isUserCart -> verificamos que el cart pertenezca al user
router.post("/:cid/product/:pid", passportCall("jwt"), authorization(["user","premium"]), checkProductAndCart, isUserCart ,cartController.addProductToCart);

// ruta para modificar la cantidad de un producto que ya esté en carrito
router.put("/:cid/product/:pid",passportCall("jwt"), authorization("user"), checkProductAndCart, cartController.updateProductQuantityInCart);

// ruta para descontar la quantity del producto en el carrito
router.delete("/:cid/product/:pid",passportCall("jwt"), authorization(["user","premium"]), checkProductAndCart,cartController.deleteProductInCart);

// ruta para eliminar todos los productos del carrito
router.delete("/:cid", passportCall("jwt"), authorization(["user","premium"]), cartController.deleteAllProductsInCart);

// ruta para actualizar el carrito con un array de productos
router.put("/:cid", passportCall("jwt"), authorization("user"), cartController.updateCartById);

router.get("/:cid/purchase", passportCall("jwt"), authorization(["user","premium"]), cartController.purchaseCart);
export default router;