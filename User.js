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

    // Admin========================================================================================
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
    //User========================================================================================
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
            let indexOfUser = this.findUser(userID)
            switch (parameter) {
                case "fullName":
                    if (typeof newValue !== "string") {
                        throw new Validation("full name input is invalid")
                    }
                    User.allUser[indexOfUser].fullName = newValue
                    return User.allUser[indexOfUser]

                case "gender":
                    if (typeof newValue !== "string") {
                        throw new Validation("gender input is invalid")
                    }
                    User.allUser[indexOfUser].gender = newValue
                    return User.allUser[indexOfUser]
                case "country":
                    if (typeof newValue !== "string") {
                        throw new Validation("country input is invalid")

                    }
                    User.allUser[indexOfUser].country = newValue
                    return User.allUser[indexOfUser]
                default: throw new Validation("invalid parameter input")
            }
        } catch (error) {
            return error
        }
    }

    deleteUser(userID) {
        try {
            if (!this.isAdmin) {
                throw new UnAuthorized("User is not an admin")
            }
            if (typeof userID != "number") {
                throw new Validation("Invalid validation(userID) Input")
            }
            let indexOfUser = User.findUser(userID)
            User.allUser.splice(indexOfUser, 1)
        } catch (error) {
            return error
        }
    }
    //Contact========================================================================================
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

    findContact(contactID) {
        try {
            for (let index = 0; index < this.contacts.length; index++) {
                if (contactID === this.contacts[index].ID) {
                    return index

                }
            } throw new NotFound("No Contact found from ContactID")
        } catch (error) {

        }
    }

    createContact(contactFullname) {
        try {
            if (typeof contactFullname != "string") { throw new Validation("Contact full name has invalid input") }
            let contactCreated = new Contact(contactFullname)
            this.contacts.push(contactCreated)
            return contactCreated
        } catch (error) {
            return error
        }
    }

    getAllContact() {
        return this.contacts
    }

    getContactByContactID(contactID) {
        try {
            if (typeof contactID != "number") { throw new Validation("contactID has invalid input") }
            let indexOfContacts = this.findContact(contactID)
            return this.contacts[indexOfContacts]
        } catch (error) {
            return error
        }
    }

    updateContact(contactID, newValue) {
        try {
            if (typeof contactID != "number") {
                throw new Validation("contactID has invalid input")
            }
            let indexOfContacts = this.findContact(contactID)
            if (typeof newValue !== "string") {
                throw new Validation("newValue has invalid input")
            }
            this.contacts[indexOfContacts].contactFullName = newValue
            return this.contacts[indexOfContacts]
        } catch (error) {
            return error
        }
    }

    deleteContact(contactID) {
        try {
            if (typeof contactID != "number") { throw new Validation("ContactID has invalid input") }
            let indexOfContacts = this.findContact(contactID)
            this.contacts.splice(indexOfContacts, 1)
        } catch (error) {
            return error
        }
    }
    //ContactInfo========================================================================================

    newContactInfo(contactID, typeOfContact, valueOfContact) {
        try {
            if (typeof contactID != "number") {
                throw new Validation("ContactID input is wrong")

            }
            if (typeof typeOfContact != "string") {
                throw new Validation("typeOfContact input is wrong")
            }
            let indexOfContacts = this.findContact(contactID)
            if (indexOfContacts === -1) {
                throw new NotFound("Contact not found");
            }
            this.contacts[indexOfContacts].newContactInfo(typeOfContact, valueOfContact)
            // console.log(this.contactInfo)
            return this.contacts[indexOfContacts]
        } catch (error) {
            return error
        }
    }

    // findContactInfo(contactInfoID) {
    //     try {
    //         for (let index = 0; index < this.contactInfo.length; index++) {
    //             if (contactInfoID == this.contactInfo[index].ID) {
    //                 return index
    //             } throw new NotFound("ContactInfo not found")
    //         }
    //     } catch (error) {
    //         throw error
    //     }
    // }

    getAllContactInfo() {
        let allContactInfo = [];
        for (const contact of this.contacts) {
            allContactInfo = allContactInfo.concat(contact.getAllContactInfo());
        }
        return allContactInfo;
    }

    getContactInfoByID(contactID, contactInfoID) {
        try {
            if (typeof contactInfoID != "number") { throw new Validation("contactInfoID has invalid input") }
            let indexOfContacts = this.findContact(contactID)
            if (indexOfContacts === -1 || indexOfContacts >= this.contacts.length) {
                throw new NotFound("Contact not found");
            }
            return this.contacts[indexOfContacts].getContactInfoByID(contactInfoID)

        } catch (error) {
            return error
        }
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
                    if (typeof newValue !== "string") { throw new Validation("Value of contact input is invalid") }
                    Contact.contactInfo[indexOfContactInfo].valueOfContact = newValue
                    return Contact.contactInfo[indexOfContactInfo]
                default: throw new NotFound("No parameter found")
            }
        } catch (error) {
            return error
        }
    }

    deleteContactInfo(contactInfoID) {
        try {
            if (typeof contactInfoID !== "number") {
                throw new Validation("ContactInfoID input is invalid");
            }

            for (const contact of this.contacts) {
                if (contact.deleteContactInfo(contactInfoID)) {
                    return true;
                }
            }

            throw new NotFound("ContactInfo not found");
        } catch (error) {
            return error;
        }
    }




}


let a = User.newAdmin("Nitish Shetty", "M", "India")

let user1 = a.newUser("Messi", "M", "India")
let user2 = a.newUser("Kratos", "M", "India")

user1.newContact("Moahn Lal");
user1.newContact("suraj");
user1.newContact("Nitish")

user2.newContact(" Lal");
user2.newContact("raj");
user2.newContact("Nits")
user1.newContactInfo(2, "Mobile", 675363748)
user1.newContactInfo(2, "Mobile", 67563748)
user1.newContactInfo(2, "Mobile", 3748)

user2.newContactInfo(4, "Mile", 675363748)
user2.newContactInfo(4, "Mobe", 67563748)
user2.newContactInfo(4, "le", 3748)
// user1.updateContact(0,"Rayyan")
// user1.deleteContact(0)
// console.log(a.getUserByID(0))
// console.log(user1.getContact());
console.log(user2.getContactInfoByID(0,0))
// console.log(user1.deleteContact(1));
// user1.deleteContactInfo(2)
// user2.updateContactInfo(4,"KKKKKK",474833)
// console.log(user2.getAllContactInfo())

// console.log(user2);