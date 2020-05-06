

class Note {
    constructor(json) {
        this.id = json.id 
        this.title = json.title 
        this.description = json.description
        this.starred = json.starred 
        this.parent_note_id = json.parent_note_id
        this.tree_id = json.tree_id
        this.user_id = json.user_id
    }

    render() {
        const title = document.querySelector('#overlay-title')
        title.innerHTML = this.title 
        const description = document.querySelector('#overlay-description')
        description.innerHTML = this.description + " - Id: " + this.id 
        editButton.dataset.treeId = this.tree_id
        editButton.dataset.id = this.id 
        console.log(editButton.dataset)
        overlayInner.appendChild(editButton)
        editButton.addEventListener("click", function(event) {
           const form = new Form(Note.fieldsArray(), `/trees/${event.target.dataset.treeId}/notes/${event.target.dataset.id}`, "PATCH", Note)
           console.log(form)
        })
        
    }

    renderEditForm() { 
        return 
    }
    static fieldsArray() {
        return [["title", "text"], ["description", "text"]]
    }
    
}
