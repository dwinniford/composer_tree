console.log("hello from app class")

class App {
    constructor() {

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