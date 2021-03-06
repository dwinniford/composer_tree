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
const userName = document.querySelector("#user-name")
const websIndexButton = document.querySelector("#view-webs")
const addWebButton = document.querySelector("#add-web")
const getConfigObject = {credentials: 'include', headers: {'X-CSRF-Token': getCSRFToken()}}
const deleteConfigObject = {
    method: "DELETE",
    credentials: 'include',
    headers: {
        'X-CSRF-Token': getCSRFToken()
    }
}

App.init()

