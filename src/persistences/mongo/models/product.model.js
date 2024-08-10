import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

// nombre de la collection que almacena los documentos de productos
const productCollection = "products";

// creamos el schema
const productSchema = mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    description: {
        type:String,
        required: true
    },
    price: {
        type:Number,
        required: true
    },
    thumbnail: {
        type:Array,
        default: []
    },
    code: {
        type:String,
        required: true
    },
    stock: {
        type:Number,
        require: true
    },
    status: {
        type:Boolean,
        default: true
    },
    category: {
        type:String,
        required:true
    }
});

//agregamos al Schema el plugin de mongoose-paginate
productSchema.plugin(mongoosePaginate);

// mongoose.model recibe el nombre de la collection y el schema
export const productModel = mongoose.model(productCollection,productSchema);

