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
}

document.addEventListener("DOMContentLoaded", function() {
    const content = document.querySelector(".content")
    const topNav = document.querySelector("NAV")
    const heading = document.querySelector('h1')
    indexLink = document.createElement("a")
    indexLink.href = `${BACKEND_URL}/trees`
    indexLink.innerHTML = "View your idea trees"
    topNav.appendChild(indexLink)
    indexLink.addEventListener("click", function(event) {
        event.preventDefault();
        fetch(indexLink.href)
            .then(resp => resp.json())
            .then(function(json) {
                document.querySelector('h1').innerHTML = "Your Idea Trees"
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
            })
    })
     

})