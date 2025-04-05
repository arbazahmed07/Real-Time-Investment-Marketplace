const express = require("express");
const authRouter=express.Router();
const {
    signup: signup,
    login: login,
    forgotPassword:forgotPassword,
    fetchUserByEmail:fetchUserByEmail,
    updateUserProfile:updateUserProfile,
    getAllUsers:getAllUsers
}=require('../controller/userController')

authRouter
.route('/signup')
.post(signup)

authRouter
.route('/login')
.post(login)

authRouter
.route("/forgotPassword")
.post(forgotPassword);

authRouter
.route("/fetchUserByEmail")
.get(fetchUserByEmail);

authRouter
.route("/updateUserProfile")
.put(updateUserProfile);

// Add new route to get all users
authRouter
.route("/all")
.get(getAllUsers);

module.exports=authRouter;
