import { expect} from "chai";
import supertest from "supertest";
import mongoose from "mongoose";
import { userModel } from "../src/dao/models/user.model.js";

const nameDB = 'ecommerce'
const urlDB = `mongodb+srv://admin:admin12345@e-commerce.hvkblbb.mongodb.net/${nameDB}`
mongoose.connect(urlDB);

// config la direccion de nuestro endpoint en supertest
const requester = supertest("http://localhost:8080");

describe("Test-Session", () => {
    it("[POST] /api/session/register -> registra un usuario", async () => {
        const newUser = {
            first_name:"User",
            last_name:"Test",
            email:"user-test@gmail.com",
            password:"12345",
            age:34
        };

        const {status, _body, ok} = await requester.post("/api/session/register").send(newUser);

        // validaciones
        expect(status).to.be.equal(200);
        expect(ok).to.be.equal(true);
        expect(_body.status).to.be.equal(201);
    });

    let cookie; // voy a almacenar el token que está almacenado en una cookie
    let cookieResult;
    it("[POST] /api/session/login -> logea un usuario", async () => {
        const loggedUser = {
            email:"user-test@gmail.com",
            password:"12345"
        }
        const {status, _body, ok, headers} = await requester.post("/api/session/login").send(loggedUser);
        cookieResult = headers["set-cookie"][0]; // headers.set-cookie es un array en la pos 0 está el string que contiene el token

        // necesitamos separar esa string 
        cookie = {
            name: cookieResult.split("=")[0], // split me devuelve un array con tantas posiciones como "=" haya
            value : cookieResult.split("=")[1]
        }
        expect(ok).to.be.equal(true);
        expect(status).to.be.equal(200);
        expect(_body.payload.first_name).to.be.equal("User");
    })
    
    it("[GET] /api/session/current -> obtiene el usuario actualmente logeado", async () => {
        //const {status, _body, ok} = await requester.get("/api/session/current").set("Cookie",[`${cookie.name}=${cookie.value}`]);
        
        const {status, _body, ok} = await requester.get("/api/session/current").set("Cookie",[cookieResult]);    
        expect(_body.payload.email).to.be.equal("user-test@gmail.com");
        expect(_body.payload.role).to.be.equal("user");
    })

    after(async () => {
        await userModel.deleteOne({email:"user-test@gmail.com"});
        mongoose.disconnect();
    })
});