const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const cors = require("cors")
const routes = require("./routes")
const app =  express()
app.use(express.json())
app.use(cors())
dotenv.config()
const url = process.env.MONGODB_URL
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
app.get("/api/v1/", (request, response) => {
  response.send("You are connected")
})

app.use("/api/v1", routes)