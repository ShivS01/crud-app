const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const logger = require("./utils/logger")
const middleware = require("./utils/middleware")
const dataRoute = require("./controller/dataRoute")
require("dotenv").config()

// Initializing and configuring express app

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Connect to DB
mongoose.Promise = global.Promise
mongoose
	.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => logger.info("Connected to DB!"))
	.catch((error) => logger.error("Error connecting to MongoDB:", error.message))

// Request logger middleware
app.use(middleware.requestLogger)

//Routes setup
app.use("/data", dataRoute)

// Error handler middleware
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

// Server
app.listen(process.env.PORT, () => {
	console.log(`Listening to requests on port: ${process.env.PORT}`)
})
