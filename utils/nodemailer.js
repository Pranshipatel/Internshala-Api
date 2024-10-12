const nodemailer = require("nodemailer")
const ErrorHandler = require("./ErrorHandler")

exports.sendmail = async(req,res,next,url)=> {
    const transport = nodemailer.createTransport({
        service :"gmail",
        host:"smtp.gmail.com",
        post: 465,
        auth:{
            user:process.env.MAIL_EMAIL_ADDRESS,
            pass:process.env.MAIL_EMAIL_PASSWORD,
        }
    })


    const mailOptions = {
        from :"master private limite",
        to: req.body.email,
        subject: "Password Reset Link",
        // "text":"Do not share this link to anyone"
        html:`
        <h1>Click link below to reset passwprd</h1>
           <a herf="${url}">Password reset link </a>
        `

    }
    
    transport.sendMail(mailOptions,(err,info)=>{
        if(err)return next (new ErrorHandler(err,500))
        console.log(info)
        
        return res.status(200).json({
            message:"mail sent successfully",
            url,
        })
        
    })
    
}