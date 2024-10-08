import customsErrors from "../errors/customsErrors.js";
import userServices from "../services/user.services.js";

const sendEmailResetPassword = async (req, res, next) => {
    try {
        const {email} = req.body;
        res.cookie("resetPassword", email, {httpOnly: true, maxAge: 10000});
        const response = await userServices.sendEmailResetPassword(email);
        res.json({status : 200, msg: response});
    } catch (error) {
        error.path = "[POST] api/user/email/reset-password"
        next(error)
    }
}

const resetPassword = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const emailCookie = req.cookies.resetPassword;
        if(!emailCookie) throw customsErrors.badRequestError("Email link expired");
        await userServices.resetPassword(email, password);
        res.json({status: 200, msg: "Password updated"});
    } catch (error) {
        error.path = "[POST] api/user/reset-password"
        next(error)
    }
}

const changeUserRole = async (req, res, next) => {
    try {
        const {uid} = req.params;
        const response = await userServices.changeUserRole(uid);
        res.json({status:200, msg:response})
        
    } catch (error) {
        error.path = "[GET] /api/user/premium/:uid";
        next(error);
    }
}

const addDocuments = async (req, res, next) => {
    try {
        const {uid} = req.params;
        const files = req.files;
        const response = await userServices.addDocuments(uid, files);
        res.json({status:200, msg:response})
        
    } catch (error) {
        error.path = "[POST] /api/user/:uid/documents";
        next(error)
    }
}

export default {sendEmailResetPassword, resetPassword, changeUserRole, addDocuments}