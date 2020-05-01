console.log("testing...")
const BACKEND_URL = 'http://localhost:3000';
fetch(`${BACKEND_URL}/trees`)
    .then(response => response.json())
    .then(json => console.log(json))