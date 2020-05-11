class Tree  {
    constructor(json) {
        this.title = json.title;
        this.description = json.description;
        this.id = json.id; 
        this.notes = json.notes;
    }

    static clearContent() {
        heading.innerHTML = ''
        contentDescription.innerHTML = ''
        contentLinks.innerHTML = ''
        networkContainer.innerHTML = ''
    }
    displayShow() {
        Tree.clearContent()
        heading.innerHTML = this.title
        contentDescription.innerHTML = this.description
        contentLinks.innerHTML = ''
        if (content.querySelector('form')) {
            content.querySelector('form').remove()
        }
        const treeInstance = this 
        const editTreeLink = new DisplayLink("edit", function(){
            const treeForm = new Form(Tree.fieldsArray(), "/trees/"+treeInstance.id, "PATCH", Tree)
            treeForm.display(treeInstance)
        })
        editTreeLink.display(contentLinks)
        
        const deleteLink = document.createElement("a")
        deleteLink.href = BACKEND_URL + "/trees/"+treeInstance.id
        deleteLink.innerHTML = "delete" 
        deleteLink.classList.add("blue-button")
        contentLinks.appendChild(deleteLink)
        deleteLink.addEventListener("click", function(event) {
            event.preventDefault();
            const r = confirm("Delete Tree and all notes?")
            if (r) {
                fetch(event.target.href, {method: "DELETE"})
                .then(function(response){
                    console.log(response.ok)
                    if (response.ok) {
                        Tree.clearContent()
                        fetch(BACKEND_URL+"/trees")
                        .then(resp => resp.json())
                        .then(function(json) {
                            Tree.displayIndex(json)
                        })
                    }
                })
            }
        }) 
        
        if (this.notes === undefined || this.notes.length === 0 ) {
            const newRootNoteButton = document.createElement("button")
            newRootNoteButton.innerHTML = "Add a note"
            newRootNoteButton.dataset.treeId = this.id 
            newRootNoteButton.classList.add("blue-button")
            contentLinks.appendChild(newRootNoteButton)
            newRootNoteButton.addEventListener('click', function(event) {
                const form = new Form(Note.fieldsArray(), `/trees/${event.target.dataset.treeId}/notes`, "POST", Note)
                const formElement = form.render()
                formElement.setAttribute("name", "create-root-note-form")
                content.appendChild(formElement)
                Note.addRootNoteFormListener()
            })
        } else {
            const notesNetworkObject = new Network(this.notes)
            const notesNetworkElement = notesNetworkObject.display()
        }
        
        
    }
    static displayIndex(json) {
        heading.innerHTML = ""
        sidebar.innerHTML = ''
        const sidebarHeading = document.createElement("h3")
        sidebarHeading.innerHTML = "Your Idea Trees"
        sidebarHeading.classList.add("sidebar-heading")
        sidebar.appendChild(sidebarHeading)
        json.forEach(element => {
            const item = document.createElement('button')
            item.innerHTML = element.title
            item.setAttribute("data-id", element.id )
            item.classList.add("blue-button")
            sidebar.appendChild(item)
            item.addEventListener("click", function(event) {
                fetch(`${BACKEND_URL}/trees/${parseInt(event.target.getAttribute("data-id"))}`)
                    .then(resp => resp.json())
                    .then(function(json) {
                        const tree = new Tree(json)
                        tree.displayShow()
                    })
            })

        });
    }

    static formData(title, description) {
        return {tree: {title: title, description: description}}
    }

    static fieldsArray() {
        return [["title", "text"], ["description", "text"]]
    }
    static newFormTitle() {
        return "Create a New Idea Tree"
    }
}
