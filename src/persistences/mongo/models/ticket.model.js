import mongoose from "mongoose";


// nombre de la collection que almacena los documentos de productos
const ticketCollection = "ticket";

// creamos el schema
const ticketSchema = mongoose.Schema({
    code: {
        type: String,
        require: true, 
        unique: true
    },
    purchase_datetime: {
        type: Date,
        default: Date.now()
    },
    amount: {
        type: Number,
        require: true
    },
    purchaser: {
        type: String,
        require: true
    }
});

// mongoose.model recibe el nombre de la collection y el schema
export const ticketModel = mongoose.model(ticketCollection,ticketSchema);

