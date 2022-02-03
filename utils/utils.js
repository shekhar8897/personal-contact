/**
 * @Function isElement
 * @param {*} obj 
 * @returns boolean
 */

const isElement=(obj) =>{
    try {
        //Using W3 DOM2 (works for FF, Opera and Chrome)
        return obj instanceof HTMLElement;
    }
    catch (e) {
        //Browsers not supporting W3 DOM2 don't have HTMLElement and
        //an exception is thrown and we end up here. Testing some
        //properties that all elements have (works on IE7)
        return (typeof obj === "object") &&
            (obj.nodeType === 1) && (typeof obj.style === "object") &&
            (typeof obj.ownerDocument === "object");
    }
}

/**
 * @Function isJson
 * @param {*} value 
 * @returns boolean
 */
const isJson=(value)=>{
    try {
        if(typeof value  === "object")JSON.parse(JSON.stringify(value))
        else JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}


/**
 * @Function _isNull
 * @param {*} object 
 * @returns boolean
 */
const _isNull=(object)=> undefined != object && null != object

/**
 * @function validateInputField
 * 
 */
function validateInputField(){
    try {
        let errorList=checkError()
        appendErrorToDOM(errorList)
        let count=0;
        for(let i=0;i<errorList.length;i++){
            if(errorList[i][Object.keys(errorList[i])]===undefined){
                count++;
            }
        }
        if(count===2){
            return {
                "username":$('#personal_contact_username').val(),
                "password":$('#personal_contact_password').val()
            }
        }
        
    } catch (error) {
        console.error("Expectation at validateInputField ❌ :: ", error);
    }    
}


/**
 * @function appendErrorToDOM
 * @param {*} errorList 
 */
function appendErrorToDOM(errorList){
    try {
        for(let i=0;i<errorList.length;i++){
            let keys=Object.keys(errorList[i]);
            let value=errorList[i][keys]
            switch(keys[0]){
                case "username":
                    {
                        if(value!==undefined)
                            document.getElementById(keys).innerHTML=" * "+value
                        else
                            document.getElementById(keys).innerHTML=""
                        break;
                    }
                case "password":
                    {
                        if(value!==undefined)
                            document.getElementById(keys).innerHTML=" * "+value
                        else
                            document.getElementById(keys).innerHTML="" 
                        break;
                    }
                default:
                        break;
            }
            
        }
    } catch (error) {
        console.error("Expectation at appendErrorToDOM ❌ :: ", error);
    }
}


/**
 * @Function checkError
 * @param noparam
 * @return array 
 */
function checkError(){
    try {
        let inputFieldList=document.querySelectorAll(".inputField");
        let errorList=[];
        for(let i=0;i<inputFieldList.length;i++){
            let inputFieldType=inputFieldList[i].type;
            let inputFieldValue=inputFieldList[i].value;
            let tempError={}
            
            switch(inputFieldType){
                case "text":
                    {
                        let a=ValidateInput.required(inputFieldValue);
                        let b=ValidateInput.username(inputFieldValue);
                        if(a.errorMsg)
                            tempError["username"]=a.errorMsg;
                        else
                            tempError["username"]=b.errorMsg;
                        errorList.push(tempError)
                        break;
                    }
                case "password":
                    {
                        let a=ValidateInput.required(inputFieldValue);
                        let b=ValidateInput.password(inputFieldValue);
                        if(a.errorMsg)
                            tempError["password"]=a.errorMsg;
                        else
                            tempError["password"]=b.errorMsg;
                        errorList.push(tempError)
                        break;
                    }
                default:
                    break;
            }
        }
        return errorList
    } catch (error) {
        console.error("Expectation at checkError ❌ :: ", error);
    }
}

/**
 * @function Logout
 * @return Logout the user and session
 */
function logout(){
    try {
        localStorage.removeItem("USER");
        window.location.replace('/login.html')
    } catch (error) {
        console.error("Expectation at logout ❌ :: ", error);
    }
}


/**
 * @function getContact
 * @params response
 * @return User object
 */
function getContact(res){
    try {
        let userData=localStorage.getItem("USER")
                let item=JSON.parse(userData)
                let parsedResponse=JSON.parse(res)
                let userContactList=[]
                let user=new UserModel({
                    "userId":item.userId,
                    "firstName":item.firstName,
                    "lastName":item.lastName,
                    "userName":item.userName,
                    "email":item.email,
                    "status":item.status,
                    "mobile":item.mobile,
                    "role":item.role,
                    "isLoggedIn":AccountLoggedStatus.login,
                    "contacts":null
                })
                for(let i=0;i<parsedResponse.data.length;i++){
                    let temp=parsedResponse.data[i];
                    if(user.userName===temp.userName){
                        temp.contacts.map((item)=>{
                            let userContact=new ContactModel({
                                "contactId":item.id,
                                "contactFirstName":item.fName,
                                "contactLastName":item.lName,
                                "contactMobile":item.mobile,
                                "contactEmail":item.email,
                                "contactCity":item.city
                            })
                            userContactList.push(userContact);
                        })
                        user.contacts=userContactList
                        
                        break;
                    }
                }
                localStorage.removeItem("USER");
                localStorage.setItem("USER",JSON.stringify(user))
    } catch (error) {
        console.error("Expectation at getContact ❌ :: ", error);
    }
}


