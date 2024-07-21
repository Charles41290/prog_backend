import cartDao from "../dao/mongoDao/cart.dao.js";

const getCartById = async (req, res) => {
    try {
        const {cid} = req.params;
        //const cart = await cartManager.getCartById(parseInt(cid))
        const cart = await cartDao.getByID(cid)
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

const createCart = async (req, res) => {
    try{
        const newCart = await cartDao.create();
        return res.json({status:200,response:"Success"});
    } catch (e){
        return res.json({status:500,response:"Error interno del servidor"});
    }
}

const addProductToCart = async (req, res) => {
    try {
        const {cid,pid} = req.params;
        //const cart = await cartManager.addProductToCart(parseInt(cid),parseInt(pid));
        const cart = await cartDao.addProductToCart(cid,pid);
        if(cart.cart == false){
            const error = new Error(`Cart with id:${cid} Not Found`);
            error.status = 404;
            throw error;
        }
        if(cart.prod == false){
            const error = new Error(`Product with id:${pid} Not Found`);
            error.status = 404;
            throw error;
        }
        return res.json({status:200,payload:cart});
    } catch (error) {
        return res.json({status: error.status, response:error.message});
    }
}

const updateProductQuantityInCart = async (req, res) => {
    try {
        const {pid,cid} = req.params;
        const {quantity} = req.body;
        const cart = await cartDao.updateProductQuantityInCart(pid,cid,quantity)
        if(cart.product == false){
            const error = new Error(`Product with id:${pid} Not Found`);
            error.status = 404;
            throw error;
        }
        if (cart.cart == false) {
            const error = new Error(`Cart with id:${cid} Not Found`);
            error.status = 404;
            throw error;
        }
        return res.json({status:200,payload:cart});
    } catch (error) {
        return res.json({status: error.status, response:error.message})
    }
}

const deleteProductInCart = async (req,res) => {
    try {
        const {cid,pid}=req.params;
        const cart = await cartDao.deleteProductInCart(cid, pid);
        if(cart.prod == false){
            const error = new Error(`Product with id:${pid} Not Found`);
            error.status = 404;
            throw error;
        }
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

const deleteAllProductsInCart = async (req,res) => {
    try {
        const {cid,pid}=req.params;
        const cart = await cartDao.deleteAllProductsInCart(cid);
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

const updateCartById = async (req, res) =>{
    try {
        const {cid} = req.params;
        const data = req.body;
        const cart = await cartDao.updateCartById(cid,data);
        if(!cart){return res.json({status:400, msg:"Cart Not Found"})}
        return res.json({status:200,payload:cart});
    } catch (error) {
        return res.json({status: error.status, response:error.message})
    }
}

export default {
    getCartById,
    createCart,
    addProductToCart,
    updateProductQuantityInCart,
    deleteProductInCart,
    deleteAllProductsInCart,
    updateCartById
}