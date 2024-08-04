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
    const product = productModel.findById(pid)
    if (!product) {
        return {prod:false}
    }
    // buscamos el cart
    const cart = await cartModel.findById(cid);
    if (!cart) {
        return {cart:false}
    }

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
    const product = await productModel.findById(pid);
    if (!product) {
        return {prod:false}
    }

    let cart = await cartModel.findById(cid);
    if (!cart) {
        return {cart:false}
    }
    // buscamos el cart y el product -> en caso de no encontrar el product en el cart retorna null
    cart = await cartModel.findOneAndUpdate({_id:cid, "products.product":pid},{$inc:{"products.$.quantity":-1}}, {new:true});
    // si no existe el pid -> retorna prod:False
    /* if (!cart) {return {prod:false}}
    const cartUpdated = await cartModel.findById(cid).populate("products.product")
    return cartUpdated; */

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
    // verificamos la existencia del producto
    // buscamos el producto
    const product = await productModel.findById(pid);
    // si no existe el pid
    if(!product){return {product: false};}
    // buscamos el carrito
    const cart = await cartModel.findOneAndUpdate({_id:cid, "products.product":pid},{$set:{"products.$.quantity":quantity}}, {new:true});
    // si no existe el cid
    /* if(!cart){return {cart: false}}
    const cartUpdated = await cartModel.findById(cid);
    return cartUpdated; */
    return cart;
}

// actualizo el array de products en el carrito
// TODO -> verificar el por que no funciona
const updateCartById = async (cid,data) =>{
    /* await cartModel.updateOne({_id:cid},{$set: {products:[data]}});
    const cart = await cartModel.findById(cid);
    return cart; */
    return cartModel.findByIdAndUpdate(cid, data);
};

// genero una función update mas general
const update = async (query,data) =>{
    return cartModel.findOneAndUpdate(query, data, {new: true});
};

export default {getByID, create, addProductToCart,deleteProductInCart, deleteAllProductsInCart, updateProductQuantityInCart,updateCartById, update}