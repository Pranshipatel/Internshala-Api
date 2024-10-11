class ErrorHandler extends Error {
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
        Error.captureStatckTrace(this , this.constructor);
    }
}

module.exports = ErrorHandler;