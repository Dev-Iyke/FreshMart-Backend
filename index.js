const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const cors = require("cors")
const { handleUserSignup, handleLogin, handleGetAllUsers } = require("./controllers/auth")
const { authorization, adminAuthorization } = require("./middlewares/auth")
const { handleGetAllCategories, handleCreateCategory, handleCreateProducts, handleGetAllProducts, handleGetProduct, handleCreateOrders } = require("./controllers/products")

const app =  express()
app.use(express.json())
app.use(cors())
dotenv.config()
const url = process.env.MONGODB_URL || "mongodb+srv://fresh-mart:fresh-mart@fresh-mart.eofdzso.mongodb.net/?retryWrites=true&w=majority&appName=fresh-mart"
const port = process.env.PORT

//Interact with the database using mongoose(connected by connection string)
mongoose.connect(url)
.then(() => {
  console.log("Mongoose Connected to MongoDB...")
  app.listen(port, (e) => {
    if(e){
      console.error("Error - App failed to listen: ", e)
    } else {
      console.log(`Server is listening at port ${port}`)
    }
  })
})
.catch(() => {
  console.error('Mongoose failed to connect to mongoDB')
})


//APIs
app.get("/", (request, response) => {
  response.send("You are connected")
})

//AUTHENTICATION
//SIGNUP
app.post('/auth/signup', handleUserSignup)

//LOGIN
app.post("/auth/login", handleLogin)

app.get("/users", authorization, adminAuthorization, handleGetAllUsers)


//CRUD
//Category
app.post("/category/create", authorization, adminAuthorization, handleCreateCategory)

// Get all categories
app.get("/categories", handleGetAllCategories)


//Product
//Create product
app.post("/product/create", authorization, adminAuthorization, handleCreateCategory)

// Get all products
app.get("/products", handleGetAllProducts)

// Get a product
app.get("/products/:id", handleGetProduct)


//Order
//Create an order
app.post('/orders', authorization, handleCreateOrders)

//Get an order
app.get('/orders', authorization, handleCreateOrders)