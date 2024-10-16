const { catchAsyncErrors } = require("../middlewares/catchAsyncError");
const Student = require("../models/studentModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendmail } = require("../utils/nodemailer");
const { sendtoken } = require("../utils/SendToken");


exports.homePage = catchAsyncErrors(async(req,res,next)=>{
        res.json({message:"secure home page"})
})

exports.currentUser = catchAsyncErrors(async(req,res,next)=>{
        const student = await student.findById(req.id).exec();
        res.json({student})
})

exports.studentsignup = catchAsyncErrors(async(req,res,next)=>{
        const student = await new Student(req.body).save()
        sendtoken(student , 201 , res)
})

exports.studentsignin = catchAsyncErrors(async(req,res,next)=>{
        const student = await Student.findOne({email: req.body.email})
             .select("+password")
             .exec();
        
        if(!student) {
            return next(
                new ErrorHandler("User not found",404)
            )
        }

        const isMatch = student.comparepassword(req.body.password);
        if(!isMatch)return next(new ErrorHandler("wrong credentials",500))

        sendtoken(student , 200 , res)
})

exports.studentsignout = catchAsyncErrors(async (req, res, next) => {
        // If an error happens here, it may be passed to the error handler, 
        // which will try to send a second response.
        res.clearCookie("token");
        return res.status(202).json({ message: "Successfully signed out" });
});
      
    

exports.studentsendmail= catchAsyncErrors(async(req,res,next)=>{
        const student = await Student.findOne({email: req.body.email}).exec()
        if(!student) {
                return next(
                 new ErrorHandler("User not found",404)
        )
        }

        const url = `${req.protocol}://${req.get("host")}/student/forget-link/${
                student._id}
                
                `
        sendmail(req,res,next,url);
        
        res.json({student,url})
})