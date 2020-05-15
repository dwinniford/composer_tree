class DisplayLink {
    // for links that only render html and don't need to talk to the backend
    // make sure callback is passed in with bind when execution context matters
    constructor(text, callback) {
        this.text = text;
        this.callback = callback;
    }
    display(parent) {
        const button = document.createElement("button")
        button.classList.add("blue-button")
        button.innerHTML = this.text 
        parent.appendChild(button)
        const buttonCallback = this.callback
        button.addEventListener("click", function(event) {
            buttonCallback()
        }) 
        return button 
    }
}