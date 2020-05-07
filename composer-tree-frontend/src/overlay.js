const overlay = document.querySelector('.overlay')
const overlayInner = document.querySelector('.overlay-inner')
const overlayClose = overlay.querySelector(".close")
// const editButton = overlay.querySelector("#edit-note")
const overlayTitle = overlayInner.querySelector("#overlay-title")
const overlayDescription = overlayInner.querySelector("#overlay-description")


class Overlay {
    static close() {
        overlay.classList.remove('open');
        overlay.querySelector('form').remove()
        // somehow the form is removed but will be added the next time another form is created
    }

    static open() {
        overlay.classList.add('open')
    }
}

overlayClose.addEventListener("click", Overlay.close)