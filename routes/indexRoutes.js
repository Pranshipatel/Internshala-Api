const express = require("express")
const { homePage ,
     studentsignup,
     studentsignout,
     studentsignin,
     currentUser,
     } = require("../controllers/indexController")
const { isAuthenticated } = require("../middlewares/auth")

const router = express.Router()


// GET /
router.get("/",isAuthenticated,homePage)


// POST /student
router.post("/student",isAuthenticated,currentUser)

// POST/student/signup
router.post("/student/signup",studentsignup)

// POST/student/signin
router.post("/student/signin",studentsignin)

// Get/student/signout
router.get("/student/signout",isAuthenticated,studentsignout)


module.exports = router