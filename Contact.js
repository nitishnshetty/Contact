const ContactInfo = require("./ContactInfo")
const NotFound = require("./error/NotFound")
const Validation = require("./error/Validation")

class Contact {
    static ID = 0
    constructor(contactFullName) {
        this.ID = Contact.ID++
        this.contactFullName = contactFullName
        this.contactInfo = []
    }

    newContactInfo(typeOfContact, valueOfContact) {
        let contactInfoObj = new ContactInfo(typeOfContact, valueOfContact)
        this.contactInfo.push(contactInfoObj)
        // console.log(this.contactInfo)
        return contactInfoObj
    }

    findContactInfo(contactInfoID) {
        try {
            for (let index = 0; index < this.contactInfo.length; index++) {
                if (contactInfoID === this.contactInfo[index].ID) {
                    return index
                }

            } throw new NotFound("contactInfoID not found")
        } catch (error) {
            return error
        }
    }

    getContactInfoByID(contactInfoID) {
        try {
            if (typeof contactInfoID != "number") {
                throw new Validation("contactInfoID input is invalid")
            }
            let indexOfContactInfo = this.findContactInfo(contactInfoID)
            return this.contactInfo[indexOfContactInfo]
        } catch (error) {
            throw error
        }
    }


getAllContactInfo(){
    return this.contactInfo
}

updateContactInfo(contactInfoID, parameter, newValue) {
    try {
        if (typeof contactInfoID != "number") { throw new Validation("ContactInfoID input is invalid") }
        let indexOfContactInfo = this.findContactInfo(contactInfoID)
        switch (parameter) {
            case "typeOfContact":
                if (typeof newValue !== "string") { throw new Validation("typeOfContact input is invalid") }
                this.contactInfo[indexOfContactInfo].typeOfContact = newValue
                return this.contactInfo[indexOfContactInfo]

            case "valueOfContact":
                if (typeof newValue !== "string") { throw new Validation("valueOfContact input is invalid") }
                this.contactInfo[indexOfContactInfo].valueOfContact = newValue
                return this.contactInfo[indexOfContactInfo]
            default: throw new Validation("Parameter in Invalid")
        }
    } catch (error) {
        return error
    }
}

deleteContactInfo(contactInfoID){
    try {
        if (typeof contactInfoID != "number") { throw new Validation("contactInfoID input is invalid") }
        let indexOfContactInfo = this.findContactInfo(contactInfoID)
        this.contactInfo.splice(indexOfContactInfo, 1)
    } catch (error) {
        return error
    }
}

}


module.exports = Contact