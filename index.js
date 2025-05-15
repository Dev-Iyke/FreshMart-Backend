const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { Category } = require("./models/category")
const { Auth } = require("./models/auth")
const { Product } = require("./models/product")

const app =  express()
app.use(express.json())
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
app.post('/auth/signup', async (request, response) => {
  try {
    const {email, password, firstName, lastName, role} = request.body
    if(!email || !password){
      return response.status(409).json({
        success: false,
        message: "Missing required fields"
      })
    }

    const existingUser = await Auth.findOne({email})
    if(existingUser){
      return response.status(409).json({
        success: false,
        message: "User already exists. please sign in"
      })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const newUser = {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role
    }

    const createdUser = new Auth(newUser)
    await createdUser.save()

    return response.status(201).json({
      success: true,
      message: "User registered successfully",
      createdUser
    })
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: "An error occurred"
    })
  }
})



//LOGIN
app.post("/auth/login", async (request, response) => {
  const {email, password} = request.body
  const existingUser = await Auth.findOne({email})
  if(!existingUser){
    return response.status(404).json({
      success: false,
      message: `User with this email address does not exist`
    })
  }

  const isMatch = await bcrypt.compare(password, existingUser?.password)
  if (!isMatch){
    return response.status(400).json({
      success: true,
      message: `Invalid email or password`
    })
  }

  //You can check if user is verified

  // generate token
  const accessToken = jwt.sign(
    {id: existingUser?._id},
    process.env.ACCESS_TOKEN,
    {expiresIn: '10m'}
  )

  const refreshToken = jwt.sign(
    {id: existingUser?._id},
    process.env.REFRESH_TOKEN,
    {expiresIn: '10d'}
  )

  response.status(200).json({
    success: true,
    message: 'Login successful',
    accessToken,
    refreshToken,
    existingUser
  })
})


//CRUD
//Create category
app.post("/category/create", async(request, response) => {
  if (!request.body){
    return response.status(400).json({
      success: false,
      message: "missing request body"
    })
  }
  const {name} = request.body
  if (!name){
    return response.status(400).json({
      success: false,
      message: "missing required fields - category name"
    })
  }

  const newCategory = {
    name,
  }
  // const createdProduct = Category.create(newCategory)
  const createdCategory = new Category(newCategory)
  await createdCategory.save()
  return response.status(201).json({
    success: true,
    createdCategory
  })
})


//Create product
app.post("/product/create", async(request, response) => {
  if (!request.body){
    return response.status(400).json({
      success: false,
      message: "missing request body"
    })
  }
  const {name, price, inStock, category} = request.body
  if (!name || !price || !category){
    return response.status(400).json({
      success: false,
      message: "missing required fields"
    })
  }

  const newProduct = {
    name,
    price,
    inStock,
    category
  }
  // const createdProduct = Product.create(newProduct)
  const createdProduct = new Product(newProduct)
  await createdProduct.save()
  return response.status(201).json({
    success: true,
    message: 'Product created successfully',
    createdProduct
  })
})