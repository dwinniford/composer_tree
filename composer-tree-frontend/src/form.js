class Form { 
    constructor(fieldsArray, urlEnd, method, classObject) {
        this.fieldsArray = fieldsArray;
        this.urlEnd = urlEnd;
        this.method = method;
        this.classObject = classObject
    }

    render() {
        // try with note edit form.  just return the html
        // have something like below but put it in separate method in note class
        // heading.innerHTML = this.classObject.newFormTitle()
        // content.innerHTML = ''
        const form = document.createElement("FORM")
        form.action = BACKEND_URL + this.urlEnd
        this.fieldsArray.forEach(function(element) {
            const input = document.createElement("INPUT")
            input.setAttribute("type", element[1])
            input.id = element[0]
            input.setAttribute("name", element[0])
            const label = document.createElement("LABEL")
            label.innerHTML = element[0]
            label.for = element[0]
            // if (classInstance) {
            //     input.value = classInstance[element[0]]
            // }
            form.appendChild(label)
            form.appendChild(input)
            const br = document.createElement("br")
            form.appendChild(br)
        })
        const submit = document.createElement("button")
        submit.innerHTML = "Submit"
        submit.setAttribute("type", "submit")
        form.appendChild(submit)
        return form 
    }

    display(classInstance = false) {
        const formClassObject = this.classObject
        heading.innerHTML = this.classObject.newFormTitle()
        contentLinks.innerHTML = ''
        networkContainer.innerHTML = ''
        contentDescription.innerHTML = ''
        const form = document.createElement("FORM")
        form.action = BACKEND_URL + this.urlEnd
        const formMethod = this.method
        
        form.classList.add("tree")
        
        this.fieldsArray.forEach(function(element) {
            const input = document.createElement("INPUT")
            input.setAttribute("type", element[1])
            input.id = element[0]
            const label = document.createElement("LABEL")
            label.innerHTML = element[0]
            label.for = element[0]
            if (classInstance) {
                input.value = classInstance[element[0]]
            }
            form.appendChild(label)
            form.appendChild(input)
            const br = document.createElement("br")
            form.appendChild(br)
        })
        const submit = document.createElement("button")
        submit.innerHTML = "Submit"
        submit.setAttribute("type", "submit")
        form.appendChild(submit)
        if (content.querySelector('form')) {
            content.querySelector('form').remove()
        }
        content.appendChild(form)
        form.addEventListener("submit", function(event) {
            event.preventDefault()
            const titleInput = document.querySelector("input#title").value 
            const descriptionInput = document.querySelector("input#description").value
            // abstract out these two.  iterate through array query for input and push value into array. spread array into data 
            const data = formClassObject.formData(titleInput, descriptionInput)
            const configObject = {
                credentials: 'include',
                // cannot get method directly from form because html form only accepts get and post
                method: formMethod,
                // mode: "no-cors",
                headers: {
                    'X-CSRF-Token': getCSRFToken(),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
                
            }
            
            fetch(event.target.action, configObject)
                .then(resp => resp.json())
                .then(function(json) {
                    console.log(json)
                    const newInstance = new formClassObject(json)
                    newInstance.displayShow()
                    // tree form needs to append to the sidebar or update the sidebar
                }).catch(function(errors) {
                    console.log(errors)
                })
        })
    }
}