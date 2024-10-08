import { Router } from "express";
import productRoutes from "./products.routes.js";
import cartRoutes from "./cart.routes.js";
import testRoutes from "./test.routes.js";
import sessionRoutes from "./session.routes.js";
import mockRoutes from "./mock.routes.js";
import userRoutes from "./user.routes.js";

const router = Router();

// especifico las rutas para products
router.use("/api/products",productRoutes);

// especifico las rutas para carts
router.use("/api/cart",cartRoutes);

// especifico las rutas para test
router.use("/api/test",testRoutes);

// especifico las rutas para session
router.use("/api/session", sessionRoutes);

router.use("/api", mockRoutes);

// ruta para los usuarios
router.use("/api/user", userRoutes);

export default router;


