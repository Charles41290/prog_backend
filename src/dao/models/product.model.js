import mongoose from "mongoose";

// nombre de la collection que almacena los documentos de productos
const productCollection = "products";

// creamos el schema
const productSchema = mongoose.Schema({
    title: {
        type:String,
        require: true
    },
    description: {
        type:String,
        require: true
    },
    price: {
        type:Number,
        require: true
    },
    thumbnail: {
        type:Array,
        default: []
    },
    code: {
        type:String,
        require: true
    },
    stock: {
        type:Number,
        require: true
    },
    status: {
        type:Boolean,
        default: true
    } 
});

// mongoose.model recibe el nombre de la collection y el schema
export const productModel = mongoose.model(productCollection,productSchema);

