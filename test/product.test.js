import mongoose from "mongoose";
import productRepository from "../src/persistences/mongo/repositories/product.repository.js";
import { expect } from "chai";


const nameDB = 'ecommerce'
const urlDB = `mongodb+srv://admin:admin12345@e-commerce.hvkblbb.mongodb.net/${nameDB}`

describe("Test-Product Repository",() => {
    mongoose.connect(urlDB);

    
});