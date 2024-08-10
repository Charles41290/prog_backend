import { Router } from "express";
import productRoutes from "./products.routes.js"
import cartRoutes from "./cart.routes.js"
import testRoutes from "./test.routes.js"
import sessionRoutes from "./session.routes.js"
import mockRoutes from "./mock.routes.js"

const router = Router();

// especifico las rutas para products
router.use("/",productRoutes);

// especifico las rutas para test
router.use("/",cartRoutes);

// especifico las rutas para test
router.use("/",testRoutes);

// especifico las rutas para session
router.use("/api/session", sessionRoutes);

router.use("/api", mockRoutes)

export default router;


