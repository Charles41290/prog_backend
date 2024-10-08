import { Router, response } from "express";

const router = Router();

router.get("/", (req, res) =>{
    try {
        return res.json({status:200, response:"Welcome to the jungle"})
    } catch (error) {
        return res.json({status:error.status, response:error.message})
    }
})

export default router;