const BaseError = require("./BaseError");

class Validation extends BaseError{
    constructor(specificMessage){
        super("Validation", "Validation",403, specificMessage)
    }
}

module.exports=Validation