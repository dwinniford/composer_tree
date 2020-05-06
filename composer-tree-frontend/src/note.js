const overlay = document.querySelector('.overlay')
const overlayInner = document.querySelector('.overlay-inner')

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
        const title = document.createElement('h1')
        title.innerHTML = this.title 
        const description = document.createElement('p')
        description.innerHTML = this.description
        overlayInner.appendChild(title)
        overlayInner.appendChild(description)
    }
}
