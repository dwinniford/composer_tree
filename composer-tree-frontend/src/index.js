const BACKEND_URL = 'http://localhost:3000';
const content = document.querySelector(".content")
const topNav = document.querySelector("NAV")
const heading = document.querySelector('h1')








const indexLink = new NavLink("View your idea trees", "/trees", Tree.displayIndex).display(topNav)
const treeForm = new Form(Tree.fieldsArray(), "/trees", "POST", Tree)
// refactor form to use Tree class method for title
const newLink = new DisplayLink("Add an Idea Tree", treeForm.display.bind(treeForm)).display(topNav)



// class Note {
//     constructor(json) {
        
//     }
// }
