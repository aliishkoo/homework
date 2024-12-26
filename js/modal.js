// MODAL

const modal = document.querySelector('.modal')
const modalTrigger = document.querySelector('#btn-get')
const modalCloseButton = document.querySelector('.modal_close')

const openModal = () => {
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden'
}
const closeModal = () => {
    modal.style.display = 'none'
    document.body.style.overflow = ''
}

modalTrigger.onclick = openModal;
modalCloseButton.onclick = closeModal;
modal.onclick = (event) => {
    if (event.target === modal) {
        closeModal();
    }
}

setTimeout(() => {
    openModal();
}, 10000);

const onScroll = () => {
    const scroll = window.innerHeight + window.scrollY
    if (scroll >= document.body.offsetHeight - 1) {
        openModal()
        removeEventListener('scroll', onScroll)
    }
}

window.addEventListener('scroll', onScroll);

// POST DATA

const form = document.querySelector('form')
const token = '7920798723:AAHgcZcXe6zvd2pBtHDGYm_7CjNO6M8Ks_w'
const chat_id = '@aliishkoo_frontent_bot'
const URL_API = `https://api.telegram.org/bot${token}/sendMessage`


form.onsubmit = (event) => {
    event.preventDefault()

    const {name, phone} = Object.fromEntries(new FormData(form).entries())

    const text = `Имя: ${name}\nНомер: ${phone}`

    fetch(URL_API, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            chat_id: chat_id,
            text: text,
        })
        })
}