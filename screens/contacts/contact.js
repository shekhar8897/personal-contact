class Contact{
    constructor(config){
        this.id=config.id;
        this.title=config.title;
        this.contactData=config.contactData;
        this.element=!_isNull(config.element) && isElement(config.element)?
                    config.element:document.querySelector(config.element);
    }

    init(){
        let getData=localStorage.getItem("USER");
        this.userData=JSON.parse(getData);
        this.element.innerHTML=this.toHTML();
    }

    toHTML(){
        let html='';
        
        html+=`
        <div id="table-container">
            <div class="filter_table" style="display:flex;align-items:center">
                <input
                    type="search"
                    placeholder="Search..."
                    class="inputField search-input"
                    data-table="customers-list"
                    />
                </h3>
            </div>
            <table id="table" class="card table table-striped mt32 customers-list">
                <thead>
                <tr>
                    <th>First name</th>
                    <th>last name</th>
                    <th>mobile</th>
                    <th>email</th>
                    <th>city</th>
                    ${this.userData?.role===AccountRole.admin?`<th>EDIT/DELETE</th>`:""}
                </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
            <div class="btn-group">
                <button id="prev">Prev</button>
                <select id="selectValue">
                <option value="5" selected>5</option>
                </select>
                <button id="next">Next</button>
            </div>
            </div>
        `
        return html;
    }
}
$(document).ready(function(){
    let contact=new Contact({
        "id":"contact_manager_table_key",
        "title":"Contact Manager Data",
        "contactData":'',
        "element":".contact_manager_data",
        
    });
    contact.init();

})
