exports.sendtoken = (student, statusCode, res) => {
    const token = student.getjwttoken();

    const options = { // changed 'option' to 'options'
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        // secure: true, // Uncomment this if you're using HTTPS in production
    };

    res.status(statusCode)
       .cookie("token", token, options) // now this matches the 'options' variable
       .json({ success: true, id: student._id, token });
};
