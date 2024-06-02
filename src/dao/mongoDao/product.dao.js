import { query } from "express";
import { productModel } from "../models/product.model.js";

const getAll = async (query,options) => {
    const products = await productModel.paginate(query,options);// el plugin paginate fue agregado en productsModel
    return products;
}

const getById = async (id) => {
    const product = await productModel.findById(id);
    return product;
}

const create = async (data) => {
    const newProduct = await productModel.create(data);
    return newProduct;
}

const update = async (id, data) => {
    // findByIdAndUpdate devuelve el documento encontrado
    const product = await productModel.findByIdAndUpdate(id,data);
    return product;
}

const deleteOne = async (id) => {
    const product = await productModel.deleteOne({_id:id});
    // verifico que haya eliminado un producto -> deletedCount != 0
    // si no lo eliminó  deleteCount == 0 -> retorna false
    if (product.deletedCount == 0) {
        return false;
    }
    return true;
}

export default {getAll, getById, create, update, deleteOne}