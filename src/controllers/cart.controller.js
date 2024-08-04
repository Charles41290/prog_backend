import cartService from "../services/cart.service.js";

const getCartById = async (req, res) => {
    try {
        const {cid} = req.params;
        //const cart = await cartManager.getCartById(parseInt(cid))
        //const cart = await cartDao.getByID(cid)
        const cart = await cartService.getCartById(cid)
        if (!cart) {
            const error = new Error("Cart Not Found");
            error.status = 404;
            throw error;
        }
        return res.json({status:200,response:cart});
    } catch (error) {
        return res.json({status: error.status, response:error.message});
    }
}

// fue agregado cartService
const createCart = async (req, res) => {
    try{
        //const newCart = await cartDao.create();
        const newCart = await cartService.createCart();
        return res.json({status:200,response:"Success"});
    } catch (e){
        return res.json({status:500,response:"Error interno del servidor"});
    }
}

const addProductToCart = async (req, res) => {
    try {
        const {cid,pid} = req.params;
        //const cart = await cartManager.addProductToCart(parseInt(cid),parseInt(pid));
        //const cart = await cartDao.addProductToCart(cid,pid);
        const cart = await cartService.addProductToCart(cid,pid);
        return res.json({status:200,payload:cart});
    } catch (error) {
        return res.json({status: error.status, response:error.message});
    }
}

const updateProductQuantityInCart = async (req, res) => {
    try {
        const {pid,cid} = req.params;
        const {quantity} = req.body;
        const cart = await cartService.updateProductQuantityInCart(pid,cid,quantity)
        return res.json({status:200,payload:cart});
    } catch (error) {
        return res.json({status: error.status, response:error.message})
    }
}

const deleteProductInCart = async (req,res) => {
    try {
        const {cid,pid}=req.params;
        const cart = await cartService.deleteProductInCart(cid, pid);
        return res.json({status:200,payload:cart});
    } catch (error) {
        res.json({status:error.status,msg:error.message})
    }
}

const deleteAllProductsInCart = async (req,res) => {
    try {
        const {cid,pid}=req.params;
        const cart = await cartService.deleteAllProductsInCart(cid);
        if (cart.cart == false) {
            const error = new Error(`Cart with id:${cid} Not Found`);
            error.status = 404;
            throw error;
        }
        return res.json({status:200,payload:cart});
    } catch (error) {
        res.json({status:error.status,msg:error.message})
    }
}

// REVISAR
const updateCartById = async (req, res) =>{
    try {
        const {cid} = req.params;
        const data = req.body;
        const cart = await cartService.updateCartById(cid,data);
        if(!cart){return res.json({status:400, msg:"Cart Not Found"})}
        return res.json({status:200,payload:cart});
    } catch (error) {
        return res.json({status: error.status, response:error.message})
    }
}

const purchaseCart = async (req,res) => {
    try {
        // llamar al servicio
    } catch (error) {

    }
}

export default {
    getCartById,
    createCart,
    addProductToCart,
    updateProductQuantityInCart,
    deleteProductInCart,
    deleteAllProductsInCart,
    updateCartById,
    purchaseCart
}