const fetchAllUser=()=>{
    try {
        $.ajax({
			type: 'GET',
			url: 'https://67eb2ee7-c46c-4c69-8f3f-3323af75cc16.mock.pstmn.io/contacts',
			success: function (res) {
				getContact(res);
                let userData= localStorage.getItem("USER");
                userData=JSON.parse(userData);
                let responseDataList = userData.contacts;
                generateTable(responseDataList);
                generatePaginationElement(responseDataList);
                searchInTable(); 
                
			},
		})
        
    } catch (error) {
        console.error("Expectation at fetchAllUser ❌ :: ", error);
    }
}

$(document).ready(function(){
    fetchAllUser()
    
})