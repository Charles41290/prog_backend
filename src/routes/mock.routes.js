import { Router} from "express";
import { generateProductsMocks } from "../mocks/product.mock.js";

const router = Router();

router.get("/mockingproducts", async (req, res) => {
    const products = generateProductsMocks(100);
    return res.json({status:200,payload:products});
})

export default router;