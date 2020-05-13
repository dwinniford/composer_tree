console.log("hello from app class")

class App {
    constructor() {

    }

    static resetContent() {
        sidebar.innerHTML = ''
        heading.innerText = "Welcome to Composer Note Tree"
        contentDescription.innerText = 
        "A voice note app for organizing your song ideas and collaborating with friends.";
        contentLinks.innerHTML = ''
        networkContainer.innerHTML = ''
        if (content.querySelector("form")) {
            content.querySelector("form").remove()
        }
    }
}