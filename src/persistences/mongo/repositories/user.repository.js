import { userModel } from "../models/user.model.js";
import { isValidPassord } from "../../../utils/hashPassword.js";

const getAll = async () => {
    const users = await userModel.find();
    return users;
}

const getById = async (id) => {
    const user = await userModel.findById(id);
    return user;
}

const getByEmail = async (email) => {
    // busco por email
    const user = await userModel.findOne({email});
    return user;
}

const create = async (data) => {
    const newUser = await userModel.create(data);
    return newUser;
}

const update = async (id, data) => {
    // findByIdAndUpdate devuelve el documento encontrado
    const user = await userModel.findByIdAndUpdate(id,data, {new : true});
    return user;
}

const deleteOne = async (id) => {
    const user = await userModel.deleteOne({_id:id});
    // verifico que haya eliminado un usero -> deletedCount != 0
    // si no lo eliminó  deleteCount == 0 -> retorna false
    if (user.deletedCount == 0) {
        return false;
    }
    return true; 
}

export default {getAll, getById, create, update, deleteOne, getByEmail}
