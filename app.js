const express = require("express")
const app = express()
require("dotenv").config({path:"./.env"})

// db connection
require("./models/database").connectDatabase();

// logger
const morgan = require('morgan');
app.use(morgan('combined'));

// bodyparser
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// session and cookie
const session = require("express-session")
const cookieParser = require("cookie-parser")
app.use(
  session({
  resave:true,
  saveUninitialized:true,
  secret:process.env.EXPRESS_SESSION_SECRET,
})
)
app.use(cookieParser());

// routes

app.use("/", require("./routes/indexRoutes"))

// error Handling
const ErrorHandler = require("./utils/ErrorHandler")
const {generatedErrors} = require("./middlewares/errors")

app.all("*",(req,res,next)=>{
  next(new ErrorHandler(`Requested URL not found ${req.url}`,404))
})

app.use(generatedErrors)


app.listen(process.env.PORT , console.log("server running on port 8080 "))

