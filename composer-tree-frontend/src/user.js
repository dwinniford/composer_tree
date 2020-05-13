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
        })
    }

    static fieldsArray() {
        return [["Name", "text"], ["email", "text"]]
    }
}