const express = require("express")
const { authorization, adminAuthorization } = require("../middlewares/auth")
const { handleCreateCategory, handleGetAllCategories, handleGetAllProducts, handleGetProduct, handleCreateOrders, handleGetAllOrders, handleGetUserOrders, handleCreateProducts } = require("../controllers/products")

const productsRouter = express.Router()


//Category
productsRouter.post("/category/create", authorization, adminAuthorization, handleCreateCategory)

// Get all categories
productsRouter.get("/categories", handleGetAllCategories)


//Product
//Create product
productsRouter.post("/product/create", authorization, adminAuthorization, handleCreateProducts)

// Get all products
productsRouter.get("/products", handleGetAllProducts)

// Get a product
productsRouter.get("/products/:id", handleGetProduct)


//Order
//Create an order
productsRouter.post('/orders', authorization, handleCreateOrders)

//Get an order
productsRouter.get('/orders', authorization, adminAuthorization, handleGetAllOrders)

//Get a user past orders
productsRouter.get('/user/orders', authorization, handleGetUserOrders)

module.exports = productsRouter