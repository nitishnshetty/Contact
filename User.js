const Contact = require("./Contact")
const ContactInfo = require("./ContactInfo")
const NotFound = require("./error/NotFound")
const UnAuthorized = require("./error/UnAuthorized")
const Validation = require("./error/Validation")

class User {
    static ID = 0
    static allUser = []
    constructor(fullName, isAdmin, gender, country) {
        this.id = User.ID++
        this.fullName = fullName
        this.isAdmin = isAdmin
        this.gender = gender
        this.country = country
        this.contacts = []
    }

    newUser(fullName, gender, country) {
        try {
            if (typeof fullName != "string" || typeof gender != "string" || typeof country != "string") {
                throw new Validation("Validation input is wrong")
            }
            if (!this.isAdmin) {
                throw new UnAuthorized("User is not an Admin")
            }
            let userObj = new User(fullName, false, gender, country)
            User.allUser.push(userObj)
            return userObj
        } catch (error) {
            return error
        }
    }

    static newAdmin(fullName, gender, country) {
        try {
            if (typeof fullName != "string" || typeof gender != "string" || typeof country != "string") {
                throw new Validation("Validation input is wrong")
            }
            return new User(fullName, true)

        } catch (error) {
            return error
        }
    }

    newContact(contactFullName) {

        try {
            if (typeof contactFullName != "string") {
                throw new Validation("contactFullName input is wrong")
            }

            let contactObj = new Contact(contactFullName)
            this.contacts.push(contactObj)
        } catch (error) {
            return error
        }
        // return contactObj
        // console.log(contactObj)
    }

    createContactInfo(contactID, typeOfContact, valueOfContact) {
        try {
            if (typeof contactID != "number") {
                throw new Validation("ContactID input is wrong")

            }
            if (typeof typeOfContact != "string") {
                throw new Validation("typeOfContact input is wrong")
            }
            let [indexOfContacts, isContactExist] = this.findContact(contactID)
            if (!isContactExist) {
                return "Contact not found"
            }
            // let contactInfoObj = new ContactInfo(typeOfContact, valueOfContact)
            this.contacts[indexOfContacts].newContactInfo(typeOfContact, valueOfContact)
            return this.contacts[indexOfContacts]
        } catch (error) {

        }
    }



    getAllContactInfo() {
        return this.contactInfo
    }

    updateContactInfo(contactInfoID, parameter, newValue) {
        try {
            if (typeof contactInfoID != "number") { throw new Validation("ContactInfoID input is invalid") }
            let indexOfContactInfo = this.findContactInfo(contactInfoID)
            switch (parameter) {
                case "typeOfContact":
                    if (typeof newValue !== "string") { throw new Validation("Type of Contact input is invalid") }
                    Contact.contactInfo[indexOfContactInfo].typeOfContact = newValue
                    return Contact.contactInfo[indexOfContactInfo]

                case "valueOfContact":
                    if (typeof newValue !== "string") {throw new Validation("Value of contact input is invalid") }
                    Contact.contactInfo[indexOfContactInfo].valueOfContact = newValue
                    return Contact.contactInfo[indexOfContactInfo]
                default: throw new NotFound("No parameter found")
            }
        } catch (error) {
            return error
        }
    }

    deleteContactInfo(contactInfoID) {
        if (typeof contactInfoID != "number") { return "Invalid contactInfoID input" }
        let [indexOfContactInfo, isContactInfoExist] = Contact.findContactInfo(contactInfoID)
        if (isContactInfoExist) { return "Contact Info not found" }
        Contact.contactInfo.splice(indexOfContactInfo, 1)
    }


    findUser(userID) {
        try {
            if (!this.isAdmin) {
                throw new UnAuthorized("you are not admin")
            }
            if (typeof userID != "number") {
                throw new Validation("user ID invalid input")
            }
            for (let index = 0; index < User.allUser.length; index++) {
                if (userID == User.allUser[index].ID) {
                    return [index]
                }
            }
            throw new NotFound("user ID not found")
        } catch (error) {
            throw error
        }

    }

