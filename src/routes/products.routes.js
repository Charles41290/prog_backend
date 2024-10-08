import { Router } from "express";
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
router.get("/", productController.getAllProducts);

//utilizo req.params para obtener un producto según id
router.get("/:pid", productController.getProductById);

router.post("/",passportCall("jwt"), authorization(["admin","premium"]), productController.createProduct);

router.put("/:pid",passportCall("jwt"), authorization(["admin","premium"]),productController.updateProduct);

router.delete("/:pid", passportCall("jwt"), authorization(["admin","premium"]), productController.deleteProduct);

export default router;