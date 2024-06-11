import bcrypt from "bcrypt";

// funcion para hashear la contraseña
export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
};


// funcion para validar la contraseña
// recibe el password por body 
export const isValidPassord = (user,password) => {
    return bcrypt.compareSync(password, user.password);
}