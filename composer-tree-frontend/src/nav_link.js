// class NavLink {
//     constructor(text, urlEnd, callback) {
//         this.text = text;
//         this.urlEnd = urlEnd;
//         this.callback = callback;
//     }

//     display(parent) {
//         const link = document.createElement("a")
//         link.classList.add("blue-button")
//         link.href = BACKEND_URL + this.urlEnd
//         link.innerHTML = this.text 
//         parent.appendChild(link)
//         const navLinkInstance = this 
//         // this is still in scope
//         // one solution is to create a variable for the navLink instance.  Another is to bind the execution context.
//         link.addEventListener("click", function(event) {
//             // this now refers to link(the html element) because it is the object to the left of the function
            
//             event.preventDefault();
//             fetch(event.target.href, {credentials: 'include', headers: {'X-CSRF-Token': getCSRFToken()}})
//                 .then(resp => resp.json())
//                 .then(function(json) {
//                     // lost this context.  how can i pass the callback attribute to this area
//                     navLinkInstance.callback(json)
//                 })
//         }) 
//         // adding bind here does not work.  cannot add bind to undefined. link is still the exectution context
//         return link 
//     }
// }
