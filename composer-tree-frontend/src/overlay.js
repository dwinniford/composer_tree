const overlay = document.querySelector('.overlay')
const overlayInner = document.querySelector('.overlay-inner')
const overlayClose = overlay.querySelector(".close")


class Overlay {
    static close() {
        overlay.classList.remove('open');
    }

    static open() {
        overlay.classList.add('open')
    }
}

overlayClose.addEventListener("click", Overlay.close)