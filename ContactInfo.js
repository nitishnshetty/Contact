class ContactInfo{
    static ID = 0
    constructor(typeOfContact, valueOfContact){
        this.ID = ContactInfo.ID++
        this.typeOfContact = typeOfContact
        this.valueOfContact = valueOfContact
    }

    typeContact(){
        return this.typeOfContact
    }

    valueContact(){
        return this.valueOfContact
    }
}

module.exports = ContactInfo