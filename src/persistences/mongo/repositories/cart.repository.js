import mongoose from "mongoose";
//import productDao from "./product.dao.js";
import { cartModel } from "../models/cart.model.js";
import { productModel } from "../models/product.model.js";

const getByID = async (id) => {
    const cart = await cartModel.findById(id);
    return cart;
}

const create = async (data) => {
    const newCart = await cartModel.create(data);
    return newCart;
}

// agrego un producto al cart, si este ya está actualiza quantity
const addProductToCart = async (cid,pid) => {
    // verificamos la existencia del producto y del carrito por individual
    // buscamos el producto
    //const product = await productDao.getById(pid);

    // buscamos por cid y pid -> si encuentra el producto en el carrito aumenta quantity en 1
    // findOneAndUpdate retorna el producto sin haber actualizado
    const productInCart = await cartModel.findOneAndUpdate({_id:cid, "products.product":pid},{$inc:{"products.$.quantity":1}}, {new:true})
    
    // si no encuentra el producto en el carrito lo agrega 
    if(!productInCart){
        return await cartModel.findOneAndUpdate({_id:cid},{$push:{products:{product:pid,quantity:1}}}, {new: true});
    }

    // buscamos el cart actualizado y lo retornamos
    /* const cartUpdated = await cartModel.findById(cid).populate("products.product");
    return cartUpdated; */

    return productInCart;
}

// borro un producto en el cart, si quantity > 1 descuento en 1 este campo
const deleteProductInCart = async (cid,pid) => {
    //const product = await productDao.getById(pid);
    // buscamos el cart y el product -> en caso de no encontrar el product en el cart retorna null
    // si no existe el pid -> retorna null
    const cart = await cartModel.findOneAndUpdate({_id:cid, "products.product":pid},{$inc:{"products.$.quantity":-1}}, {new:true});
    // si el producto no está en el cart -> cart == null
    if (!cart) {
        const error = new Error(`Product with id:${pid} Not Found in Cart`);
        error.status = 404;
        throw error;
    }
    return cart;
}

const deleteAllProductsInCart = async (cid)=> {
    // buscamos el cart
    /* const cart = await cartModel.findById(cid);
    if (!cart) {
        return {cart:false}
    } */
    const cart = await cartModel.findOneAndUpdate({_id:cid},{$set:{products:[]}}, {new:true});
    //const cartUpdated = cartModel.findById(cid);
    //return cartUpdated;

    return cart;
}

const updateProductQuantityInCart = async (pid, cid, quantity) => {
    const cart = await cartModel.findOneAndUpdate({_id:cid, "products.product":pid},{$set:{"products.$.quantity":quantity}}, {new:true});
    // si no existe el pid -> cart == null
    if (!cart) {
        const error = new Error(`Product with id:${pid} Not Found in Cart`);
        error.status = 404;
        throw error;
    }
    return cart;
}

// actualizo el array de products en el carrito
// TODO -> verificar el por que no funciona
const updateCartById = async (cid, products) =>{
    /* await cartModel.updateOne({_id:cid},{$set: {products:[data]}});
    const cart = await cartModel.findById(cid);
    return cart; */
    return cartModel.findByIdAndUpdate(cid, {$set: {products}}, {new:true});
};

// genero una función update mas general
const update = async (query,data) =>{
    return cartModel.findOneAndUpdate(query, data, {new: true});
};

export default {getByID, create, addProductToCart,deleteProductInCart, deleteAllProductsInCart, updateProductQuantityInCart,updateCartById, update}