    // findContact(contactID) {
    //     for (let index = 0; index < this.contacts.length; index++) {
    //         if (contactID == this.contacts[index].ID) {
    //             return index 

    //         }
    //     }
    // }

    findContactInfo(contactInfoID) {
        try {
            for (let index = 0; index < this.contactInfo.length; index++) {
                if (contactInfoID == this.contactInfo[index].ID) {
                    return index
                } throw new NotFound("ContactInfo not found")
            }
        } catch (error) {
            throw error
        }
    }

    getAllUsers() {
        try {
            if (!this.isAdmin) {
                throw new UnAuthorized("User is not an Admin")
            } return User.allUser
        } catch (error) {
            return error
        }
    }
    getUserByID(userID) {
        try {
            if (!this.isAdmin) {
                throw new UnAuthorized("User is not an Admin")
            }
            let indexOfUser = this.findUser(userID)
            if (typeof userID != "number") {
                throw new Validation("user input is invalid")
            }
            return User.allUser[indexOfUser]
        } catch (error) {
            return error
        }
    }

    updateUser(userID, parameter, newValue) {
        try {
            if (typeof userID != "number") {
                throw new Validation("Invalid validation(userID) Input")
            }
            if (!this.isAdmin) {
                throw new UnAuthorized("User is not an Admin")
            }
            let [indexOfUser, isUserExist] = this.findUser(userID)
            if (!isUserExist) {
                return "User not found"
            }
            switch (parameter) {
                case "fullName":
                    if (typeof newValue !== "string") {
                        return "Please input valid input for new full name"
                    }
                    User.allUser[indexOfUser].fullName = newValue
                    return User.allUser[indexOfUser]

                case "gender":
                    if (typeof newValue !== "string") {
                        return "Please input valid input for new gender"
                    }
                    User.allUser[indexOfUser].gender = newValue
                    return User.allUser[indexOfUser]
                case "country":
                    if (typeof newValue !== "string") {
                        return "Please input valid input for new country"
                    }
                    User.allUser[indexOfUser].country = newValue
                    return User.allUser[indexOfUser]
                default: return "invalid parameter"
            }
        } catch (error) {

        }
    }

    deleteUser(userID) {
        if (!this.isAdmin) {
            return "UnAuthorized"
        }
        if (typeof userID != "number") {
            return "Invalid UserID input"
        }
        let [indexOfUser, isUserExist] = User.findUser(userID)
        if (isUserExist) {
            return "User not found"
        }
        User.allUser.splice(indexOfUser, 1)
    }

    createContact(contactFullname) {
        if (typeof contactFullname != "string") { return "Invalid contact name" }
        let contactCreated = new Contact(contactFullname)
        this.contacts.push(contactCreated)
        return contactCreated
    }

    getContact() {
        return this.contacts
    }

    getContactByContactID(contactID) {
        for (let index = 0; index < this.contacts.length; index++) {
            if (contactID == this.contacts[index]) {
                return [this.contacts[index].contactObj, true]
            } return "No such Contact found"
        }
    }

    updateContact(contactID, newValue) {
        if (typeof contactID != "number") {
            return "Invalid UserID input"
        }
        let [indexOfContacts, isContactExist] = this.findContact(contactID)
        if (!isContactExist) { return "Contact not found" }
        if (typeof newValue !== "string") {
            return "Please input valid input for new contact full name"
        }
        this.contacts[indexOfContacts].contactFullName = newValue
        return this.contacts[indexOfContacts]
    }


    deleteContact(contactID) {
        if (typeof contactID != "number") { return "Invalid Contact ID input" }
        let [indexOfContacts, isContactExist] = this.findContact(contactID)
        if (!isContactExist) { return "Contact not found" }
        this.contacts.splice(indexOfContacts, 1)
    }

}
let a = User.newAdmin("Nitish Shetty", "M", "India")

let user1 = a.newUser("Messi", "M", "India")
user1.newContact("Moahn Lal");
user1.newContact("suraj");
// user1.createContactInfo(0, "Mobile", 675363748)
// user1.updateContact(0,"Rayyan")
// user1.deleteContact(0)
console.log(a.getUserByID(0))
// console.log(user1);