const BACKEND_URL = 'http://localhost:3000';
const content = document.querySelector(".content")
const topNav = document.querySelector("NAV")
const heading = document.querySelector('h1')
const contentDescription = document.querySelector(".content-description")
const sidebar = document.querySelector('.sidebar')
const contentLinks = document.querySelector('.content-links')
const networkContainer = document.querySelector('.network-container')
const loginButton = document.querySelector("#login")
const signupButton = document.querySelector("#signup")
const userForm = document.querySelector(".user-form")
const nav = document.querySelector("nav")
const userLinks = document.querySelector(".user-links")
const logoutButton = document.querySelector("#logout")
const facebookButton = document.querySelector("#facebook")



const indexLink = new NavLink("View your idea trees", "/trees", Tree.displayIndex).display(topNav)
const treeForm = new Form(Tree.fieldsArray(), "/trees", "POST", Tree)
// refactor form to use Tree class method for title
const newLink = new DisplayLink("Add an Idea Tree", treeForm.display.bind(treeForm)).display(topNav)

signupButton.addEventListener("click", function(event){
    User.displaySignupForm()
})

loginButton.addEventListener("click", function(event) {
    User.displayLoginForm()
})

logoutButton.addEventListener("click", function(event) {
    User.logout()
})

facebookButton.addEventListener("click", function(event){
    User.loginWithFacebook()
})

