import { expect} from "chai";
import supertest from "supertest";
import mongoose from "mongoose";
import productRepository from "../src/persistences/mongo/repositories/product.repository.js";

const nameDB = 'ecommerce'
const urlDB = `mongodb+srv://admin:admin12345@e-commerce.hvkblbb.mongodb.net/${nameDB}`

mongoose.connect(urlDB);

const requester = supertest("http://localhost:8080");

describe("Test-Product",() => {
    // para la creacion de productos necesitamos loguearnos previamente
    let cookie;
    before(async () => {
        const loggedUser = {
            email:"charles9010@gmail.com",
            password:"12345"
        }
        const {status, _body, ok, headers} = await requester.post("/api/session/login").send(loggedUser);
        cookie = headers["set-cookie"][0];
    })

    // declaro productId que lo obtendré del payload
    let productId;
    it("[POST] /api/products -> crea un producto",async () => {
        const newProduct = {
            title:"Product Test",
            price:600,
            description: "Cinturon de cuero",
            category:"Indumentaria",
            thumbnail: "www.images.com",
            code: "66666",
            status:true
        }
        const {status, _body, ok} = await requester.post("/api/products").send(newProduct).set("Cookie",[cookie]);
        productId = _body.response._id;

        expect(status).to.be.equal(200);
        expect(_body.response.title).to.be.equal("Product Test");
        expect(ok).to.be.equal(true);
    });

    it("[GET] /api/products/:pid -> devuelve un producto",async () => {

        const {status, _body, ok} = await requester.get(`/api/products/${productId}`)

        expect(status).to.be.equal(200);
        expect(_body.response.title).to.be.equal("Product Test");
        expect(ok).to.be.equal(true);
    });

    it("[GET] /api/products/:pid -> devuelve todos los producto",async () => {

        const {status, _body, ok} = await requester.get(`/api/products`);
        expect(status).to.be.equal(200);
        expect(ok).to.be.equal(true);
        expect(_body.response.docs).to.be.an("array");
        
    });

    it("[PUT] /api/products/:pid -> actualiza un producto",async () => {
        const updateProduct = {
            title:"Test updated",
            description:"product test updated"
        }
        const {status, _body, ok} = await requester.put(`/api/products/${productId}`).send(updateProduct).set("Cookie",[cookie]);
        expect(status).to.be.equal(200);
        expect(ok).to.be.equal(true);
        expect(_body.response.title).equal("Test updated");
        expect(_body.response.description).equal("product test updated");
        
    });

    it("[DELETE] /api/products/:pid -> elimina un producto", async () => {
        const {status, _body, ok} = await requester.delete(`/api/products/${productId}`).set("Cookie",[cookie]);
        expect(status).to.be.equal(200);
        expect(ok).to.be.equal(true);
    });
    

    after(async () => {

        mongoose.disconnect();
    })


});