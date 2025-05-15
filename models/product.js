const mongoose = require("mongoose");
const Category = require("./category");

const productSchema = new mongoose.Schema({
  name: {type: String, require: true},
  price: {type: Number, require: true},
  inStock: {type: Boolean, default: false},
  category: {type: mongoose.Schema.Types.ObjectId, ref: "Category"}
}, {timestamps: true})

const Product = mongoose.model("Product", productSchema)
module.exports = {
  Product
}