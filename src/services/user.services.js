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
    const userRole = user.role === "premium" ? "user" : "premium" // si el usuario tiene role premium lo cambia a "user" y viceversa
    return await userRepository.update(uid, {role:userRole})
}

export default {sendEmailResetPassword, resetPassword, changeUserRole};
