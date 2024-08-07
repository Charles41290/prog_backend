import { productDto } from "../dto/product-response.dto.js";
import productRepository from "../persistences/mongo/repositories/product.repository.js";
import error from "../errors/customsErrors.js"

const getAllProducts = async (query, options) => {
    const products = await productRepository.getAllProducts(query, options);
    return products;
}

const getProductById = async (id) => {
    const productData = await productRepository.getProductById(id);
    //if(!productData) throw new Error(`Product id ${id} not found`);
    if(!productData) throw error.notFoundError(`Product id ${id} not found`);
    const product = productDto(productData);
    return product;
}

const createProduct = async (data) => {
    const product = await productRepository.createProduct(data);
    return product;
}

const updateProduct =  async (id, data) => {
    const product = await productRepository.updateProduct(id,data);
    return product;
}

const deleteProduct = async (id) => {
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