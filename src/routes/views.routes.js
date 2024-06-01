import { Router } from "express";

const router = Router();

router.get("/home",(req,res) =>{
    let person = {name:"Charles", lastname:"Romero"}

    // home es el nombre de la plantilla que voy a crear -> se encuentra en views
    res.render("home",person)

});

export default router;