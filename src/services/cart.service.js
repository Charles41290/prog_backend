import customsErrors from "../errors/customsErrors.js";
import cartRepository from "../persistences/mongo/repositories/cart.repository.js";
import productRepository from "../persistences/mongo/repositories/product.repository.js";

const getCartById = async (id) => {
    return await cartRepository.getByID(id)
}

const createCart = async () => {
    return await cartRepository.create();
}

const addProductToCart = async (cid,pid, user) => {
    const product = await productRepository.getProductById(pid);
    if (user.role === "premium" && product.owner === user._id) {
        throw customsErrors.unauthorizedError("Usuario no autorizado");
    }
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

// servicio para obtener el total del carrito
// del total se descartan aquellos productos que no tengan stock suficiente
const purchaseCart = async (cid) => {
    // buscamos el carrito
    const cart = await cartRepository.getByID(cid);

    // verificamos los productos que tienen stock en disponibilidad
    // voy a poder comprar aquellos productos que tengan stock
    let total = 0;
    const products = []; // almacenará los productos que no tienen stock suficiente

    // recorremos cada uno de los products que esten en cart
    // forof respeta el asincronismo
    for (const product of cart.products) {
        const prod = await productRepository.getProductById(product.product) // .product es el id del producto almacenado
        // verifico si el estock del producto es mayor a la quantity del producto en el cart
        if( prod.stock >= product.quantity ) {
            total += prod.price * product.quantity;
        } else { // si no hay estock suficiente 
            products.push(product)
        }
    }

    // actualizamos el cart con los products sin stock suficiente
    await cartRepository.updateCartById(cid,products)

    return total;

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