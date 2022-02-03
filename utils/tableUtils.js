/**
 * @Function generateTable
 * @param {*} responseDataList 
 * @param {*} range 
 * @Purpose create a table
*/
const generateTable = (responseDataList, range = 5) => {
        try {
            let getData=localStorage.getItem("USER");
            getData=JSON.parse(getData)
            let jsonArray = [];
            for (let i = 0; i < range; i++) {
            jsonArray = Object.values(responseDataList[i]);
            let tr = document.createElement("tr");
            for (let j = 1; j < jsonArray.length; j++) {
                let td = document.createElement("td");
                td.className="data"
                let cellText = document.createTextNode(jsonArray[j]);
                td.appendChild(cellText);
                tr.appendChild(td);
                document.querySelector("tbody").appendChild(tr);
                
                /**Testing whether the user is admin or not */
                if(getData?.role===AccountRole.admin)
                    createButtonGroup(tr,j,jsonArray)
            }
            
            }
        } catch (error) {
            console.error("Expectation at generateTable ❌ :: ", error);
        }
};

/**
 * @Function createButtonGroup of EDIT/ DELETE/ SAVE
 * @params index,datalength
 */
const createButtonGroup=(tr,j,jsonArray)=>{
    try {
         /** Creating button Group */
        let buttonTD = document.createElement("td");
        buttonTD.className="buttonTD"
        let saveButton=document.createElement("button");
        saveButton.className="save"
        saveButton.appendChild(document.createTextNode("SAVE"))
        let editButton=document.createElement("button");
        editButton.className="edit"
        editButton.appendChild(document.createTextNode("EDIT"))
        let deleteButton=document.createElement("button");
        deleteButton.className="delete"
        deleteButton.appendChild(document.createTextNode("DELETE"))
        buttonTD.appendChild(saveButton)
        buttonTD.appendChild(editButton)
        buttonTD.appendChild(deleteButton)
        if(j===jsonArray.length-1){
            tr.appendChild(buttonTD)
        }
    } catch (error) {
        console.error("Expectation at createButtonGroup ❌ :: ", error);
    }
}
    
/**
     * @Function removePrevChild
     * @Purpose remove the prev child from DOM
*/

const removePrevChild = () => {
        try {
            let tbody = document.querySelector("tbody");
            let child = tbody.lastElementChild;
            while (child) {
            tbody.removeChild(child);
            child = tbody.lastElementChild;
            }
            
        } catch (error) {
            console.error("Expectation at removePrevChild ❌ :: ", error);
        }
    };
    
/**
     * @Function toggle next prev on click
     * @param {*} responseDataList 
     * @param {*} startIndex 
     * @param {*} endIndex 
*/
const toggleNextPrev = (responseDataList, startIndex, endIndex) => {
        try {
            let jsonArray = [];
            for (let i = startIndex; i < endIndex; i++) {
            jsonArray = Object.values(responseDataList[i]);
            let tr = document.createElement("tr");
            for (let j = 1; j < jsonArray.length; j++) {
                let td = document.createElement("td");
                let cellText = document.createTextNode(jsonArray[j]);
                td.appendChild(cellText);
                tr.appendChild(td);
                document.querySelector("tbody").appendChild(tr);
            }
            }
        } catch (error) {
            console.error("Expectation at toggleNextPrev ❌ :: ", error);
        }
    };
    
/**
     * @Function generatePaginationElement
     * @param {*} responseDataList 
*/
const generatePaginationElement = (responseDataList) => {
        try {
            let count = 0;
            let prevBtn = $("#prev");
            let nextBtn =$("#next");
            let selectedValue = $("#selectValue");
            
            $(selectedValue).change(function(){
                count = 0;
                removePrevChild();
                toggleNextPrev(responseDataList, 0, selectedValue.value);
            })
            
            $(nextBtn).click(function(){
                count++;
                if (count <= responseDataList.length / selectedValue.value - 1) {
                    removePrevChild();
                    toggleNextPrev(
                    responseDataList,
                    count * parseInt(selectedValue.value),
                    count * parseInt(selectedValue.value) + parseInt(selectedValue.value)
                    );
                } else {
                    count = responseDataList.length / selectedValue.value-1;
                }
            })
            $(prevBtn).click(function(){
                count--;
                if (count >= 0) {
                    removePrevChild();
                    toggleNextPrev(
                    responseDataList,
                    count * parseInt(selectedValue.value),
                    count * parseInt(selectedValue.value) + parseInt(selectedValue.value)
                    );
                } else {
                    count = 0;
                }
            })
        } catch (error) {
            console.error("Expectation at generatePaginationElement ❌ :: ", error);
        }
    };
    
    /**
     * @function searchInTable
     * @purpose  search in contact table
     */
const searchInTable=()=>{
        try {
            
            let TableFilter = (function (myArray) {
            let search_input;
    
            function _onInputSearch(e) {
                search_input = e.target;
                let tables = $('.'+
                    $(search_input).attr("data-table")
                );
                
                myArray.forEach.call(tables, function (table) {
                myArray.forEach.call(table.tBodies, function (tbody) {
                    myArray.forEach.call(tbody.rows, function (row) {
                    let text_content = row.textContent.toLowerCase();
                    let search_val = search_input.value.toLowerCase();
                    row.style.display =
                        text_content.indexOf(search_val) > -1 ? "" : "none";
                    });
                });
                });
            }
        
            return {
                init: function () {
                var inputs = $(".search-input");
                myArray.forEach.call(inputs, function (input) {
                    input.oninput = _onInputSearch;
                });
                }
            };
            })(Array.prototype);
            TableFilter.init();
        } catch (error) {
            console.error("Expectation at searchInTable ❌ :: ", error);
        }
}

/**
 * onclicking on edit button
 */
$(document).on("click", ".edit", function () {
    $(this)
        .parent()
        .siblings("td.data")
        .each(function () {
            let content = $(this).html();
            $(this).html('<input value="' + content + '" />');
        });
        $(this).siblings(".save").show();
        $(this).siblings(".delete").hide();
        $(this).hide();
});
/**
 * onclicking on save button1
 */
$(document).on("click", ".save", function () {
        $("input").each(function () {
        let content = $(this).val();
            $(this).html(content);
            $(this).contents().unwrap();
        });
        $(this).siblings(".edit").show();
        $(this).siblings(".delete").show();
        $(this).hide();
});

/**
 * onclicking on delete button
 */
$(document).on("click", ".delete", function () {
        $(this).parents("tr").remove();
});