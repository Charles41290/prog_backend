//import cartDao from "../dao/mongoDao/cart.dao.js";
//import productDao from "../dao/mongoDao/product.dao.js";
import cartRepository from "../persistences/mongo/repositories/cart.repository.js";
import productRepository from "../persistences/mongo/repositories/product.repository.js";


const getCartById = async (id) => {
    return await cartRepository.getByID(id)
}

const createCart = async () => {
    return await cartRepository.create();
}

const addProductToCart = async (cid,pid) => {
    return await cartRepository.addProductToCart(cid, pid);
}

const updateProductQuantityInCart = async (pid, cid, quantity) => {
    return await cartRepository.updateProductQuantityInCart(pid,cid, quantity);
}

const deleteProductInCart = async (cid,pid) => {
    return await cartRepository.deleteProductInCart(cid, pid);
}

const deleteAllProductsInCart = async (cid) => {
    return await cartRepository.deleteAllProductsInCart(cid);
}

// REVISAR
const updateCartById = async (query,data) =>{
    return await cartRepository.update(query,data);
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