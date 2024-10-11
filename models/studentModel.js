const bcrypt = require("bcryptjs/dist/bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")

const studentModel = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 
            'Please provide a valid email address'
        ]
    },
    password: {
        type: String,
        select: false,
        maxlength: [15, "Password should not exceed 15 characters"],
        minlength: [6, "Password should have at least 6 characters"]
    }
}, { timestamps: true });

// Pre-save hook to hash password
studentModel.pre("save", function(next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
    next(); // Ensure to call next()
});

// Instance method to compare passwords
studentModel.methods.comparepassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

studentModel.methods.getjwttoken = function(){
    return  jwt.sign({id: this._id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    })
}

const Student = mongoose.model("Student", studentModel); // Capitalize the model name

module.exports = Student;
