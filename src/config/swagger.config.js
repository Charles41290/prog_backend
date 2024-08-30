import swaggerJSDoc from "swagger-jsdoc";
import __dirname from "../../dirname.js"

const swaggerOptions = {
    swaggerDefinition : {
        openapi : "3.0.1",
        info : {
            title : "Documentacion de API",
            version : "1.0.1",
            description : "API relacionada con e-commerce"
        }
    },
    apis : [`${__dirname}/src/docs/**/*.yaml`] // lee todos los archivos con extensión yaml dentro de la carpeta docs
}

export const specs = swaggerJSDoc(swaggerOptions);