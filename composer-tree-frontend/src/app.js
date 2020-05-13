console.log("hello from app class")

class App {
    constructor() {

    }

    static resetContent() {
        sidebar.innerHTML = ''
        heading.innerText = "Welcome to Composer Note Tree"
    }
}