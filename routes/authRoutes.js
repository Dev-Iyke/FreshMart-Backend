const express = require("express")
const { handleUserSignup, handleLogin, handleGetAllUsers } = require("../controllers/auth")
const { authorization, adminAuthorization } = require("../middlewares/auth")

const authRouter = express.Router()

//AUTHENTICATION
//SIGNUP
authRouter.post('/auth/signup', handleUserSignup)

//LOGIN
authRouter.post("/auth/login", handleLogin)

authRouter.get("/users", authorization, handleGetAllUsers)

module.exports = authRouter