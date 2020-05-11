const recordButton = document.querySelector("#record")
const stopRecordButton = document.querySelector("#stopRecord")

recordButton.addEventListener("click", function(event) {
    console.log(event.currentTarget)
    recordButton.disabled = true;
    stopRecordButton.disabled = false;
})

stopRecordButton.addEventListener("click", function(event) {
    console.log(event.currentTarget);
    stopRecordButton.disabled = true;
    recordButton.disabled = false;
})

