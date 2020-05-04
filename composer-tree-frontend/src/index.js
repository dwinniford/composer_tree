const BACKEND_URL = 'http://localhost:3000';
const content = document.querySelector(".content")
const topNav = document.querySelector("NAV")
const heading = document.querySelector('h1')


class Tree  {
    constructor(json) {
        this.title = json.title;
        this.description = json.description 
    }
    displayShow(heading, content) {
        heading.innerHTML = this.title
        content.removeChild(content.childNodes[0])
        const description = document.createElement("p")
        description.innerHTML = this.description
        content.appendChild(description)
    }
    static displayIndex(json, heading, content) {
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
                        tree.displayShow(heading, content)
                    })
            })

        });
        content.removeChild(content.childNodes[0])
        content.appendChild(list)
    }
}

class navLink {
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
                    navLinkInstance.callback(json, document.querySelector('h1'), document.querySelector(".content"))
                })
        }) 
        // adding bind here does not work.  cannot add bind to undefined. link is still the exectution context
        return link 
    }
}
const indexLink = new navLink("View your idea trees", "/trees", Tree.displayIndex).display(topNav)


document.addEventListener("DOMContentLoaded", function() {
    // const content = document.querySelector(".content")
    // const topNav = document.querySelector("NAV")
    // const heading = document.querySelector('h1')
    // const indexLink = new navLink("View your idea trees", "/trees", Tree.displayIndex).display(topNav)
     

})