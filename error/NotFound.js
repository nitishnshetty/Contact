const BaseError = require("./BaseError");

class NotFound extends BaseError{
    constructor(specificMessage){
        super("Not Found", "Not-Found",404, specificMessage)
    }
}

module.exports = NotFound