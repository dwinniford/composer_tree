class User {
    constructor(json) {

    }

    static displaySignupForm() {
        const form = new Form(User.fieldsArray(), "/users", "POST", User)
        const formElement = form.render()
        // formElement.setAttribute("name", "create-child-note-form")
        userForm.innerHTML = ''
        userForm.appendChild(formElement)
        // add form listener
        formElement.addEventListener("submit", function(event) {
            event.preventDefault();
            console.log(event.currentTarget.action)
            // after fetch display nav and remove form and user buttons
            nav.classList.add("open")
            userForm.classList.add("hide")
            userLinks.classList.add("hide")
        })
    }

    static fieldsArray() {
        return [["Name", "text"], ["email", "text"]]
    }
}