const overlay = document.querySelector('.overlay')
const overlayInner = document.querySelector('.overlay-inner')
const overlayClose = overlay.querySelector(".close")
const editButton = overlay.querySelector("#edit-note")
const overlayTitle = overlayInner.querySelector("#overlay-title")
const overlayDescription = overlayInner.querySelector("#overlay-description")


class Overlay {
    static close() {
        overlay.classList.remove('open');
    }

    static open() {
        overlay.classList.add('open')
    }
}

overlayClose.addEventListener("click", Overlay.close)