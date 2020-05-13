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
            userForm.innerHTML = ''
        })
    }

    static displayLoginForm() {
        const form = new Form(User.fieldsArray(), "/sessions", "POST", User)
        // does my form class work with sessions controller. why do i pass the User object?
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

    static logout () {
        console.log("logged out")
        // after fetch to sessions destroy
        nav.classList.remove("open")
        userForm.classList.remove("hide")
        userLinks.classList.remove("hide")
        // remove other content - sidebar, note content, link 
        App.resetContent()
        // display home content

    }

    static fieldsArray() {
        return [["Name", "text"], ["email", "text"], ["password", "password"]]
    }
}