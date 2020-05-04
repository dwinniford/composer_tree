const BACKEND_URL = 'http://localhost:3000';
const content = document.querySelector(".content")
const topNav = document.querySelector("NAV")
const heading = document.querySelector('h1')


class Tree  {
    constructor(json) {
        this.title = json.title;
        this.description = json.description 
    }
    displayShow() {
        heading.innerHTML = this.title
        content.removeChild(content.childNodes[0])
        const description = document.createElement("p")
        description.innerHTML = this.description
        content.appendChild(description)
    }
    static displayIndex(json) {
        heading.innerHTML = "Your Idea Trees"
        const list = document.createElement('ul')
        json.forEach(element => {
            const item = document.createElement('li')
            item.innerHTML = element.title
            item.setAttribute("data-id", element.id )
            list.appendChild(item)
            item.addEventListener("click", function(event) {
                fetch(`${BACKEND_URL}/trees/${parseInt(event.target.getAttribute("data-id"))}`)
                    .then(resp => resp.json())
                    .then(function(json) {
                        const tree = new Tree(json)
                        tree.displayShow()
                    })
            })

        });
        content.removeChild(content.childNodes[0])
        content.appendChild(list)
    }
}

class NavLink {
    constructor(text, urlEnd, callback) {
        this.text = text;
        this.urlEnd = urlEnd;
        this.callback = callback;
    }

    display(parent) {
        const link = document.createElement("a")
        link.href = BACKEND_URL + this.urlEnd
        link.innerHTML = this.text 
        parent.appendChild(link)
        const navLinkInstance = this 
        // this is still in scope
        // one solution is to create a variable for the navLink instance.  Another is to bind the execution context.
        link.addEventListener("click", function(event) {
            // this now refers to link(the html element) because it is the object to the left of the function
            event.preventDefault();
            fetch(event.target.href)
                .then(resp => resp.json())
                .then(function(json) {
                    // lost this context.  how can i pass the callback attribute to this area
                    navLinkInstance.callback(json)
                })
        }) 
        // adding bind here does not work.  cannot add bind to undefined. link is still the exectution context
        return link 
    }
}

class DisplayLink {
    // for links that only render html and don't need to talk to the backend
    // make sure callback is passed in with bind when execution context matters
    constructor(text, callback) {
        this.text = text;
        this.callback = callback;
    }
    display(parent) {
        const link = document.createElement("a")
        link.innerHTML = this.text 
        parent.appendChild(link)
        const linkCallback = this.callback
        link.addEventListener("click", function(event) {
            linkCallback()
        }) 
        return link 
    }
}

class Form { 
    constructor(fieldsArray, urlEnd, method, title) {
        this.fieldsArray = fieldsArray;
        this.urlEnd = urlEnd;
        this.method = method;
        this.title = title;
    }

    display() {
        
        heading.innerHTML = this.title
        content.removeChild(content.childNodes[0])
        const form = document.createElement("FORM")
        form.action = BACKEND_URL + this.urlEnd
        form.method = this.method
        
        this.fieldsArray.forEach(function(element) {
            const input = document.createElement("INPUT")
            input.setAttribute("type", "text")
            input.id = element[0]
            const label = document.createElement("LABEL")
            label.innerHTML = element[0]
            label.for = element[0]
            form.appendChild(label)
            form.appendChild(input)
        })
        const submit = document.createElement("button")
        submit.innerHTML = "Submit"
        submit.setAttribute("type", "submit")
        form.appendChild(submit)
        content.appendChild(form)
        form.addEventListener("submit", function(event) {
            event.preventDefault()
            const titleInput = document.querySelector("input#title")
            const descriptionInput = document.querySelector("input#description")
            const configObject = {
                method: event.target.method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({tree: {`${titleInput.id}`: titleInput.value, `${descriptionInput.id}`: descriptionInput.value}})
                
            }
            fetch(event.target.action, configObject)
                .then(resp => resp.json())
                .then(function(json) {
                    const newTree = new Tree(json)
                    newTree.displayShow()
                })
        })
    }
}

const indexLink = new NavLink("View your idea trees", "/trees", Tree.displayIndex).display(topNav)
const treeForm = new Form([["title", "text"], ["description", "text"]], "/trees", "POST", "Create a New Idea Tree")
const newLink = new DisplayLink("Add an Idea Tree", treeForm.display.bind(treeForm)).display(topNav)



document.addEventListener("DOMContentLoaded", function() {
    // const content = document.querySelector(".content")
    // const topNav = document.querySelector("NAV")
    // const heading = document.querySelector('h1')
    // const indexLink = new navLink("View your idea trees", "/trees", Tree.displayIndex).display(topNav)
     

})