class NavbarModel{
    constructor(data){
        this.navbarId=data.navbarId;
        this.navbarTitle=data.navbarTitle;
        this.navigateTo=data.navigateTo;
        this.authGuard=data.authGuard;
        this.isActive=data.isActive;
    }
}

/**
 * @function getNavbarData
 * @arguments none
 * @returns list of navbarItem
 */

const getNavbarData=()=>{
    try {
        let getAuthData=localStorage.getItem("USER");
        let parsedAuthData=JSON.parse(getAuthData);
        if(_isNull(parsedAuthData)){
            return [
                new NavbarModel({
                    navbarId:"navbar_element_one",
                    navbarTitle:"Home",
                    navigateTo:"/index.html",
                    authGuard:false,
                    isActive:true
                }),
                new NavbarModel({
                    navbarId:"navbar_element_two",
                    navbarTitle:"Contact",
                    navigateTo:"/contact.html",
                    authGuard:true,
                    isActive:false
                }),
            ];
        }else{
            return [
                new NavbarModel({
                    navbarId:"navbar_element_one",
                    navbarTitle:"Home",
                    navigateTo:"/index.html",
                    authGuard:false,
                    isActive:true
                }),
                new NavbarModel({
                    navbarId:"navbar_element_three",
                    navbarTitle:"Login",
                    navigateTo:"/login.html",
                    authGuard:false,
                    isActive:false
                })
            ];
        }
        
    } catch (error) {
        console.error("Expectation at getNavbarData ❌ :: ", error);
    }
}