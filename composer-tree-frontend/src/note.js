const deleteNoteButton = document.querySelector("#delete-note")

class Note {
    constructor(json, edgeCount) {
        this.id = json.id 
        this.title = json.title 
        this.description = json.description
        this.starred = json.starred 
        this.parent_note_id = json.parent_note_id
        this.tree_id = json.tree_id
        this.user_id = json.user_id
        this.edgeCount = edgeCount
    }

    render() {
        const title = document.querySelector('#overlay-title')
        title.innerHTML = this.title 
        const description = document.querySelector('#overlay-description')
        description.innerHTML = this.description + " - Id: " + this.id 
        editButton.dataset.treeId = this.tree_id
        editButton.dataset.id = this.id 
        // if note does not have a child note display delete button
        deleteNoteButton.dataset.treeId = this.tree_id
        deleteNoteButton.dataset.id = this.id 
        if (this.edgeCount === 1) {
            deleteNoteButton.classList.add("open")
        } else {
            deleteNoteButton.classList.remove("open")
        }
        console.log(editButton.dataset)
        overlayInner.appendChild(editButton)
        editButton.addEventListener("click", function(event) {
           const form = new Form(Note.fieldsArray(), `/trees/${event.target.dataset.treeId}/notes/${event.target.dataset.id}`, "PATCH", Note)
           const formElement = form.render()
           formElement.setAttribute("name", "edit-note-form")
           overlayInner.appendChild(formElement)
          Note.addEditFormListener() 
        })     
    }

    static addEditFormListener() {
        const editNoteForm = document.querySelector('[name="edit-note-form"]')
        editNoteForm.addEventListener('submit', function(event) {
            event.preventDefault()
            console.log(event.currentTarget)
            const data = {
                title: event.currentTarget.title.value,
                description: event.currentTarget.description.value
            }
            const configObject = {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
            fetch(event.currentTarget.action, configObject)
                .then(resp => resp.json())
                .then(function(json) {
                    console.log(json)
                    editNoteForm.remove()
                    overlayInner.querySelector("#overlay-title").innerHTML = json.title
                    overlayInner.querySelector("#overlay-description").innerHTML = json.description
                    fetch(`${BACKEND_URL}/trees/${json.tree_id}`)
                        .then(resp => resp.json())
                        .then(function(json) {
                            const tree = new Tree(json)
                            tree.displayShow()
                        })

                })
            
        })
    }

    static addDeleteListener() {
        deleteNoteButton.addEventListener("click", function(event) {
            fetch(BACKEND_URL + `/trees/${event.target.dataset.treeId}/notes/${event.target.dataset.id}`, {method: "DELETE"})
                .then(function(response){
                    console.log(response.ok)
                    // if (response.ok) {
                    //     fetch(BACKEND_URL+"/trees")
                    //     .then(resp => resp.json())
                    //     .then(function(json) {
                    //         Tree.displayIndex(json)
                    //     })
                    // }
                })
        })
    }

    renderEditForm() { 
        return 
    }
    static fieldsArray() {
        return [["title", "text"], ["description", "text"]]
    }
    
}

Note.addDeleteListener()
