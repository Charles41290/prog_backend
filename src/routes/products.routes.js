import { Router } from "express";
//import productManager from "../dao/fsManagers/ProductManager.js";
import productDao from "../dao/mongoDao/product.dao.js"
import { isLogin } from "../middlewares/isLogin.middleware.js";
import {passportCall, authorization} from "../middlewares/passport.middleware.js"
import productController from "../controllers/products.controller.js"

const router = Router();

// ruta para obtener los productos
// agrego el middleware isLogin para verificar que si se está
// logueado me muestre los productos
// si queremos verificar el login en todos los endpoints
// podemos utilizar el middleware en el index de rutas
router.get("/api/products", productController.getAllProducts);

//utilizo req.params para obtener un producto según id
router.get("/api/products/:pid", productController.getProductById);

//router.post("/api/products",passportCall("jwt"), authorization("admin"), productController.createProduct);
router.post("/api/products", productController.createProduct);

//router.put("/api/products/:pid",passportCall("jwt"), authorization("admin"),productController.updateProduct);
router.put("/api/products/:pid",productController.updateProduct);

router.delete("/api/products/:pid", passportCall("jwt"), authorization("admin"), productController.deleteProduct);

export default router;