import cartDao from "../dao/mongoDao/cart.dao.js";
import productDao from "../dao/mongoDao/product.dao.js";

const getCartById = async () => {
    
}

const createCart = async () => {
    return await cartDao.create();
}

const addProductToCart = async (cid,pid) => {
    // verificamos la existencia del producto y del carrito
    const product = productDao.getById(pid);
    const cart = productDao.getCartById(cid);
    return await cartDao.addProductToCart(cid,pid);
}

const updateProductQuantityInCart = async () => {

}

const deleteProductInCart = async (req,res) => {

}

const deleteAllProductsInCart = async (req,res) => {

}

const updateCartById = async () =>{

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