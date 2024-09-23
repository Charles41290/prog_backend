import mongoose from "mongoose";
import userRepository from "../src/persistences/mongo/repositories/user.repository.js";
import { expect } from "chai"; // expect para realizar las inserciones

const nameDB = 'ecommerce'
const urlDB = `mongodb+srv://admin:admin12345@e-commerce.hvkblbb.mongodb.net/${nameDB}`

describe("Test User Repository", () => { // el callback ejecuta todos los test
    mongoose.connect(urlDB);
    before(() => {
        console.log("Se ejecuta antes de los tests");
    })

    beforeEach(() => { // se ejecuta antes de cada test
        console.log("Ejecución antes de cada test");
    })

    it("Obtener todos los usuarios", async () => { // identifico uno a uno los test a realizar
        console.log("Todos los usuarios");
    }) 

    it("Crear un usuario", async () => {
        const newUser = {
            first_name : "User test",
            last_name : "Test",
            email:"user-test@test.com",
            password: "123",
            age:20
        }

        const user = await userRepository.create(newUser);
        expect(user.first_name).to.equal("User test");
    })
    
    afterEach(() => {
        console.log("Ejecución después de cada test");
    })

    after (() => {
        console.log("Test finalizados");
        mongoose.disconnect();
    })
});