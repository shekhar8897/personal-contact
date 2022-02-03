const loginAPI=function(inputData){
    try {
        $.ajax({
			type: 'GET',
			url: 'https://67eb2ee7-c46c-4c69-8f3f-3323af75cc16.mock.pstmn.io/login',
			contentType:"application/json; charset=utf-8",
            success: function (res) {
                validateUser(JSON.parse(res),inputData)
			},
		})
    } catch (error) {
        console.error("Expectation at loginAPI ❌ :: ", error);
    }
}

const validateUser=function(loginData,inputData){
    try {
        let flag=true;
        for(let i=0;i<loginData.length;i++){
            let item=loginData[i];
            if(item.userName===inputData.username && item.password===inputData.password){
                if(item.status!==AccountStatus.disabled){
                    let user=new UserModel({
                        "userId":item.id,
                        "firstName":item.fName,
                        "lastName":item.lName,
                        "userName":item.userName,
                        "email":item.email,
                        "status":item.status,
                        "mobile":item.mobile,
                        "role":item.role,
                        "isLoggedIn":AccountLoggedStatus.login,
                        "contacts":null
                    })
                    localStorage.setItem('USER', JSON.stringify(user))
                    flag=false;
                    window.location.replace('/index.html')
                    break;
                }
            }else
                flag=true
        }
        if(flag){
            //TODO:- 
            alert("User not found")
        }
    } catch (error) {
        console.error("Expectation at validateUser ❌ :: ", error);
    }
}