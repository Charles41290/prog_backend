import { Router } from "express";
import productRoutes from "./products.routes.js"
import testRoutes from "./test.routes.js"

const router = Router();

// especifico las rutas para products
router.use("/",productRoutes);

// especifico las rutas para products
router.use("/",testRoutes);

export default router;


