//import productDao from "../dao/mongoDao/product.dao.js";
import { productModel } from "../models/product.model.js";

const getAllProducts = async (query, options) => {
    const products = await productModel.paginate(query,options);// el plugin paginate fue agregado en productsModel
    return products;
}

const getProductById = async (id) => {
    const product = await productModel.findById(id);
    return product;
}

const createProduct = async (data) => {
    const newProduct = await productModel.create(data);
    return newProduct;
}

const updateProduct =  async (id, data) => {
    // findByIdAndUpdate devuelve el documento encontrado
    const product = await productModel.findByIdAndUpdate(id,data, {new : true});
    return product;
}

const deleteProduct = async (id) => {
    const product = await productModel.deleteOne({_id:id});
    // verifico que haya eliminado un producto -> deletedCount != 0
    // si no lo eliminó  deleteCount == 0 -> retorna false
    if (product.deletedCount == 0) {
        return false;
    }
    return true;
}

export default {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}