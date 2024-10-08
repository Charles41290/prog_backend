import mongoose from "mongoose";
import { logger } from "../utils/logger.js";

const nameDB = 'ecommerce'
const urlDB = `mongodb+srv://admin:admin12345@e-commerce.hvkblbb.mongodb.net/${nameDB}`

export const connectMongoDb = async () => {
    try {
        mongoose.connect(urlDB);
        //console.log("Conectados a Mongo DB");
        logger.info("Conectados a Mongo DB");
    } catch (error) {
        //console.log(error);
        logger.error(`Error: ${error}`)
    }
}