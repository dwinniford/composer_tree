el.addEventListener('click', (event) => ((arg) => {
    console.log(event, arg);
})('An argument'));