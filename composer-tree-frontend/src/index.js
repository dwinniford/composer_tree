console.log("testing...")
const BACKEND_URL = 'http://localhost:3000';
fetch(`${BACKEND_URL}/trees`)
    .then(response => response.json())
    .then(json => console.log(json))

document.addEventListener("DOMContentLoaded", function() {

    const topNav = document.querySelector("NAV")
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
                                console.log(json)
                            })
                    })

                });
                document.querySelector("main").appendChild(list)
            })
    })
     

})