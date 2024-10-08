import { sendMail } from "../utils/sendMails.js";
import userRepository from "../persistences/mongo/repositories/user.repository.js"
import customsErrors from "../errors/customsErrors.js";
import { createHash, isValidPassord } from "../utils/hashPassword.js";

const sendEmailResetPassword = async (email) => {
    const msg = "Para restablecer su contraseña utilice el siguiente link: https://www.google.com.ar"
    await sendMail(email, "Restablecer password",msg);
    return "Email enviado"
};

const resetPassword = async (email, password) => {
    const user = await userRepository.getByEmail(email);
    if(!user) throw customsErrors.notFoundError("User not found");

    const passwordIsEqual = isValidPassord(user, password);
    if(passwordIsEqual) throw customsErrors.badRequestError("Password already exists");

    return await userRepository.update(user._id, {password: createHash(password)});
};

const changeUserRole = async (uid) => {
    const user = await userRepository.getById(uid);
    if(!user) throw customsErrors.notFoundError("User not found");

    // si el rol es de usuario y NO ha cargado los 3 documentos
    if(user.role === "user" && user.documents.length < 3 ) throw customsErrors.badRequestError("No se han cargado los documentos correspondientes")

    const userRole = user.role === "premium" ? "user" : "premium" // si el usuario tiene rol premium lo cambia a "user" y viceversa
    return await userRepository.update(uid, {role:userRole})
}

const addDocuments = async (uid, reqFiles) => {
    const files = reqFiles.document;
    const userDocuments = files.map( file => {
        return {name: file.filename,reference: file.path}
    })
    const user = await userRepository.update(uid, {documents: userDocuments});
    return user;
}

export default {sendEmailResetPassword, resetPassword, changeUserRole, addDocuments};
