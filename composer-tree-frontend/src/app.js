console.log("hello from app class")

class App {
    constructor() {

    }

    static init() {
        // sets up all event listeners for user login and signup and logout
        signupButton.addEventListener("click", function(event){
            User.displaySignupForm()
        })
        
        loginButton.addEventListener("click", function(event) {
            User.displayLoginForm()
        })
        
        logoutButton.addEventListener("click", function(event) {
            User.logout()
        })
        
        facebookButton.addEventListener("click", function(event){
            User.loginWithFacebook()
        })
        // login sets up listener for nav links
    }

    static resetContent() {
        sidebar.innerHTML = ''
        heading.innerText = "Welcome to Song Web"
        contentDescription.innerText = 
        "A voice note app for organizing your song ideas and collaborating with friends.";
        contentLinks.innerHTML = ''
        networkContainer.innerHTML = ''
        userName.innerHTML = ''
        nav.classList.remove("open")
        userForm.classList.remove("hide")
        userLinks.classList.remove("hide")
        if (content.querySelector("form")) {
            content.querySelector("form").remove()
        }
    }
}