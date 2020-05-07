const deleteNoteButton = document.querySelector("#delete-note")
const createChildNoteButton = document.querySelector("#create-child-note")
const editButton = document.querySelector("#edit-note")

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
        createChildNoteButton.dataset.treeId = this.tree_id
        createChildNoteButton.dataset.parentNoteId = this.id
        if (this.edgeCount === 1) {
            deleteNoteButton.classList.add("open")
        } else {
            deleteNoteButton.classList.remove("open")
        }
        console.log(editButton.dataset)
        overlayInner.appendChild(editButton)
             
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
                    if (response.ok) {
                        fetch(BACKEND_URL+`/trees/${deleteNoteButton.dataset.treeId}`)
                            .then(resp => resp.json())
                            .then(function(json) {
                                const tree = new Tree(json)
                                tree.displayShow()
                            })
                        Overlay.close()
                        
                    }
                })
        })
    }

    
    static fieldsArray() {
        return [["title", "text"], ["description", "text"]]
    }
    static addCreateChildNoteListener() {
        createChildNoteButton.addEventListener("click", function(event) {
           const form = new Form(Note.fieldsArray(), `/trees/${event.target.dataset.treeId}/notes`, "POST", Note)
           const formElement = form.render()
           formElement.setAttribute("name", "create-child-note-form")
           overlayInner.appendChild(formElement)
           overlayTitle.innerHTML = "Create a Child Note"
           overlayDescription.innerHTML = ''
        //    add submit listener as static method Note.addChildNoteFormListener
        })
    }

    static addEditButtonListener() {
        editButton.addEventListener("click", function(event) {
            const form = new Form(Note.fieldsArray(), `/trees/${event.target.dataset.treeId}/notes/${event.target.dataset.id}`, "PATCH", Note)
            const formElement = form.render()
            formElement.setAttribute("name", "edit-note-form")
            overlayInner.appendChild(formElement)
           Note.addEditFormListener() 
         })
    }
    static addNewRootNoteFormListener() {
        const newRootNoteForm = document.querySelector('[name="create-root-note-form"]')
        newRootNoteForm.addEventListener('submit', function(event) {
            event.preventDefault()
            console.log(event.currentTarget)
            const data = { note: {
                title: event.currentTarget.title.value,
                description: event.currentTarget.description.value
                }  
            }
            const configObject = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
            debugger 
            fetch(event.currentTarget.action, configObject)
                .then(resp => resp.json())
                .then(function(json) {
                    console.log(json)
                    newRootNoteForm.remove()
                    
                    fetch(`${BACKEND_URL}/trees/${json.tree_id}`)
                        .then(resp => resp.json())
                        .then(function(json) {
                            const tree = new Tree(json)
                            tree.displayShow()
                        })

                })
            
        })
    }
    
}

Note.addDeleteListener()
Note.addCreateChildNoteListener()
Note.addEditButtonListener()
