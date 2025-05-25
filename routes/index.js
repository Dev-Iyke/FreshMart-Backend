const authRouter = require("./authRoutes")
const productsRouter = require("./productRoutes")

const routes = [
  authRouter,
  productsRouter
]

module.exports = routes