import multer from "multer";
import path from "path";
import fs from "fs";
import customsErrors from "../errors/customsErrors.js";

const ensureDirectoriesExist = () => {
    // creo un array con los 3 directorios que necesito
    const directories = ["public/uploads/profiles","public/uploads/products","public/uploads/documents"];
    directories.forEach(dir => {
        // verificamos la existencia de los 3 paths 
        if(!fs.existsSync(dir)) { // si no existe crea el directorio
            fs.mkdirSync(dir, {recursive:true})
        }
    });
}

ensureDirectoriesExist();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // verifico el tipo de file que se quiere almacenar
        if(file.fieldname === "profile"){
            cb(null, "./public/uploads/profiles");
        } else if(file.fieldname === "product-img"){
            cb(null, "./public/uploads/products");
        } else if(file.fieldname === "document"){
            cb(null, "./public/uploads/documents");
        } else{ // si el fieldname no corresponde con alguno de los anteriores(profile, product-img, document)
            cb(customsErrors.badRequestError("Invalid fieldname"), null);
        }
    },
    filename: (req, file, cb) => {
        const userId = req.user._id;
        const extension = path.extname(file.originalname);// obtengo la extension del archivo
        const baseName = path.basename(file.originalname,extension); //obtengo el nombre del archivo
        cb(null, `${baseName}-${userId}${extension}`)

    }
});

export const upload = multer({storage});