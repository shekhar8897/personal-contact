class ContactModel{
    constructor(data){
        this.contactId=data.contactId;
        this.contactFirstName=data.contactFirstName;
        this.contactLastName=data.contactLastName;
        this.contactMobile=data.contactMobile;
        this.contactEmail=data.contactEmail;
        this.contactCity=data.contactCity;
    }

    toJson(){
        try {
            return{
                "contactId":this.contactId,
                "contactFirstName":this.contactFirstName,
                "contactLastName":this.contactLastName,
                "contactMobile":this.contactMobile,
                "contactEmail":this.contactEmail,
                "contactCity":this.contactCity
            }
        } catch (error) {
            console.error("Expectation at ContactModel.toJson ❌ :: ", error);
        }
    }
}