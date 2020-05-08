class DisplayLink {
    // for links that only render html and don't need to talk to the backend
    // make sure callback is passed in with bind when execution context matters
    constructor(text, callback) {
        this.text = text;
        this.callback = callback;
    }
    display(parent) {
        const link = document.createElement("a")
        link.classList.add("blue-button")
        link.innerHTML = this.text 
        parent.appendChild(link)
        const linkCallback = this.callback
        link.addEventListener("click", function(event) {
            linkCallback()
        }) 
        return link 
    }
}