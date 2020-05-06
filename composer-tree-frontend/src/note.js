

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
    }

    
}
