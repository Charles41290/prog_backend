import mongoose from "mongoose";
import { cartModel } from "../models/cart.model.js";
import productDao from "./product.dao.js";

const getByID = async (id) => {
    const cart = await cartModel.findById(id);
    return cart;
}

const create = async (data) => {
    const newCart = await cartModel.create(data);
    return newCart;
}

const addProductToCart = async (cid,pid) => {
    // buscamos el producto
    const product = await productDao.getById(pid);
    console.log(product);
    if (!product) {
        return {prod:false}
    }
    // buscamos el cart
    const cart = await cartModel.findById(cid);
    if (!cart) {
        return {cart:false}
    }
    // products es un campo de la cartCollection
    await cartModel.findByIdAndUpdate(cid, {$push: {products:product}})
    return cart;
}

export default {getByID, create, addProductToCart}