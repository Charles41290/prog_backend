import { productDto } from "../dto/product-response.dto.js";
import productRepository from "../persistences/mongo/repositories/product.repository.js";
import error from "../errors/customsErrors.js"
import { logger } from "../utils/logger.js";
import { sendMail } from "../utils/sendMails.js";

const getAllProducts = async (query, options) => {
    const products = await productRepository.getAllProducts(query, options);
    return products;
}

const getProductById = async (id) => {
    const productData = await productRepository.getProductById(id);
    if(!productData) throw error.notFoundError(`Product id ${id} not found`);
    const product = productDto(productData);
    return product;
}

const createProduct = async (data, user) => {
    let productData = data;
    if(user.role === "premium"){
        productData = {...data, owner:user.email}
    }
    const product = await productRepository.createProduct(productData);
    return product;
}

const updateProduct =  async (id, data) => {
    const product = await productRepository.updateProduct(id,data);
    return product;
}

const deleteProduct = async (id, user) => {
    const productData = await productRepository.getProductById (id);
    if(user.role === "premium" && productData.owner !== user.email) {
        throw error.unauthorizedError("Usuario no autorizado");
    }
    // si el usuario tiene rol admin y el producto no es de un admin(premium)
    // envio un email al usuario premium
    if(user.role === "admin" && productData.owner !== "admin"){
        await sendMail(productData.owner, "Producto eliminado", `El producto ${productData.title} ha sido eliminado por el usuario administrador`);
    }
    const product = await productRepository.deleteProduct(id);
    return product;
}

export default {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}