class InputFields{
    constructor(data){
        this.inputId=data.inputId;
        this.inputType=data.inputType;
        this.inputName=data.inputName;
        this.labelName=data.labelName;
        this.placeholder=data.placeholder;
        this.inputValue=data.inputValue;
    }

    init(){
        return this.toHTML();
    }

    toHTML(){
        let html=this.createInputField();
        return html;
    }

    createInputField(){
        try {
            let inputFieldHTML=``;
            switch(this.inputType){
                case "text":
                    inputFieldHTML+=`
                        <div class="inputBlock">
                            <label>${this.labelName}</label>
                            <input id=${this.inputId} class="inputField" type=${this.inputType} name=${this.inputName} placeholder=${this.placeholder} >
                            <span id="username" class="inputErrorMsg"></span>
                        </div>
                    `
                    break;
                case "password":
                    inputFieldHTML+=`
                        <div class="inputBlock">
                            <label>${this.labelName}</label>
                            <input id=${this.inputId} class="inputField" type=${this.inputType} name=${this.inputName} placeholder=${this.placeholder}>
                            <span id="password" class="inputErrorMsg"></span>
                        </div>
                    `
                    break;
                case "number":
                    inputFieldHTML+=`
                        <div class="inputBlock">
                            <input data-table="customers-list" class="inputField form-control search-input" type=${this.inputType} name=${this.inputName} placeholder=${this.placeholder}>
                        </div>
                    `
                    break;
                case "search":
                    inputFieldHTML+=`
                        <div class="inputBlock">
                            
                            <input id=${this.inputId} class="inputField" type=${this.inputType} name=${this.inputName} placeholder=${this.placeholder}>
                            
                        </div>
                    `
                    break;
                default:
                    console.log("break")
                    break;
            }
            return inputFieldHTML;
        } catch (error) {
            console.error("Expectation at INPUT createInputField ❌ :: ", error);
        }
    }

}