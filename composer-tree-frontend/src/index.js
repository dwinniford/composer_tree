const BACKEND_URL = 'http://localhost:3000';


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
    constructor(text, urlEnd) {
        this.text = text;
        this.urlEnd = urlEnd;
    }

    display(parent) {
        const link = document.createElement("a")
        link.href = BACKEND_URL + this.urlEnd
        link.innerHTML = this.text 
        parent.appendChild(link)
        return link 
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const content = document.querySelector(".content")
    const topNav = document.querySelector("NAV")
    const heading = document.querySelector('h1')
    const indexLink = new navLink("View your idea trees", "/trees").display(topNav)
    indexLink.addEventListener("click", function(event) {
        event.preventDefault();
        fetch(event.target.href)
            .then(resp => resp.json())
            .then(function(json) {
                Tree.displayIndex(json, heading, content)
            })
    })
     

})