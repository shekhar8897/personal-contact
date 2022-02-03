class UserModel{
    constructor(data){
        this.userId=data.userId;
        this.firstName=data.firstName;
        this.lastName=data.lastName;
        this.userName=data.userName;
        this.email=data.email;
        this.status=data.status;
        this.mobile=data.mobile;
        this.role=data.role;
        this.contacts=data.contacts;
        this.isLoggedIn=data.isLoggedIn;
    }

    toJson(){
        try {
            return{
                "userId":this.userId,
                "firstName":this.firstName,
                "lastName": this.lastName,
                "userName":this.userName,
                "email":this.email,
                "status":this.status,
                "mobile":this.mobile,
                "role":this.role,
                "contacts":this.contacts,
                "isLoggedIn":this.isLoggedIn
            }
        } catch (error) {
            console.error("Expectation at UserModel.toJson ❌ :: ", error);
        }
    }
}