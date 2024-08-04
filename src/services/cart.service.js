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
    /* // verificamos la existencia del producto y del carrito
    const product = await productDao.getById(pid);
    const cart = await cartRepository.getByID(cid); */
    await checkProductAndCart(cid, pid);

    const productInCart = await cartRepository.update({_id:cid, "products.product":pid},{$inc:{"products.$.quantity":1}});

    // si no encuentra el producto en el carrito lo agrega 
    if(!productInCart){
        return await cartRepository.update({_id:cid},{$push:{products:{product:pid,quantity:1}}});
    }
    return productInCart;
}

const updateProductQuantityInCart = async (pid, cid, quantity) => {
    /* const product = await productDao.getById(pid);
    const cart = await cartDao.getByID(cid); */
    await checkProductAndCart(cid, pid);

    return cartRepository.update({_id:cid, "products.product":pid},{$set:{"products.$.quantity":quantity}})
}

const deleteProductInCart = async (cid,pid) => {
    /* const product = await productDao.getById(pid);
    const cart = await cartDao.getByID(cid); */
    await checkProductAndCart(cid, pid);

    return await cartRepository.update({_id:cid, "products.product":pid},{$inc:{"products.$.quantity":-1}});
}

const deleteAllProductsInCart = async (cid) => {
    return cartRepository.update({_id:cid},{$set:{products:[]}})
}

// REVISAR
const updateCartById = async (query,data) =>{
    return await cartRepository.update(query,data);
}

const checkProductAndCart = async (cid, pid) =>{
    const product = await productRepository.getProductById(pid);
    const cart = await cartRepository.getByID(cid);
    //checkProductAndCart(cid, pid);
    if (!product) {
        return {prod:false}
    }
    if (!cart) {
        return {cart:false}
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